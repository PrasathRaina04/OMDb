import { useEffect, useState } from "react";
import axios from 'axios';

export function Home() {
  const key = "9daec7a8";
  const [movieList, setMovieList] = useState([]); 
  const [query, setQuery] = useState("Tom Cruise"); 
  const [error, setError] = useState(""); 

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
  function handleSelect(item){
console.log(item.Title)
  }
  
  return (
   <>
<div className="container">
        <div className="row font-monospace text-bg-secondary" style={{ marginTop:"16px", }}>
            <div className="col-lg-9 offset-0 text-center">
                <div className="text-center shadow-lg"><label className="form-label" style={{ marginLeft:"80px", }}>Search&nbsp; :&nbsp;&nbsp;<input className="form-control-lg" type="search" placeholder="www.yourwebsite.com" style={{ width:"374.3px", marginTop:"12px", }} /></label></div>
            </div>
            <div className="col"><label className="form-label">User Logged in :</label>
                <p className="text-end" style={{ width:"144px", }}>Prasath</p>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6 col-lg-3">
                <div className="font-monospace text-start" style={{ marginBottom:"22px", marginTop:"10px", }}>
                    <h1 className="text-start" style={{ color:"var(--bs-red)", fontWeight:"bold", fontSize:"38.9px", }}>Watchlists</h1>
                </div>
                <div className="font-monospace"><input type="search" placeholder="Search" style={{ marginTop:"0px", marginBottom:"40px", }} /></div>
                <div className="font-monospace text-start"><button className="btn btn-danger fs-6" type="button" style={{ background:"var(--bs-danger)", width:"192.2px", height:"53.3px", marginBottom:"28px", }} ><i className="fa fa-home" style={{ paddingRight:"16px", }}></i>Home</button></div>
                
                <div>
                    <h1>My List</h1>
                    <ul>
                        <li>Item 1</li>
                    </ul>
                </div>
            </div>
            <div className="col-md-6 col-lg-9">
                <section className="photo-gallery py-4 py-xl-5">
                    <div className="container">
                        <div className="row mb-5">
                            <div className="col-md-8 col-xl-6 text-center mx-auto">
                                <h2>Welcome to Watchlists</h2>
                                {/* <p className="w-lg-50">Browse movies, add them to watchlists and share them with friends.<br><br></p> */}
                            </div>
                        </div>
                        <div className="row" style={{ marginBottom:"22px", }}>
                            <div className="col">
                                <div className="input-group"><span className="input-group-text">Type a Movie name here&nbsp;</span><input className="form-control" type="text" placeholder="tom cruse movie" /><button className="btn btn-primary" type="button">SEARCH</button></div>
                            </div>
                        </div>
                        {movieList.map((item) => (
                             <div className="card border-success mb-3" style={{ maxWidth:"20rem", }}>
                             <div className="card-header" onClick={(item)=>handleSelect(item)}>{item.Title}</div>
                             <div className="card-body">
                               <h4 className="card-title">{item.Year}</h4>
                             </div>
                           </div>
                         ))}
                    </div>
                       
              
                </section>
            </div>
        </div>
    </div>
    
   </>
  );
}
