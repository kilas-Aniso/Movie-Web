
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMovieDetails } from "../../utils/utilities";
import './style.css'


const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;

const MovieDetails = () => {
  const { movie_id } = useParams();
  const [detail, setdetail] = useState(null);

  useEffect(() => {
    const display = async () => {
      try {
        const displayMovie = await getMovieDetails(movie_id);
        setdetail(displayMovie);
      } catch (error) {
        console.log(error);
      }
    };
    display();
  }, [movie_id]);
  console.log(MovieDetails)

  return (
    <>
    
      {detail && (
        <div className="movie-details-div">
          <div className="movie-botton">
            <img
              src={`${IMAGE_BASE_URL}${detail.poster_path}`}
              alt={detail.title}
            />
            <br />
            <button>Watch Now</button>
          </div>
          <div className="movie-details">
            <h2>
              {detail.title}
            <span className="favorite-icon">
              

            
            </span>
            </h2>
            <div className="three-divs">
            <p>{detail.overview}</p>
              <p>Adult: {detail.adult ? "Yes" : "No"}</p>
              <p>Vote Count: {detail.vote_count}</p>

              <p>
                Genre_ids:{" "}
                {detail.genres.map((genre, index) =>
                  detail.genres.length - 1 > index ? `${genre.id}, ` : genre.id
                )}
              </p>
              <p>Release_dates : {detail.release_date}</p>
           
              
    
            </div>
          </div>
        </div>
      )}
      
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>

    
    </>
  );
};

export default MovieDetails;
