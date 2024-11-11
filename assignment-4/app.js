/*

Create a product of your choice.
Log the newly created product. (Just that product, not all products)
Create another product of your choice.
Query all products, and log them all
Create the 3rd product of your choice.
Log the newly created 3rd product. (Just that product, not all product)
Rename the first product
Log the first product with the updated name. 
Remove the second product you created.
Query all products, and log them all
Try to create a product with bad input parameters to make sure it throws errors.
Try to remove a product that does not exist to make sure it throws errors.
Try to rename a product that does not exist to make sure it throws errors.
Try to rename a product passing in invalid data for the newProductName parameter to make sure it throws errors.
Try getting a product by ID that does not exist to make sure it throws errors.

*/

import * as products from "./data/products.js";
import {dbConnection,closeConnection} from './config/mongoConnection.js';


const db = await dbConnection();

    try{

    
    const ip14pro = await products.create(
        "MacBook Air (M2) - Space Gray Finish",
        "Strikingly thin and fast so you can work, play, or create anywhere. 13\" and 15\" models with M2 chip",
        "A2681",
        1399.99,
        "Apple",
        "http://www.apple.com",
        ["Laptop","Apple","13 Inch","Mac","MacBook","MacBook Air","M2 Chip"],
        ["Electronics","Laptops","Thin"],
        "03/12/2024",
        false
      );
       
       console.log(ip14pro);


//     const ip13mini = await products.create("Apple iPhone 13 mini 512GB - Product Red", "The iPhone 13 Mini is the perfect sized smartphone................", "MQ3L2ML/A", 999, "Apple", 
//        "http://www.apple.com",
//        ["Cell Phone", "Phone", "iPhone", "Apple", "Smartphone", "iPhone 13", "mini", "smaller smartphones"],
//        ["Electronics", "Cell Phones and Accessories", "Cell Phones"],
//        "09/24/2021",
//        false);
       
//     // console.log(ip13mini);


//     const allProducts = await products.getAll();
//     console.log(allProducts);

//     const lgTV = await products.create("83 inch LG C3 OLED TV", "The advanced LG OLED evo C-Series is better than ever. The LG OLED evo C3 is powered by the next-gen a9 AI Processor Gen6—exclusively made for LG OLED—for ultra-realistic picture and sound. And the Brightness Booster improves brightness so you get luminous picture and high contrast, even in well-lit rooms.* AI-assisted deep learning analyzes what you're watching to choose the best picture and sound setting for your content. The LG OLED evo C3 not only performs great, but looks great as well. With an almost invisible bezel, it will blend into the background for a seamless look. When you're finished watching, display paintings, photos and other content to blend the LG OLED evo C3 into your space even more. But that's not all. Experience less searching and more streaming, thanks to the next generation of AI technology from LG webOS 23. Every LG OLED comes loaded with Dolby Vision for extraordinary color, contrast and brightness, plus Dolby Atmos** for wrap-around sound. And LG's FILMMAKER MODE allows you to see films just as the director intended. Packed with gaming features, the LG OLED evo C-Series comes with everything you need to win like a 0.1ms response time, native 120Hz refresh rate and four HDMI 2.1 inputs. *Based on LG internal testing: 55/65/77/83 LG OLED evo C3 models are brighter than non-OLED evo B3 models and excludes the 42 and 48 LG OLED evo C3. **Dolby, Dolby Atmos and the double-D symbol are registered trademarks of Dolby Laboratories.",
//     "OLED83C3PUA", 4757.29, "LG" , "http://www.lgelectronics.com",  ["TV", "Smart TV", "OLED", "LG", "Big Screen", "83 Inch"],["Electronics", "Television & Video", "Televisions",  "OLED TVs"],
//     "02/27/2023", false );
       
//     console.log(lgTV);

//     const renamedIPhonePro = await products.rename(ip14pro._id.toString(), "Apple iPhone 14 Pro 1TB - Deep Purple"); 
//     console.log(renamedIPhonePro); 


//     const removedProduct = await products.remove(ip13mini._id.toString());
//     console.log(removedProduct);

//     const allProducts1 = await products.getAll();
//     console.log(allProducts1);

// } catch(e) {
//     console.log("Got an error!");
//     console.log(e);
// }


//     try {

//         const badIp14pro1 = await products.create("Apple iPhone 14 Pro 1TB - Space Grey","The all new iPhone 14 pro has many upgraded features................","MQ2L3LL/A",1499,"Apple", 
//      "http://www.apple.com",
//     ["Cell Phone", "Phone", "iPhone", "Apple", "Smartphone", "iPhone 14", "pro"],
//     ["Electronics", "Cell Phones and Accessories", "Cell Phones"],
//     "8/16/2022",
//     false);

//     } catch(e) {
//         console.log("Got an error!");
//         console.log(e);
//     }

    
//     try {

//         const badIp14pro1 = await products.create("Apple iPhone 14 Pro 1TB - Space Grey","The all new iPhone 14 pro has many upgraded features................","MQ2L3LL/A",1499,"Apple", 
//      "http://www.apple.com",
//     ["Cell Phone", "Phone", "iPhone", "Apple", "Smartphone", "iPhone 14", "pro"],
//     "08/16/2022",
//     false);

//     } catch(e) {
//         console.log("Got an error!");
//         console.log(e);
//     }

//     try {

//         const badIp14pro1 = await products.create("Apple iPhone 14 Pro 1TB - Space Grey","The all new iPhone 14 pro has many upgraded features................","MQ2L3LL/A",1499,"Apple", 
//      "http://www.apple.com",
//     ["Cell Phone", "Phone", "iPhone", "Apple", "Smartphone", "iPhone 14", "pro"],
//     ["Electronics", "Cell Phones and Accessories", "Cell Phones"],
//     "02/29/2023",
//     false);

//     } catch(e) {
//         console.log("Got an error!");
//         console.log(e);
//     }

//     try {

//         const badIp14pro1 = await products.create("Apple iPhone 14 Pro 1TB - Space Grey","The all new iPhone 14 pro has many upgraded features................","MQ2L3LL/A",1499,"Apple", 
//      "http://www.apple.com",
//     ["Cell Phone", "Phone", "iPhone", "Apple", "Smartphone", "iPhone 14", "pro"],
//     ["Electronics", "Cell Phones and Accessories", "Cell Phones"],
//     "18/16/2022",
//     false);

//     } catch(e) {
//         console.log("Got an error!");
//         console.log(e);
//     }

//     try {

//         const badIp14pro2 = await products.create("Apple iPhone 14 Pro 1TB - Space Grey","The all new iPhone 14 pro has many upgraded features................","MQ2L3LL/A",1499,"Apple", 
//      "http://www.apple.com",
//     ["Cell Phone", "Phone", "iPhone", "Apple", "Smartphone", "iPhone 14", "pro"],
//     ["Electronics", "Cell Phones and Accessories", "Cell Phones"],
//     false);

//     } catch(e) {
//         console.log("Got an error!");
//         console.log(e);
//     }

//     try {

//         const badIp14pro3 = await products.create("Apple iPhone 14 Pro 1TB - Space Grey","The all new iPhone 14 pro has many upgraded features................","MQ2L3LL/A",1499,"Apple", 
//      "http://www.apple.com",
//     ["Cell Phone", "Phone", "iPhone", "Apple", "Smartphone", "iPhone 14", "pro"],
//     [" ", "Cell Phones and Accessories", "Cell Phones"],
//     "09/16/2022",
//     false);

//     } catch(e) {
//         console.log("Got an error!");
//         console.log(e);
//     }

//     try {

//         const badIp14pro4 = await products.create("Apple iPhone 14 Pro 1TB - Space Grey","The all new iPhone 14 pro has many upgraded features................","MQ2L3LL/A",1499,"Apple", 
//      "http://www.ale.com",
//     ["Cell Phone", "Phone", "iPhone", "Apple", "Smartphone", "iPhone 14", "pro"],
//     [" CELL", "Cell Phones and Accessories", "Cell Phones"],
//     "09/16/2022",
//     false);

//     } catch(e) {
//         console.log("Got an error!");
//         console.log(e);
//     }

//     try {

//         const badIp14pro4 = await products.create("Apple iPhone 14 Pro 1TB - Space Grey","The all new iPhone 14 pro has many upgraded features................","MQ2L3LL/A",1499.99,"Apple", 
//      "http://www.allle.com",
//     ["Cell Phone", "Phone", "iPhone", "Apple", "Smartphone", "iPhone 14", "pro"],
//     [" CELL", "Cell Phones and Accessories", "Cell Phones"],
//     "09/16/2022");

//     } catch(e) {
//         console.log("Got an error!");
//         console.log(e);
//     }

//     try {
//         const removeBadProduct = await products.remove("75db915610eed5a9a0959922");
//     } catch(e) {
//         console.log("Got an error!");
//         console.log(e);
//     }

//     try {
//         const renamedIPhonePro = await products.rename("75db915610eed5a9a0959922", "Apple iPhone 14 Pro 1TB - Deep Purple"); 
//         console.log(renamedIPhonePro); 
//     } catch(e) {
//         console.log("Got an error!");
//         console.log(e);
//     }

//     try {
//         const renamedIPhonePro = await products.rename("65db915610eed5a9a0959922", " "); 
//         console.log(renamedIPhonePro); 
//     } catch(e) {
//         console.log("Got an error!");
//         console.log(e);
//     }

//     try {
//         const renamedIPhonePro = await products.rename("65db915610eed5a9a0959922"); 
//         console.log(renamedIPhonePro); 
//     } catch(e) {
//         console.log("Got an error!");
//         console.log(e);
//     }

//     try {
//         const newlyCreatedProduct = await products.get("75db915610eed5a9a0959922");
//         console.log(newlyCreatedProduct);
    } catch(e) {
        console.log("Got an error!");
        console.log(e);
    }

    await closeConnection();
