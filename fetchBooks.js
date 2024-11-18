const fs = require('fs');
const fetch = require('node-fetch');

const API_KEY = process.env.GOOGLE_API_KEY;

async function fetchBooks(author) {
    try {
        const url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}}&key=${API_KEY}`;
        const response = await fetch(url);

        const data = await response.json();
        const books = data.items;
        return books.map(book => {
            const title = book.volumeInfo.title;
            const authors = book.volumeInfo.authors;
            const genres = book.volumeInfo.categories;
            const image = book.volumeInfo.imageLinks;

            return {title, authors, genres, image};
        })
    } catch (error) {
        console.error('Error fetching data')
    }
}

// function to write the books to a JSON file
function toJson(books) {
    const data = JSON.stringify(books, null, 2);
    fs.writeFileSync('books.json', data, 'utf-8');
}

async function main() {
    const booksList = [];
    // reads the authors from file
    const data = await fs.readFileSync('authors.txt', 'utf8'); // a file containing the top 100 authors taken from https://bhaviksarkhedi.medium.com/top-100-famous-authors-and-their-most-popular-book-143dab6514c5
    const authors = data.split('\n').map(author => author.trim());

    // loops through the authors and calls the fetchBooks function to get the book data
    for (let author of authors) {
        const books = await fetchBooks(author);
        if (books.length != undefined) {
            // add the fetched books to the array
            for (i=0; i < books.length; i++) {
                booksList.push(books[i]);
            }
        }
    }
    
    toJson(booksList);
}

main();