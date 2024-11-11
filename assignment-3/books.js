//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Books data link: https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json

import {
    getBooks
} from './helpers.js'

const getBookById = async (id) => {
    if(!id) throw ('Error : id missing in getBookById param');
    validateId(id);
    id = id.trim();
    const books =  await getBooks();
    const bookFound = books.find((ele) => ele.id === id);
    if(!bookFound) throw ('Error : book not found');
    return bookFound;
};

const booksByPageCount = async (min, max) => {
    if(!min || !max) throw ('Error : one or more params is missing in booksByPageCount');
    checkIfValid(min,max);
    const books =  await getBooks();
    let books_with_page_count = books.filter((book) => book.pageCount && book.pageCount >= min && book.pageCount <= max);

    let bookIds = [];

    books_with_page_count.forEach( book => {
        if(book.id) {
            bookIds.push(book.id);
        }
    });

    return bookIds;
};

const sameYear = async (year) => {
    if(!year) throw ('Error : one or more params is missing in sameYear');
    checkIfValidYear(year);
    const books =  await getBooks();

    let booksInYear = [];
    books.forEach(book => {
        if(book.publicationDate) {
            const publicationDate = new Date(book.publicationDate);
            const publicationYear = publicationDate.getUTCFullYear();
            if(publicationYear === year) {
                booksInYear.push(book);
            }
        }
    })
    return booksInYear;
};

const minMaxPrice = async () => {
    const books =  await getBooks();
    let minPrice = Math.min(...books.map(book => book.price));
    let maxPrice = Math.max(...books.map(book => book.price));

    let minPriceBookIds = [];
    let maxPriceBookIds = [];
    let booksWithMinPrice = books.filter(book => book.price === minPrice);
    let booksWithMaxPrice = books.filter(book => book.price === maxPrice);

    booksWithMinPrice.forEach(book => {
        minPriceBookIds.push(book.id);
    });

    booksWithMaxPrice.forEach(book => {
        maxPriceBookIds.push(book.id);
    })

    let minMaxPriceArray = {};
    minMaxPriceArray['cheapest'] = minPriceBookIds;
    minMaxPriceArray['mostExpensive'] = maxPriceBookIds;

    return minMaxPriceArray;

};

const searchBooksByPublisher = async (publisher) => {
    if(!publisher) throw ('Error : one or more params is missing in searchBooksByPublisher');
    if(typeof publisher !== 'string') throw ('Error : publisher param should be a string in searchBooksByPublisher');

    const books =  await getBooks();

    let bookIds = [];

    books.forEach(book => {
        if(book.publisher && (book.publisher === publisher)) {
            bookIds.push(book.id);
        }
    });

    if(bookIds.length === 0){
        throw ('Error : publisher name can not be found');
    }

    return bookIds;
};

function validateId(id) {
    if(typeof id !== 'string') throw ('Error : id should be of type string in getBookById');
    id = id.trim();
    if(id.length < 1) throw ('Error : Invalid Id');
}

function checkIfValid(min,max) {
    if(typeof min !== 'number' || typeof max !== 'number') throw ('Error : one or more arguments in booksByPageCount is not a number');
    if(isNaN(min) || isNaN(max)) throw ('Error : one or more arguments in booksByPageCount is NaN');
    if(!(Number.isInteger(min)) || !(Number.isInteger(max))) throw ('Error : one or more arguments in booksByPageCount is not a positive whole number');
    if( max <= min ) throw('Error : max param should be greater than min param in booksByPageCount');
    if(max <= 0) throw('Error : max param should be greater than 0 in booksByPageCount');
    if(min <= 0) throw('Error : min param should be greater than 0 in booksByPageCount');
}

function checkIfValidYear(year) {
    if(typeof year !== 'number') throw('Error : one or more arguments in sameYear is not a number');
    if(isNaN(year)) throw ('Error : Error : one or more arguments in sameYear is NaN');
    if(!(Number.isInteger(year)) || year < 0) throw ('Error : one or more arguments in sameYear is not a positive whole number');
    if(year < 1900 || year > 2024) throw ('Error : year param in sameYear is not in valid range'); // Range was provided by a TA in slack
}
export {getBookById, booksByPageCount, sameYear, minMaxPrice, searchBooksByPublisher}