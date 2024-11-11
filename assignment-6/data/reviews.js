// This data file should export all functions using the ES6 standard as shown in the lecture code

import productsDataFunctions from './products.js';

import {products} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';

const createReview = async (
  productId,
  title,
  reviewerName,
  review,
  rating
) => {

  if(!productId || !title || !reviewerName || !review || !rating) throw('Error : one or more param missing from createReview method');
  if(typeof productId !== 'string' || typeof title !== 'string' || typeof reviewerName !== 'string' || typeof review !== 'string') throw('Error : one or more param in createReview is not of type string');
  if(productId.trim().length === 0 || title.trim().length === 0 || reviewerName.trim().length === 0 || review.trim().length === 0) throw('Error : one or more param in createReview is just empty spaces');

  if (!ObjectId.isValid(productId)) throw ('Error: productId is invalid object ID');
  if(typeof rating !== 'number') throw ('Error : rating should be a number');
  validateRating(rating);

  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

  const newReview = {
    _id: new ObjectId(),
    title: title,
    review: review,
    reviewerName: reviewerName,
    reviewDate: new Date(Date.now()).toLocaleDateString('en-US', options),
    rating: rating
  }

  const productCollection = await products();
  const product = await productsDataFunctions.get(productId);

  if(!product) throw ('Error : product does not exist');

  if(product.reviews && Array.isArray(product.reviews)) {
    product.averageRating = (((product.averageRating) * (product.reviews.length)) + rating ) / (product.reviews.length + 1);
  }
  if(product.reviews && Array.isArray(product.reviews)) {
    product.reviews.push(newReview);
  }
  let updatedReviews = product.reviews;
  let updatedAvgRating = product.averageRating;
  const updateReview = await productCollection.findOneAndUpdate(
    {_id: new ObjectId(productId)},
    { $set: { reviews: updatedReviews, averageRating: updatedAvgRating } },
    {returnDocument: 'after'}
  );

  if(!updateReview) throw('Error : can not add review');

  return updateReview;
};

const getAllReviews = async (productId) => {

  if(!productId) throw ('Error : productId missing from getAllReviews');
  if(typeof productId !== 'string') throw ('Error : productId must be a string in getAllReviews');
  productId = productId.trim();

  if(productId.length === 0) throw('Error : productId can not be an empty string');
  if(!ObjectId.isValid(productId)) throw ('Error: productId is invalid object ID');

  const product = await productsDataFunctions.get(productId);
  if(!product) throw ('Error : product does not exist');

  const reviews = product.reviews;
  if(!reviews.length === 0) throw ('Error : No reviews found');

  return reviews;
};

const getReview = async (reviewId) => {
  if(!reviewId) throw ('Error : reviewId missing from getReview');
  if(typeof reviewId !== 'string') throw ('Error : reviewId must be a string in getReview');
  reviewId = reviewId.trim();

  if(reviewId.length === 0) throw('Error : reviewId can not be an empty string in getReview');
  if(!ObjectId.isValid(reviewId)) throw ('Error: reviewId is invalid object ID in getReview');

  const productCollection = await products();
  const reviewFound = await productCollection.findOne(
    {'reviews._id': new ObjectId(reviewId)},
    {projection: {_id: 0, 'reviews.$': 1}}
  );

  if (!reviewFound) throw ('Error : review Not found');
  return reviewFound.reviews[0];
};

