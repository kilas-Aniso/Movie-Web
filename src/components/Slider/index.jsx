import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { getMovies, topRated } from "../../utils/utilities";
import ImageContainer from "../../atoms/ImageContainer";

import './style.css';

const MovieCarousel = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await topRated();
        setMovies(moviesData.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const limit = 6;
  const limitedMovies = movies.slice(0, limit);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    renderDotsOutside: false, 
  };

  return (
    <div className="movies-slider-container">
      {loading ? (
        <h1>Loading movies...</h1>
      ) : (
        <Carousel {...sliderSettings}>
          {movies.length > 0 ? (
            limitedMovies.map((item) => (
              <div key={item.id} className="movie-slide">
              <div className="movie-image">
                <ImageContainer props={item} useBackgroundImage={true} />
              </div>
              <div className="movie-details">
                <p>{item.title}</p>
                <p>{item.overview}</p>
                <p>Release Date: {item.release_date}</p>
                <div className="movie-rating">
                  <p>Rating: {item.vote_average}</p>
                </div>
                <div className="buttons-container">
                  <button className="add-favorite">Add Favorite</button>
                  <button className="watch-now">Watch Now</button>
                </div>
              </div>
            </div>
            
            ))
          ) : (
            <h1>No movies found.</h1>
          )}
        </Carousel>
      )}
    </div>
  );
};

export default MovieCarousel;
