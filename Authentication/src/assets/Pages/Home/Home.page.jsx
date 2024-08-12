import { useEffect, useState } from "react"
import axios from 'axios';
export function Home(){
    const key = "9daec7a8";
const[movieList, setMovieList]=useState([])

    useEffect(() => {
        fetchDetailes()
      });

      async function fetchDetailes()
      {
        axios.get("https://www.omdbapi.com/?apikey=${key}").then((res)=>{
            console.log(res.data);
            setMovieList(res.data);
            })
      }
    return(
        <>


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
            <input type="text" placeholder="Search for movies..." />
            <button>Search</button>
          </div>
        </header>
        {movieList.map((item) => (
        <section className="movie-list">
          <div className="movie-item">
            <img src="top-gun.jpg" alt="Top Gun: Maverick" />
            <p>{movieList.Title}</p>
            <p>{movieList.Year}</p>
          </div>
          {/* Repeat movie items as necessary */}
        </section>
         ))}
      </main>
    </div>


        </>
    )
}