const updateReview = async (reviewId, updateObject) => {
  if(!reviewId) throw ('Error : reviewId missing from updateReview');
  if(typeof reviewId !== 'string') throw ('Error : reviewId must be a string in updateReview');
  reviewId = reviewId.trim();

  if(reviewId.length === 0) throw('Error : reviewId can not be an empty string in updateReview');
  if(!ObjectId.isValid(reviewId)) throw ('Error: reviewId is invalid object ID in updateReview');

  let updateObjectData = {};

  const productCollection = await products();
  const product = await productCollection.findOne(
    {'reviews._id': new ObjectId(reviewId)}
  );

  if(!product)throw('Error : product not found with the review id');

  if(updateObject) {
    updateObjectData['_id'] = new ObjectId(reviewId);
    if(updateObject.title) {
      if(typeof updateObject.title !== 'string') throw('Error : title should be string');
      updateObject.title = updateObject.title.trim();
      if(updateObject.title.length === 0) throw('Error : title can not be an empty string');
      updateObjectData['title'] = updateObject.title;
    }

    if(updateObject.reviewerName) {
      if(typeof updateObject.reviewerName !== 'string') throw('Error : reviewerName should be string');
      updateObject.reviewerName = updateObject.reviewerName.trim();
      if(updateObject.reviewerName.length === 0) throw('Error : reviewerName can not be an empty string');
      updateObjectData['reviewerName'] = updateObject.reviewerName;
    }

    if(updateObject.review) {
      if(typeof updateObject.review !== 'string') throw('Error : review should be string');
      updateObject.review = updateObject.review.trim();
      if(updateObject.review.length === 0) throw('Error : review can not be an empty string');
      updateObjectData['review'] = updateObject.review;
    }

    if(updateObject.rating) {
      if(typeof updateObject.rating !== 'number') throw ('Error : rating should be a number');
      validateRating(updateObject.rating);
      updateObjectData['rating'] = updateObject.rating;
    }

    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    updateObjectData['reviewDate'] = new Date(Date.now()).toLocaleDateString('en-US', options);
  }



  const updatedReview = await productCollection.findOneAndUpdate(
    {'reviews._id': new ObjectId(reviewId)},
    {$set: { 'reviews.$': updateObjectData } },
    {projection: {_id: 0, 'reviews.$': 1}},
    {returnDocument: 'before'}
  );

  if(!updatedReview) throw('Error : review can not be updated');

  const latestProduct = await productCollection.findOne({ 'reviews._id': new ObjectId(reviewId) });

  if(!latestProduct) throw('Error : issue getting the latestProduct');

  if(latestProduct.reviews && Array.isArray(latestProduct.reviews)) {
    latestProduct.averageRating = (((latestProduct.averageRating) * (latestProduct.reviews.length)) - updatedReview.reviews[0].rating  + updateObject.rating ) / (latestProduct.reviews.length);
  }

  const updatedProduct = await productCollection.findOneAndReplace(
    {_id: new ObjectId(product._id)},
    latestProduct,
    {returnDocument: 'after'}
  );

  return updatedProduct;
};

const removeReview = async (reviewId) => {
  if(!reviewId) throw ('Error : reviewId missing from updateReview');
  if(typeof reviewId !== 'string') throw ('Error : reviewId must be a string in updateReview');
  reviewId = reviewId.trim();

  if(reviewId.length === 0) throw('Error : reviewId can not be an empty string in updateReview');
  if(!ObjectId.isValid(reviewId)) throw ('Error: reviewId is invalid object ID in updateReview');

  const productCollection = await products();

  const product = await productCollection.findOne({ 'reviews._id': new ObjectId(reviewId) });

  if(!product) throw('Error : issue getting the product');


    const productIdToUse = product._id.toString();
    const removedReview = await productCollection.findOneAndUpdate(
      {_id: new ObjectId(productIdToUse)},
      {$pull: {reviews: {_id: new ObjectId(reviewId)}}},
      {returnDocument: 'before'}
    );
    
    const removedReviewObject = removedReview.reviews.find(review => review._id.toString() === reviewId);
    

    if(!removedReview) throw('Error : could not delete the review');

    const updatedProductTemp = await productCollection.findOne({_id: new ObjectId(productIdToUse)});

    if(!updatedProductTemp) throw('Error : issue getting the updatedProductTemp');

    if(updatedProductTemp.reviews && Array.isArray(updatedProductTemp.reviews)) {

      if(updatedProductTemp.reviews.length === 0) {
        updatedProductTemp.averageRating = 0;
      } else {
        updatedProductTemp.averageRating = (((product.averageRating) * (product.reviews.length)) - removedReviewObject.rating ) / (product.reviews.length - 1);
      }
    }
  
    const updatedProduct = await productCollection.findOneAndReplace(
      {_id: new ObjectId(product._id)},
      updatedProductTemp,
      {returnDocument: 'after'}
    );
  
    return updatedProduct;

};

const validateRating = (rating) => {
  if(!(rating >= 1 && rating <=5)) {
    throw ('Error : rating should be in the range of 1 to 5');
  }
  if(rating % 1 !== 0) {
    if(rating.toString().split('.')[1].length > 1) throw ('Error : only allow 1 decimal points for rating');
  }
}

const exportMethods = {createReview, getAllReviews, getReview, updateReview, removeReview, validateRating}
export default exportMethods;