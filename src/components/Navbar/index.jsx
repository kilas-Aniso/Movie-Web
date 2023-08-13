import React, { useState } from "react";
import './style.css';
import { SearchMovies } from "../../utils/utilities";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  const handleInput = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = async () => {
    const results = await SearchMovies(searchValue);
    setSearchResult(results.results);
    navigate(`/search/${encodeURIComponent(searchValue)}`);
  };

  const handleClick = () => {
    navigate('./');
  };

  return (
    <div className="navbar-lg p-3">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <h1 className="movie">Moovie</h1>
            <div className="d-flex flex-grow-1 justify-content-center">
              <input
                className="search"
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={handleInput}
              />
              <button className='btn btn-lg btn-warning ml-2' onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mb-2 mb-lg-0 custom-nav">
              <li className="nav-item">
                <a className="nav-link " href="/home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/My list">My List</a>
              </li>
              <li className="nav-item">
                <button className="warning" type="button">
                  <a className="nav-link active" href="/sign Up">Sign Up</a>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {searchResult.length > 0 && (
        <div className="search-movies">
          {searchResult.map((movie) => (
            <div key={movie.id} className="search-detail">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h5>{movie.title}</h5>
              <p>{movie.overview}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
