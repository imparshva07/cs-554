// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import {Router} from 'express';
const router = Router();
import {productData} from '../data/index.js';
import {ObjectId} from 'mongodb';


router
  .route('/')
  .get(async (req, res) => {
    //code here for GET

    try {
      const products = await productData.getAll();
      if(!products) throw('Error : No products found');
      return res.json(products);
    } catch (e) {
      return res.status(500).json({error: e});
    }
  })
  .post(async (req, res) => {
    //code here for POST
    const productDetails = req.body;
    if (!productDetails || Object.keys(productDetails).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }

    let productName;
    let productDescription;
    let modelNumber;
    let price;
    let manufacturer;
    let manufacturerWebsite;
    let keywords;
    let categories;
    let dateReleased;
    let discontinued;

    try{

    productName = productDetails.productName;
    productDescription = productDetails.productDescription;
    modelNumber = productDetails.modelNumber;
    price = productDetails.price;
    manufacturer = productDetails.manufacturer;
    manufacturerWebsite = productDetails.manufacturerWebsite;
    keywords = productDetails.keywords;
    categories = productDetails.categories;
    dateReleased = productDetails.dateReleased;
    discontinued = productDetails.discontinued;

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
  
    productData.validatePrice(price);
    productData.validateWebsite(manufacturerWebsite);
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

  } catch(e) {
    return res.status(400).json({error: e});
  }

  try {
    const newProduct = await productData.create(
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
    );

    if(!newProduct) throw('Error : issue in creating product');
    return res.json(newProduct);
  } catch (e) {
    return res.status(500).json({error: e});
  }
  
  });

router
  .route('/:productId')
  .get(async (req, res) => {
    //code here for GET

    let productId = req.params.productId;
    try{
      if (!productId) throw ('Error : productId param is missing');
      if (typeof productId !== 'string') throw ('Error : productId should be a string');
      if (productId.trim().length === 0) throw('Error : productId can not be an empty string');
      productId = productId.trim();
      if (!ObjectId.isValid(productId)) throw ('Error : invalid object id');
    } catch(e) {
      return res.status(400).json({error: e});
    }

    try {
      const product = await productData.get(productId);
      if(!product) throw('Error : No products found');
      return res.json(product);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE

    let productId = req.params.productId;
    try{
      if (!productId) throw ('Error : productId param is missing for delete');
      if (typeof productId !== 'string') throw ('Error : productId should be a string for delete');
      if (productId.trim().length === 0) throw('Error : productId can not be an empty string for delete');
      productId = productId.trim();
      if (!ObjectId.isValid(productId)) throw ('Error : invalid object id for delete');
    } catch(e) {
      return res.status(400).json({error: e});
    }

    try {
      const product = await productData.remove(productId);
      if(!product) throw('Error : No products could be removed');
      let deleteSuccess = {};
      deleteSuccess['_id'] = product._id;
      deleteSuccess['deleted'] = true;
      return res.json(deleteSuccess);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  })
  .put(async (req, res) => {
    //code here for PUT

    const productDetails = req.body;
    //make sure there is something present in the req.body
    if (!productDetails || Object.keys(productDetails).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }

    let productId;
    let productName;
    let productDescription;
    let modelNumber;
    let price;
    let manufacturer;
    let manufacturerWebsite;
    let keywords;
    let categories;
    let dateReleased;
    let discontinued;

    try{
      productId = req.params.productId;
      productName = productDetails.productName;
      productDescription = productDetails.productDescription;
      modelNumber = productDetails.modelNumber;
      price = productDetails.price;
      manufacturer = productDetails.manufacturer;
      manufacturerWebsite = productDetails.manufacturerWebsite;
      keywords = productDetails.keywords;
      categories = productDetails.categories;
      dateReleased = productDetails.dateReleased;
      discontinued = productDetails.discontinued;

      if(!productId || !productName || !productDescription || !modelNumber || !price || !manufacturer || !manufacturerWebsite || !keywords || !categories || !dateReleased) throw('Error : one or more param missing update method');
      if(discontinued === undefined) throw('Error : one or more param missing from update');
      if(typeof productId !== 'string' || typeof productName !== 'string' || typeof productDescription !== 'string' || typeof modelNumber !== 'string' || typeof manufacturer !== 'string' || typeof manufacturerWebsite !== 'string' || typeof dateReleased !== 'string') throw('Error : one or more param in create is not of type string');
      if(productId.trim().length === 0 || productName.trim().length === 0 || productDescription.trim().length === 0 || modelNumber.trim().length === 0 || manufacturer.trim().length === 0 || manufacturerWebsite.trim().length === 0 || dateReleased.trim().length === 0) throw('Error : one or more param in create is just empty spaces');

      productId = productId.trim();
      productName = productName.trim();
      productDescription = productDescription.trim();
      modelNumber = modelNumber.trim();
      manufacturer = manufacturer.trim();
      manufacturerWebsite = manufacturerWebsite.trim();
      dateReleased = dateReleased.trim();

      if (!ObjectId.isValid(productId)) throw `Error: productId is invalid object ID`;
      productData.validatePrice(price);
      productData.validateWebsite(manufacturerWebsite);
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

      const existingProduct = await productData.get(productId);
      if(!existingProduct) throw('Error : Product not found');
  
    } catch(e) {
      return res.status(400).json({error: e});
    }

    try{
      const updatedProduct = await productData.update(
        productId,
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
      )
      if(!updatedProduct) throw('Error : issue in creating product');
      return res.json(updatedProduct);
    } catch (e) {
      return res.status(500).json({error: e});
    }

  });

  export default router;