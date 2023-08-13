import React, { useState, useEffect } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import ImageContainer from "../../atoms/ImageContainer";
import { SearchMovies } from "../../utils/utilities";

const GetSearch = () => {
  const { query } = useParams();
  const [searchResults, setSearchResult] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const results = await SearchMovies(query);
      setSearchResult(results.results);
    };

    fetchSearchResults(); 
  }, [query]);


};

export default GetSearch;
