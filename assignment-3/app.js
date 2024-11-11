/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need that calls your functions like the example below. 
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.

import * as authors from "./authors.js");

    try{
        const authorData = await authors.getAuthors();
        console.log (authorData);
    }catch(e){
        console.log (e);
    }
*/

import {
    getAuthorById,
    searchAuthorsByAge,
    getBooksByState,
    searchAuthorsByHometown,
    getAuthorBooks
} from './authors.js';

import {
    getBookById,
    booksByPageCount,
    sameYear,
    minMaxPrice,
    searchBooksByPublisher
} from './books.js';

// try{
//     const authorById = await getAuthorById("1871e6d7-551f-41cb-9a07-08240b86c95c"); 
//     console.log(authorById);

//     await getAuthorById(-1); // Throws Error 
//     await getAuthorById(1001); // Throws Error 
//     await getAuthorById(); // Throws Error
//     await getAuthorById('7989fa5e-5617-43f7-a931-46036f9dbcff');// Throws Author not found Error
// } catch(e){
//     console.log(e);
// }

// try{
//     const authorData = await searchAuthorsByAge(23); 
//     console.log (authorData);

//     await searchAuthorsByAge(5000); // Throws Error since there are no results
//     await searchAuthorsByAge(" "); // Throws Error
//     await searchAuthorsByAge("abc"); // Throws Error
//     await searchAuthorsByAge(); // Throws Error 
// }catch(e){
//     console.log (e);
// }

// try{
//     const books = await getBooksByState(" nJ    ");;
//     console.log(books);

//     await getBooksByState(123); // Throws Error 
//     await getBooksByState(" "); // Throws Error
//     await getBooksByState("Patrick"); // Throws Error because there is no state Patrick in authors.json
//     await getBooksByState(); // Throws Error
// } catch(e){
//     console.log(e);
// }


// try{
//     const bookById = await getBookById("99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e");
//     console.log(bookById);

//     // await getBookById(-1); // Throws Error 
//     // await getBookById(1001); // Throws Error 
//     // await getBookById();// Throws Error
//     await getBookById('7989fa5e-5617-43f7-a931-46036f9dbcff');// Throws book not found Error
// } catch(e){
//     console.log(e);
// }

// try{

//     const authorsName = await searchAuthorsByHometown("    ", "NY");;
//     console.log(authorsName);

//     //await searchAuthorsByHometown(123, 456); // Throws Error 
//    // await searchAuthorsByHometown("", ""); // Throws Error
//     //await searchAuthorsByHometown("Patrick", "Hill"); // Throws Error because there is no state hill or town patrick in authors.json
//     await searchAuthorsByHometown(); // Throws Error

// } catch(e) {
//     console.log(e);
// }

// try{

//     const books = await getAuthorBooks(getAuthorBooks("   ad923796-1ad6-4a1d-88b6-454a04412573 "));
//     console.log(books);
//     // await getAuthorBooks("69b3f32f-5690-49d1-b9a6-9d2dd7d6e6cd"); // Returns: ["Jason X", "Nanny McPhee"]
//     // const books1 = await getAuthorBooks("2155574a-80b0-4389-8bb3-3240da52b770"); // Returns: []
//     // console.log(books1);
//     // //await getAuthorBooks(""); // Throws Error
//     // await getAuthorBooks(230); // Throws Error
//     // await getAuthorBooks(); // Throws Error:

// } catch(e) {
//     console.log(e);
// }

// try{

//     let bookIds = await booksByPageCount(300, 500); 
//     console.log(bookIds);
// // Returns: ["fe64fc98-95ff-4d47-bac8-93c755b85c95", "04e55bc9-0c7a-47a6-a403-52eabf25c6ef"] //there are more, these are just a few examples

// await booksByPageCount(-1, 100); // Throws Error 
// await booksByPageCount("ABC", "3"); // Throws Error 
// await booksByPageCount(); // Throws Error


// } catch(e) {
//     console.log(e);
// }

// try{

//     let books = await sameYear(2000);; 
//     console.log(books);

//     await sameYear(1991); // Throws Error 
//     await sameYear(1001); // Throws Error 
//     await sameYear();// Throws Error
//     await sameYear(false)// throws error 
//     await sameYear('foo bar');// Throws Error

// } catch(e) {
//     console.log(e);
// }

// try{

//     let minMaxArray = await minMaxPrice();
//     console.log(minMaxArray)

// } catch(e) {
//     console.log(e);
// }


try{

    let bookIds = await searchBooksByPublisher("gIgAcLuB");; // Returns ["519c733a-6a5d-451f-927d-0e860b5d1e3d", "254a77b0-f055-4dc1-b9fa-3b23d811c8be"]
    console.log(bookIds);
    // await searchBooksByPublisher("A fake publisher"); // Throws Error 
    // await searchBooksByPublisher();// Throws Error
    // await searchBooksByPublisher(false)// throws error 
    // await searchBooksByPublisher('foo bar');// Throws Error

} catch(e) {
    console.log(e);
}