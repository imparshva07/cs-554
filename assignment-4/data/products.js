
import {products} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
// TODO: Export and implement the following functions in ES6 format

const create = async (
  productName,
  productDescription,
  modelNumber,
  price,
  manufacturer,
  manufacturerWebsite,
  keywords,
  categories,
  dateReleased,
  discontinued
) => {

  if(!productName || !productDescription || !modelNumber || !price || !manufacturer || !manufacturerWebsite || !keywords || !categories || !dateReleased) throw('Error : one or more param missing from create method');
  if(discontinued === undefined) throw('Error : one or more param missing from create method');
  if(typeof productName !== 'string' || typeof productDescription !== 'string' || typeof modelNumber !== 'string' || typeof manufacturer !== 'string' || typeof manufacturerWebsite !== 'string' || typeof dateReleased !== 'string') throw('Error : one or more param in create is not of type string');
  if(productName.trim().length === 0 || productDescription.trim().length === 0 || modelNumber.trim().length === 0 || manufacturer.trim().length === 0 || manufacturerWebsite.trim().length === 0 || dateReleased.trim().length === 0) throw('Error : one or more param in create is just empty spaces');

  productName = productName.trim();
  productDescription = productDescription.trim();
  modelNumber = modelNumber.trim();
  manufacturer = manufacturer.trim();
  manufacturerWebsite = manufacturerWebsite.trim();
  dateReleased = dateReleased.trim();

  validatePrice(price);
  validateWebsite(manufacturerWebsite);
  if((!Array.isArray(keywords)) || !(Array.isArray(categories))) throw ('Error : keywords & categories must be an array in create method');
  if(keywords.length < 1 || categories.length < 1) throw ('Error : keywords & categories should have at least one element in create method');

  keywords.forEach( ele => {
    if(typeof ele !== 'string') {
      throw('Error : one or more elements in keywords is not a string');
    }
    if(ele.trim().length < 1) throw('Error : one or more elements in keywords is of length less than 1');
    ele = ele.trim();
  });

  categories.forEach( ele => {
    if(typeof ele !== 'string') {
      throw('Error : one or more elements in categories is not a string');
    }
    if(ele.trim().length < 1) throw('Error : one or more elements in categories is of length less than 1');
    ele = ele.trim();
  });

  if(typeof dateReleased !== 'string') throw ('Error : dateReleased incorrect type');

  let dateSeperated = dateReleased.split('/');

  if(dateSeperated.length !== 3) throw ('Error : Invalid dateReleased');
  
  let months = dateSeperated[0];
  let days = dateSeperated[1];
  let year = dateSeperated[2];

  if(months.length !== 2 || days.length !== 2 || year.length !== 4) throw('Error : Invalid dateReleased');

  months = parseInt(months,10);
  days = parseInt(days,10);
  year = parseInt(year,10);

  if(months < 1 || months  > 12) throw('Error : Invalid dateReleased');
  if(months == 1 || months == 3 || months == 5 || months == 7 || months == 8 || months == 10 || months == 12) {
    if(months != 2) {
      if(days < 1 || days > 31) throw('Error : Invalid dateReleased');
    }
  } else {
    if(months != 2) {
      if(days < 1 || days > 30) throw('Error : Invalid dateReleased');
    }
  }

  if(months == 2) {
    if((!(year % 4) && year % 100) || !(year % 400)) {
      if(days < 1 || days > 29) throw('Error : Invalid dateReleased');
    } else {
      if(days < 1 || days > 28) throw('Error : Invalid dateReleased');
    }
  }

  if(year > 2024) throw ('Error : Invalid dateReleased');
  let today = new Date();
  if(year === 2024) {
    if(months > (today.getMonth()+1)) throw ('Error : Invalid dateReleased');
    if(months === (today.getMonth()+1)) {
      if(days > today.getDate()) throw ('Error : Invalid dateReleased');
    }
  }

  if(typeof discontinued !== 'boolean') throw('Error : Invalid type discontinued');


  let newProduct = {
    productName : productName,
    productDescription : productDescription,
    modelNumber : modelNumber,
    price : price,
    manufacturer : manufacturer,
    manufacturerWebsite : manufacturerWebsite,
    keywords : keywords,
    categories : categories,
    dateReleased : dateReleased,
    discontinued : discontinued
  };

  const productCollection = await products();
  const insertInfo = await productCollection.insertOne(newProduct);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) throw ('Error : product not be added');
  const newId = insertInfo.insertedId.toString();
  const product = await get(newId);
  return product;

};

