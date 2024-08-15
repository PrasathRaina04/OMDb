import React, { useEffect, useState } from "react";
import axios from "axios";

function HomeDulicate() {
  const key = "9daec7a8";
  const [movieList, setMovieList] = useState([]);
  const [query, setQuery] = useState("Tom Cruise");
  const [error, setError] = useState("");
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, []);

  async function fetchDetails() {
    try {
      const res = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${key}`);
      if (res.data.Response === "True") {
        setMovieList(res.data.Search);
      } else {
        setError(res.data.Error);
        setMovieList([]);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setError("Failed to fetch data");
      setMovieList([]);
    }
  }

  function handleSelect(item) {
    setFavList((prevFavList) => [...prevFavList, item]);
  }

  return (
    <div className="container">
      <div className="row">
        <aside className="sidebar col-md-3">
          <h2 className="sidebar-title">Watchlists</h2>
          <input className="search-input" type="search" placeholder="Search" />
          <button className="home-button">
            <i className="fa fa-home"></i> Home
          </button>
          <div className="my-lists">
            <h3>My Lists</h3>
            <ol>
              {favList.map((item, index) => (
                <li key={index} style={{color:"blue", fontSize:"20px"}}>{item.Title}</li>
              ))}
            </ol>
          </div>
          <div className="guest">
            <i className="fa fa-user"></i> Guest
          </div>
        </aside>

        <main className="main-content col-md-9">
          <div className="welcome-banner">
            <h1>
              Welcome to <span className="highlight">Watchlists</span>
            </h1>
            <p>
              Browse movies, add them to watchlists and share them with friends.<br />
              Just click the <i className="fa fa-plus"></i> to add a movie, the poster to see more details, or mark the movie as watched.
            </p>
          </div>

          <div className="search-bar">
            <input type="search" placeholder="Tom Cruise Movies" />
            <button className="search-button">Search</button>
          </div>

          <div className="movie-gallery">
            {movieList.map((item) => (
              <div key={item.imdbID} className="movie-card" onClick={() => handleSelect(item)}>
                <img src={item.Poster} alt={item.Title} />
                <p>{item.Title}</p>
                <span className="rating">{item.Year}</span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default HomeDulicate;
