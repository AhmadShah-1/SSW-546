//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Books data link: https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json

import helper from "./helpers.js";

const getBookById = async (id) => {
    if(typeof id !== 'string'){
        throw "ID must be a string";
    }

    id = id.trim();

    if(id === ''){
        throw "ID must not be empty";
    }

    let books = await helper.getBooks();
    let book = books.find(book => book.id === id);

    if(!book){
        throw "author not found";
    }

    return book;
};

const booksByFormat = async () => {
    let dict_of_books = {}
    let books = await helper.getBooks();

    books.forEach(book =>{
        if(book.format){
            for(let format of book.format){
                if (dict_of_books[format]) {
                    dict_of_books[format] += 1;
                } else {
                    dict_of_books[format] = 1;
                }
            }
        }
    });

    return dict_of_books;
};

const mostPopularGenre = async () => {
    let dict_of_books = {}
    let books = await helper.getBooks();

    books.forEach(book =>{
        if(book.genres){
            for(let genre of book.genres){
                if (dict_of_books[genre]) {
                    dict_of_books[genre] += 1;
                } else {
                    dict_of_books[genre] = 1;
                }
            }
        }
    });

    let max = 0;
    let max_genre = [];

    for (let key in dict_of_books) {
        if (dict_of_books[key] > max) {
            max = dict_of_books[key];
            max_genre = [key];
        } else if (dict_of_books[key] === max) {
            max_genre.push(key);
        }
    }

    return max_genre;
};

const booksByPublisher = async (publisher) => {
    if(typeof publisher !== 'string'){
        throw "Publisher must be a string";
    }

    publisher = publisher.trim();

    if(publisher === '') {
        throw "Publisher cannot be empty";
    }


    let books = await helper.getBooks();
    let array_of_publishes = [];

    books.forEach(book =>{
        if(book.publisher === publisher){
            array_of_publishes.push(book);
        }
    });
    if(array_of_publishes.length === 0){
        throw "Publisher not found";
    }

    return array_of_publishes;
};

const averagePriceByGenre = async (genre) => {
    if(typeof genre !== 'string'){
        throw "must be a string";
    }
    if(genre === ''){
        throw "can't be empty";
    }
    genre = genre.trim().toLowerCase();
    let split_genre = genre.split(' ');
    genre = split_genre.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    let books = await helper.getBooks();
    let list_of_genre = [];
    let cost = 0;
    books.forEach(book =>{
        if(book.genres.includes(genre)){
            cost += book.price;
            list_of_genre.push(book);
        }
    });

    if (list_of_genre.length === 0) {
        throw "No books found";
    }

    return Math.round(cost * 100) / 100;
};


export { getBookById, booksByFormat, mostPopularGenre, booksByPublisher, averagePriceByGenre };