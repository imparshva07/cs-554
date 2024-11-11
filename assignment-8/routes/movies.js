//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/movies.js that you will call in your routes below
import {Router} from 'express';
const router = Router();
import {searchMoviesByName, searchMovieById} from '../data/movies.js';


router.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file
  try {
    res.render('home', { title: 'Movie Finder' });
  } catch(e) {
    return res.status(500).json({error: e});
  }
});

router.route('/searchmovies').post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchMoviesByName and then call your data function passing in the searchMoviesByName and then rendering the search results of up to 20 Movies.
  try{
    let movieName;
    let validMovieNameSupplied = true;
    if(req.body && req.body.searchMoviesByName) {
      movieName = req.body.searchMoviesByName;
      if (typeof movieName !== 'string') throw ('Error: it must be a string!');
      movieName = movieName.trim();
      if (movieName.length === 0) {
        validMovieNameSupplied = false;
      }
    } else {
      if(!req.body.searchMoviesByName) {
        validMovieNameSupplied = false;
      } 
    }

    if(!validMovieNameSupplied) {
      return res.status(400).render('error', {
        errorMessage: 'searchMoviesByName cannot be an empty string or just spaces',
        statusCode: 400
    });
    }
    movieName = movieName.trim();
    
    let moviesList = [];
    let moviesFound = false;
    let moviesByNameList = await searchMoviesByName(movieName);
    if(moviesByNameList.Response && moviesByNameList.Response === 'False') {
      if(moviesByNameList.Error && moviesByNameList.Error === 'Movie not found!') {
        moviesFound = false;
      }
    }
    if(moviesByNameList.Search && moviesByNameList.Search.length > 0) {
      moviesFound = true;
      moviesList.push(...moviesByNameList.Search);
    if(moviesByNameList.Search.length === 10){
      moviesByNameList = await searchMoviesByName(movieName, 2);
      if(moviesByNameList.Search.length) {
        moviesList.push(...moviesByNameList.Search);
      }
    }
    }
    if(moviesFound) {
      res.render('movieSearchResults', {
        moviesFound : moviesFound,
        title: 'Movies Found',
        movieName,
        movies: moviesList
    });
    } else {
      res.status(404).render('movieSearchResults', {
        moviesFound : moviesFound,
        title: 'Movies Found',
        movieName,
        movies: moviesList
    });
    }
  } catch(e) {
    return res.status(400).json({error: e});
  }

});

router.route('/movie/:id').get(async (req, res) => {
  //code here for GET a single movie
  let movieId;
  try{
    movieId = req.params.id;
    if (typeof movieId !== 'string') throw `Error: it must be a string!`;
    movieId = movieId.trim();
    if (movieId.length === 0) throw `Error: It cannot be an empty string or just spaces`;
  } catch(e) {
    return res.status(400).json({error: e});
  }

  try{
    movieId = movieId.trim();
    let movieDetails = await searchMovieById(movieId);
    if(movieDetails.Response === 'False') {
      return res.status(404).render('error', {
        errorMessage: movieDetails.Error,
        statusCode: 404
    });
    }
    res.render('movieById', {
      title: movieDetails.Title,
      movie: movieDetails
  });
  } catch(e) {
    return res.status(404).json({error: e});
  }
});


export default router;