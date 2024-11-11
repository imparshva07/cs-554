// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import {Router} from 'express';
const router = Router();
import {reviewData} from '../data/index.js';
import {ObjectId} from 'mongodb'

router
  .route('/:productId')
  .get(async (req, res) => {
    //code here for GET
    let productId = req.params.productId;
    try{
      if(!productId) throw ('Error : productId missing from getAllReviews');
      if(typeof productId !== 'string') throw ('Error : productId must be a string in getAllReviews');
      productId = productId.trim();
    
      if(productId.length === 0) throw('Error : productId can not be an empty string');
      if(!ObjectId.isValid(productId)) throw ('Error: productId is invalid object ID');
    } catch(e) {
      return res.status(400).json({error: e});
    }

    try{
      const reviews = await reviewData.getAllReviews(productId);
      if(!reviews) throw('Error : No reviews found');
      return res.json(reviews);
    } catch(e) {
      return res.status(404).json({error: e});
    }

  })
  .post(async (req, res) => {
    //code here for POST
    const reviewDetails = req.body;
    if (!reviewDetails || Object.keys(reviewDetails).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }
    let productId = req.params.productId;
    let title;
    let reviewerName;
    let review;
    let rating;
    try{
      title = reviewDetails.title;
      reviewerName = reviewDetails.reviewerName;
      review = reviewDetails.review;
      rating = reviewDetails.rating;
      if(!productId || !title || !reviewerName || !review || !rating) throw('Error : one or more param missing from createReview method');
      if(typeof productId !== 'string' || typeof title !== 'string' || typeof reviewerName !== 'string' || typeof review !== 'string') throw('Error : one or more param in createReview is not of type string');
      if(productId.trim().length === 0 || title.trim().length === 0 || reviewerName.trim().length === 0 || review.trim().length === 0) throw('Error : one or more param in createReview is just empty spaces');
    
      if (!ObjectId.isValid(productId)) throw ('Error: productId is invalid object ID');
      if(typeof rating !== 'number') throw ('Error : rating should be a number');
      reviewData.validateRating(rating); 
    } catch(e) {
      return res.status(400).json({error: e});
    }

    try{

      const newReview = await reviewData.createReview(
        productId,
        title,
        reviewerName,
        review,
        rating
      );
  
      if(!newReview) throw('Error : issue in creating review');
      return res.json(newReview);
    } catch(e) {
      return res.status(404).json({error: e});
    }

  });

router
  .route('/review/:reviewId')
  .get(async (req, res) => {
    //code here for GET

    let reviewId = req.params.reviewId;
    try {
      if(!reviewId) throw ('Error : reviewId missing');
      if(typeof reviewId !== 'string') throw ('Error : reviewId must be a string');
      reviewId = reviewId.trim();
    
      if(reviewId.length === 0) throw('Error : reviewId can not be an empty string');
      if(!ObjectId.isValid(reviewId)) throw ('Error: reviewId is invalid object ID');
    } catch(e) {
      return res.status(400).json({error: e});
    }

    try{
      const review = await reviewData.getReview(reviewId);
      if(!review) throw('Error : No review found');
      return res.json(review);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  
  })
  .patch(async (req, res) => {
    //code for PATCH
    const reviewDetails = req.body;
    if (!reviewDetails || Object.keys(reviewDetails).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }

    let reviewId = req.params.reviewId;

    try{
      if(!reviewId) throw ('Error : reviewId missing');
      if(typeof reviewId !== 'string') throw ('Error : reviewId must be a string');
      reviewId = reviewId.trim();

      if(reviewId.length === 0) throw('Error : reviewId can not be an empty string');
      if(!ObjectId.isValid(reviewId)) throw ('Error: reviewId is invalid object ID');

      if(reviewDetails.title) {
        if(typeof reviewDetails.title !== 'string') throw('Error : title should be string');
        if(reviewDetails.title.trim().length === 0) throw('Error : title can not be an empty string');
      }
      if(reviewDetails.reviewerName) {
        if(typeof reviewDetails.reviewerName !== 'string') throw('Error : reviewerName should be string');
        if(reviewDetails.reviewerName.trim().length === 0) throw('Error : reviewerName can not be an empty string');
      }
      if(reviewDetails.review) {
        if(typeof reviewDetails.review !== 'string') throw('Error : review should be string');
        if(reviewDetails.review.trim().length === 0) throw('Error : review can not be an empty string');
      }

      if(reviewDetails.rating) {
        if(typeof reviewDetails.rating !== 'number') throw ('Error : rating should be a number');
        reviewData.validateRating(reviewDetails.rating);
      }
    } catch(e) {
      return res.status(400).json({error: e});
    }

    try{

      const updatedProduct = await reviewData.updateReview(reviewId, reviewDetails);
  
      if(!updatedProduct) throw('Error : issue in updating review');
      return res.json(updatedProduct);
    } catch(e) {
      return res.status(404).json({error: e});
    }

  })
  .delete(async (req, res) => {
    //code here for DELETE
    let reviewId = req.params.reviewId;
    try {
      if(!reviewId) throw ('Error : reviewId missing');
      if(typeof reviewId !== 'string') throw ('Error : reviewId must be a string');
      reviewId = reviewId.trim();
    
      if(reviewId.length === 0) throw('Error : reviewId can not be an empty string');
      if(!ObjectId.isValid(reviewId)) throw ('Error: reviewId is invalid object ID');
    } catch(e) {
      return res.status(400).json({error: e});
    }

    try{
      const review = await reviewData.removeReview(reviewId);
      if(!review) throw('Error : issue in deleting the review');
      return res.json(review);
    } catch (e) {
      return res.status(404).json({error: e});
    }


  });
  

  export default router;