import React, { useEffect, useState } from "react";

import MovieCard from "./MovieCard";

import "./App.css";

const API_URL = "http://www.omdbapi.com/?apikey=fd5cfb0e";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  useEffect(() => {
    searchMovies("blockbuster");
  }, []);
  return (
    <div className="app">
      <h1> MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for Movies"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        ></input>
        <img
          src="https://raw.githubusercontent.com/gist/adrianhajdin/997a8cdf94234e889fa47be89a4759f1/raw/f13e5a9a0d1e299696aa4a0fe3a0026fa2a387f7/search.svg"
          alt="search"
          onClick={() => searchMovies(searchItem)}
        />
      </div>
      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h1>No Movies Found</h1>
        </div>
      )}
    </div>
  );
};

export default App;
