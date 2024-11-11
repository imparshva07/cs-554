//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json

//you must use axios to get the data

import {
    getAuthors
} from './helpers.js';
import {
    getBookById
} from './books.js'

const getAuthorById = async (id) => {
    if(!id) throw ('Error : id missing in getAuthorById param');
    validateId(id);
    id = id.trim();
    const authors =  await getAuthors();
    const authorFound = authors.find((ele) => ele.id === id);
    if(!authorFound) throw ('Error : author not found');
    return authorFound;
};

const searchAuthorsByAge = async (age) => {
    if(!age) throw ('Error : age missing in searchAuthorsByAge param');
    validateAge(age);
    const authors =  await getAuthors();
    const authorsFound  = authors.filter( author => {
        const birthDate = new Date(author.date_of_birth);
        const months = Date.now() - birthDate.getTime();
        const date_age = new Date(months);
        const year = date_age.getUTCFullYear();
        const author_age = Math.abs(year - 1970);
        return author_age >= age;
    });

    const author_names = [];

    authorsFound.forEach( ele => {
        author_names.push(ele.first_name + ' ' + ele.last_name);
    });
    return author_names;
};

const getBooksByState = async (state) => {
    if(!state) throw ('Error : state missing in getBooksByState param');
    validateState(state);
    state = state.trim();
    state = state.toLowerCase();
    const authors =  await getAuthors();
    const authorsWithState = authors.filter((ele) => ele.HometownState.toLowerCase() === state);
    let bookIds = [];

    authorsWithState.forEach( author => {
        if(author.books && author.books.length > 0) {
            bookIds.push(...(author.books));
            }
    })


    let names = [];
    for (const id of bookIds) {
        let book = await getBookById(id);
        names.push(book.title);
    }

    return names;
};

const searchAuthorsByHometown = async (town, state) => {
    if(!town || !state) throw ('Error : one or more params is missing in searchAuthorsByHometown');
    validateState(state);
    state = state.trim();
    town = town.trim();
    town = town.toLowerCase();
    state = state.toLowerCase();
    const authors =  await getAuthors();
    let filteredAuthors = authors.filter((auth) => 
        (auth.HometownCity.toLowerCase() === town) && (auth.HometownState.toLowerCase() === state)
    )

    filteredAuthors.sort((a,b) => a.last_name.toLowerCase().localeCompare(b.last_name.toLowerCase()));
    
    const author_names = [];

    filteredAuthors.forEach( ele => {
        author_names.push(ele.first_name + ' ' + ele.last_name);
    });
    return author_names;
};




const getAuthorBooks = async (authorid) => {
    if(!authorid) throw ('Error : authorid missing in getAuthorBooks');
    if(typeof authorid !== 'string') throw ('Error : authorid param in getAuthorBooks should be string only');
    const authors =  await getAuthors();
    const authorFound = authors.find((ele) => ele.id === authorid);
    if(!authorFound) throw ('Error : author not found');

    let author_books = [];

    if(authorFound.books && (authorFound.books.length > 0)) {
        let book_data;

        for (const book of authorFound.books) {
            book_data = await getBookById(book);
            author_books.push(book_data.title);
        }
    } else {
        return author_books;
    }

    return author_books;
};


function validateId(id) {
    if(typeof id !== 'string') throw ('Error : id should be of type string in getAuthorById');
    id = id.trim();
    if(id.length < 1) throw ('Error : Invalid Id');
}

function validateAge(age) {
    if(typeof age !== 'number') throw ('Error : age is not a number in searchAuthorsByAge');
    if(isNaN(age)) throw ('Error : age is NaN in searchAuthorsByAge');
    if(!(Number.isInteger(age))) throw('Error : age should be a whole number');
    if((age < 1 || age > 100)) throw('Error : age should be a whole number between 1-100');
}

function validateState(state) {
    if(typeof state !== 'string') throw ('Error : state should be of type string in getBooksByState');
    state = state.trim();
    if(state.length !== 2) throw ('Error : Invalid state abbreviation & length');
    const validStateAbbr = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC'];
    if(!(validStateAbbr.includes(state.toLowerCase())) && !(validStateAbbr.includes(state.toUpperCase()))) throw ('Error : Invalid state abbreviation');
}

export {getAuthorById, searchAuthorsByAge, searchAuthorsByHometown, getBooksByState, getAuthorBooks}