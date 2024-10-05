//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json

//you must use axios to get the data


import helper from './helpers.js'
import { AgeFromDateString } from 'age-calculator';

const getAuthorById = async (id) => {
    if(typeof id !== 'string'){
        throw "ID must be a string";
    }

    id = id.trim();

    if(id === ''){
        throw "ID must not be empty";
    }

    let authors = await helper.getAuthors();
    let author = authors.find(author => author.id === id);

    if(!author){
        throw "author not found";
    }

    return author;
};

const authorsMultipleGenres = async () => {
    let authors = await helper.getAuthors();
    let books = await helper.getBooks();

    let array_of_authors = []
    authors.forEach(author =>{
        let array_of_genres = []
        let array_of_unique_genre = []

        for(let bookId of author.books){
            let book = books.find(b => b.id === bookId);
            array_of_genres.push(book.genres);
        }

        for(let genre of array_of_genres){
            if(!array_of_unique_genre.includes(genre)){
                array_of_unique_genre.push(genre);
            }
        }

        if(array_of_unique_genre.length > 1){
            array_of_authors.push(`${author.first_name} ${author.last_name}`)
        }
    });

    array_of_authors.sort((a, b) => {
        const lastNameA = a.split(' ')[1].toLowerCase();
        const lastNameB = b.split(' ')[1].toLowerCase();
        if (lastNameA < lastNameB) {
            return -1;
        }
        if (lastNameA > lastNameB) {
            return 1;
        }
        return 0;
    });

    return array_of_authors;

};

const averagePageCount = async (firstName, lastName) => {
    if(typeof firstName !== 'string' || typeof lastName !== 'string'){
        throw "First name and last name must be strings";
    }
    if(firstName === '' || lastName === ''){
        throw "First name and last name must not be empty";
    }

    firstName = firstName.trim().toLowerCase()
    lastName = lastName.trim().toLowerCase()

    let authors = await helper.getAuthors();
    let books = await helper.getBooks();

    let author = authors.find(author => author.first_name.toLowerCase() === firstName && author.last_name.toLowerCase() === lastName);

    if(!author){
        throw "Author not found";
    }

    if(author.books.length === 0){
        throw "Author doesn't have any books";
    }

    let total_pages = 0;
    let total_books = 0;

    for(let bookId of author.books){
        let book = books.find(b => b.id === bookId);
        if(book) {
            total_pages += book.pageCount;
            total_books++;
        }
    }

    let average = Math.round((total_pages / total_books)*100)/100;
    return average;
};

const getAuthorsByAgeRange = async (minAge, maxAge) => {
    if(typeof minAge !== 'number' || typeof maxAge !== 'number'){
        throw "ages have to be numbers";
    }
    //check if min and max age are integers
    if(!Number.isInteger(minAge) || !Number.isInteger(maxAge)){
        throw "ages have to be integers";
    }
    if(minAge > maxAge){
        throw "min age has to be less than max age"
    }
    if(minAge<1){
        throw "age has to be greater than or equal to 1"
    }

    let array_of_authors = [];
    let authors = await helper.getAuthors();

    authors.forEach(author =>{
            let dob = author.date_of_birth;
            let dob_list = dob.split('/');
            dob = `${dob_list[2]}-${dob_list[0]}-${dob_list[1]}`;
            let ageFromString = new AgeFromDateString(dob).age;
            if(ageFromString >= minAge && ageFromString <= maxAge){
                array_of_authors.push(`${author.first_name} ${author.last_name}`)
            }
    });

    if(array_of_authors.length === 0){
        throw "No authors found";
    }

    return array_of_authors;
};

const authorsByGenre = async (genre) => {
    if(typeof genre !== 'string'){
        throw "must be a string";
    }
    if(genre === ''){
        throw "can't be empty";
    }
    genre = genre.trim().toLowerCase();
    let split_genre = genre.split(' ');
    genre = split_genre.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');


    let authors = await helper.getAuthors();
    let books = await helper.getBooks();

    let array_of_authors = [];
    authors.forEach(author =>{
        for(let bookId of author.books){
            let book = books.find(b => b.id === bookId);
            if(book){
                if(book.genres.includes(genre)){
                    array_of_authors.push(`${author.first_name} ${author.last_name}`)
                    break;
                }
            }
        }
    });

    if(array_of_authors.length === 0){
        throw "No authors found";
    }

    return array_of_authors;
};


export {getAuthorById, authorsMultipleGenres, averagePageCount, getAuthorsByAgeRange, authorsByGenre};