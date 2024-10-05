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
        const authorData = await authors.getAuthorById("123");
        console.log (authorData);
    }catch(e){
        console.log (e);
    }
*/

import * as authors from "./authors.js";
import * as book from "./books.js";


try{
    const authorData = await authors.getAuthorById('123122');
    console.log (authorData);

}catch(e){
    console.log (e);
}



try {
    const authors_genre = await authors.authorsMultipleGenres();
    console.log(authors_genre);
} catch (e) {
    console.error(e);
}

try {
    const avg = await authors.averagePageCount("Madelaine", "");
    console.log(avg);
} catch (e) {
    console.error(e);
}

try {
    const avg = await authors.getAuthorsByAgeRange("6", "25");
    console.log(avg);
} catch (e) {
    console.error(e);
}


try {
    const avg = await authors.authorsByGenre(55);
    console.log(avg);
} catch (e) {
    console.error(e);
}


//book

try {
    const avg = await book.getBookById("77775");
    console.log(avg);
} catch (e) {
    console.error(e);
}

try {
    const avg = await book.booksByFormat();
    console.log(avg);
} catch (e) {
    console.error(e);
}

try{
    const authorData = await book.mostPopularGenre();
    console.log (authorData);
} catch(e){
    console.error (e);
}

try {
    const publish = await book.booksByPublisher("");
    console.log(publish);
} catch(e){
    console.error (e);
}


try {
    const publish = await book.averagePriceByGenre(55);
    console.log(publish);
} catch(e){
    console.error (e);
}