const getAll = async () => {

  const productCollection = await products();
  let allProducts = await productCollection.find({})
  .project({_id: 1, productName: 1})
  .toArray();
  if(!allProducts) throw('products not found');
  allProducts = allProducts.map((ele) => {
    ele._id = ele._id.toString();
    return ele;
  });
  return allProducts;
};

const get = async (id) => {
  
  if (!id) throw ('Error : id param is missing for get method');
  if (typeof id !== 'string') throw ('Error : Id should be a string for get method');
  if (id.trim().length === 0) throw('Error : Id can not be an empty string for get method');
  id = id.trim();
  if (!ObjectId.isValid(id)) throw ('Error : invalid object id for get method');
  const productCollection = await products();
  const product = await productCollection.findOne({_id: new ObjectId(id)});
  if (product === null) throw ('Error : product not found');
  product._id = product._id.toString();
  return product;
};

const remove = async (id) => {

  if (!id) throw ('Error : id param is missing for remove method');
  if (typeof id !== 'string') throw ('Error : Id should be a string for remove method');
  if (id.trim().length === 0) throw('Error : Id can not be an empty string for remove method');
  id = id.trim();
  if (!ObjectId.isValid(id)) throw ('Error : invalid object id for remove method');
  const productCollection = await products();
  const deletedProduct = await productCollection.findOneAndDelete({
    _id: new ObjectId(id)
  });

  if (!deletedProduct) throw('Error : product can not be deleted due to one or more reasons');

  return `${deletedProduct.productName} has been successfully deleted!`;

};

const rename = async (id, newProductName) => {

  if (!id) throw ('Error : id param missing for rename method');
  if(!newProductName) throw('Error : newProductName param missing from rename method')
  if (typeof id !== 'string') throw ('Error : Id should be a string for rename method');
  if (id.trim().length === 0) throw('Error : Id can not be an empty string for rename method');
  id = id.trim();
  if (typeof newProductName !== 'string') throw ('Error : newProductName should be a string for rename method');
  if (newProductName.trim().length === 0) throw('Error : newProductName can not be an empty string for rename method');
  newProductName = newProductName.trim();
  if (!ObjectId.isValid(id)) throw ('Error : invalid object id for rename method');
  const productTobeRenamed = await get(id);

  if(!productTobeRenamed) throw('Error : No product found');
  if(productTobeRenamed.productName === newProductName) throw('Error : newProductName is same as the existing one');

  const updatedProduct = {
    productName : newProductName,
    productDescription : productTobeRenamed.productDescription,
    modelNumber : productTobeRenamed.modelNumber,
    price : productTobeRenamed.price,
    manufacturer : productTobeRenamed.manufacturer,
    manufacturerWebsite : productTobeRenamed.manufacturerWebsite,
    keywords : productTobeRenamed.keywords,
    categories : productTobeRenamed.categories,
    dateReleased : productTobeRenamed.dateReleased,
    discontinued : productTobeRenamed.discontinued
  }
  const productCollection = await products();

  const productUpdated = await productCollection.findOneAndUpdate(
      {_id: new ObjectId(id)},
      {$set: updatedProduct},
      {returnDocument: 'after'}
  );

  if(!productUpdated) throw('Error : can not rename');

  return productUpdated;
};

const validatePrice = (price) => {
  if(!price > 0) {
    throw ('Error : price should be greater than zero whole number in create method');
  }
  if(!Number.isInteger(price) && price.toString().split('.')[1].length > 2) {
    throw ('Error : only allow 2 decimal points for the cents in create method')
  }
}

const validateWebsite = (manufacturerWebsite) => {
  if(!(manufacturerWebsite.startsWith('http://www.')) || !(manufacturerWebsite.endsWith('.com'))) throw ('Error : manufacturerWebsite should starts with http://www. and ends with .com');
  if(manufacturerWebsite.length < 20) throw ('Error : There should be at least 5 characters in-between the http://www. and .com in manufacturerWebsite param of create method');
}


export {create, get, getAll, remove, rename}