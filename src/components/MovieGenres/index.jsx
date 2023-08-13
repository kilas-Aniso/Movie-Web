import React, { useState, useEffect } from 'react';
import { genres, getMovies } from '../../utils/utilities'; 
import './style.css';
import { Link } from 'react-router-dom';
import ImageContainer from '../../atoms/ImageContainer';

const MovieGenre = () => {
  const [movieGenres, setMovieGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);  
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const genreResult = await genres();
        setMovieGenres(genreResult.genres);      
        const movieResult = await getMovies();
        setMovies(movieResult.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(true);
        setLoading(false);
      }
    };fetchData();
  }, []);  
  
  
  useEffect(() => {
    if (selectedGenre !== null) {
      const filteredMovies = movies?.filter((movie) =>
        movie.genre_ids.includes(selectedGenre)
      );
      setFilteredMovies(filteredMovies || []);
    } 
    else {
      setFilteredMovies(movies);
    }
  },
   [selectedGenre, movies]); 
    const handleGenreClick = (genreId) => {
    if (genreId === selectedGenre) {
      return; 
    }
    setSelectedGenre(genreId);
  }; 
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  if (error) {
    return <div className="error">Error fetching data.</div>;
  }  
  
  
  return(
    <div>
    <div className="genre-container">
      {movieGenres && movieGenres.length > 0 ? (
        <>
          <div
            className={`genre-tag ${selectedGenre === null ? 'selected' : ''}`}
            onClick={() => handleGenreClick(null)}
          >
            All
          </div>
          {movieGenres.map((item) => (
            <div
              key={item.id}
              className={`genre-tag ${selectedGenre === item.id ? 'selected' : ''}`}
              onClick={() => handleGenreClick(item.id)}
            >
              {item.name}
            </div>
          ))}
        </>
      ) : (
        <div className="loading">Loading genres...</div>
      )}
        </div>   
        <div className="movie-list">
        {filteredMovies && filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
            <ImageContainer props={movie} />
          </Link>
        ))
      ) : (
        <h1>No movies found</h1>
      )}
    </div>    
    </div> 
     );
};
export default MovieGenre;