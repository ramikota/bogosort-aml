// import fetch from 'node-fetch';
// import fs from 'fs';
// import { createConnection } from 'mysql2';
// import dotenv from 'dotenv';
// dotenv.config(); 



// // TMDB API Key
// //const MOVIE_API_KEY = process.env.MOVIE_API_KEY; // TMDB API Key
// const API_KEY = process.env.Books_API;

// // // Fetch Movies Function
// // async function fetchMovies() {
// //     const allMovies = [];
// //     const totalMoviesToFetch = 200;  
// //     let currentPage = 1;

// //     try {
// //         while (allMovies.length < totalMoviesToFetch) {
// //             const url = `https://api.themoviedb.org/3/movie/popular?api_key=${MOVIE_API_KEY}&language=en-US&page=${currentPage}`;
// //             const response = await fetch(url);
// //             const data = await response.json();

// //             if (!data.results || data.results.length === 0) break;

// //             const movies = data.results.slice(0, totalMoviesToFetch - allMovies.length).map(movie => ({
// //                 title: movie.title,
// //                 author: movie.original_title || 'Unknown',
// //                 type: 'Movie',
// //                 availability: 1,
// //                 image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null
// //             }));

// //             allMovies.push(...movies);
// //             currentPage++;  
// //         }

// //         return allMovies;
// //     } catch (error) {
// //         console.error('Error fetching movies:', error.message);
// //         return [];
// //     }
// // }
// async function fetchBooks(author) {
//     try {
//         const url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&key=${API_KEY}`;
//         const response = await fetch(url);
//         const data = await response.json();

//         if (data.items) {
//             return data.items.map(book => {
//                 const title = book.volumeInfo?.title || 'Unknown Title';
//                 const authors = Array.isArray(book.volumeInfo?.authors) ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
//                 const image = book.volumeInfo?.imageLinks?.thumbnail || null;

//                 return { title, authors, image };
//             });
//         }
//         return []; 
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return [];
//     }
// }
// // Store Movies in Database
// // async function storeMovies(movieList) {
// //     try {
// //         for (const movie of movieList) {
// //            
// //             const [existingMovie] = await connection.promise().execute(
// //                 'SELECT id FROM Media WHERE title = ? AND type = ?',
// //                 [movie.title, movie.type]
// //             );

// //             
// //             if (existingMovie.length === 0) {
// //                 await connection.promise().execute(
// //                     'INSERT INTO Media (title, author, type, availability, image) VALUES (?, ?, ?, ?, ?)',
// //                     [movie.title, movie.author, movie.type, movie.availability, movie.image]
// //                 );
// //                 console.log(`Inserted: ${movie.title}`);
// //             } else {
// //                 console.log(`Movie already exists: ${movie.title}`);
// //             }
// //         }
// //     } catch (error) {
// //         console.error('Error storing movies:', error.message);
// //     }
// // }
// async function storeBooks(booksList) {
//     try {
//         for (const book of booksList) {
//             if (!book.title || !book.authors) {
//                 console.log('Skipping book with missing title or authors:', book);
//                 continue; 
//             }

//             await connection.execute(
//                 'INSERT INTO Media (title, author, type, availability, image) VALUES (?, ?, ?, ?, ?)',
//                 [book.title, book.authors, 'Book', 1, book.image]
//             );
//         }
//     } catch (error) {
//         console.error('Error storing books:', error.message);
//     }

// }

// // Main Function
// // async function main() {

// //     const moviesList = await fetchMovies();

// //     await storeMovies(moviesList);
// //     console.log('Movies successfully stored.');
// // }

// async function main() {
//     const booksList = [];
//     const data = await fs.readFileSync('/Users/habib/Documents/bogosort-aml/Backend/authors.txt', 'utf8');
//     const authors = data.split('\n').map(author => author.trim());

//     let totalBooksFetched = 0;

//     for (let author of authors) {
//         console.log(`Fetching books for author: ${author}`);
//         const books = await fetchBooks(author);
        
//         if (books && books.length > 0) {
//             
//             for (const book of books) {
//                 if (totalBooksFetched < 200) {
//                     booksList.push(book);
//                     totalBooksFetched++;
//                 } else {
//                     break;
//                 }
//             }
//         }

//         if (totalBooksFetched >= 200) {
//             break;
//         }
//     }

//     console.log(`Fetched ${booksList.length} books. Storing in database...`);
//     try {
//         await storeBooks(booksList); // Ensure storeBooks is working as expected
//         console.log('Books successfully stored.');
//     } catch (error) {
//         console.error('Error storing books:', error.message);
//     }
// }


//main();