import { useEffect, useState } from "react";
import axios from 'axios';

export function Home() {
  const key = "9daec7a8";
  const [movieList, setMovieList] = useState([]); // Initialize movieList as an array
  const [query, setQuery] = useState("Tom Cruise"); // Default search query
  const [error, setError] = useState(""); // To handle any errors

  useEffect(() => {
    fetchDetails();
  }, []);

  async function fetchDetails() {
    try {
      const res = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${key}`);
      if (res.data.Response === "True") {
        setMovieList(res.data.Search); // Set movieList to the array of movie results
      } else {
        setError(res.data.Error); // Handle any errors from the API
        setMovieList([]); // Clear movieList if there's an error
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setError("Failed to fetch data"); // Handle fetch errors
      setMovieList([]); // Clear movieList in case of an error
    }
  }

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="logo">Watchlists</div>
        <nav>
          <ul>
            <li><a href="#" className="active">Home</a></li>
            <li><a href="#"><h4>My Lists</h4></a></li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <header>
          <h1>Welcome to Watchlists</h1>
          <p>
            Browse movies, add them to watchlists and share them with friends.<br />
            Just click the <span className="add-icon">+</span> to add a movie, the poster to see more details or <span className="check-icon">✓</span> to mark the movie as watched.
          </p>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search for movies..." 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} // Update query as user types
            />
            <button onClick={fetchDetails}>Search</button> {/* Trigger search on button click */}
          </div>
        </header>

        <section className="movie-container">
          {error && <p>{error}</p>}
          {movieList.length > 0 ? (
            movieList.map((item) => (
              <div className="movie-item" key={item.imdbID}>
                <img src={item.Poster} alt={item.Title} />
                <p>{item.Title}</p>
                <p>{item.Year}</p>
              </div>
            ))
          ) : (
            !error && <p>No movies found</p>
          )}
        </section>
      </main>
    </div>
  );
}
