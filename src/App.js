import React from "react";
import { useState, useEffect } from "react";
import SearchIcon from "./search.svg"
import './App.css';
import MovieCard from "./MovieCard";

const API_URL = 'http://www.omdbapi.com?apikey=d7fba1f4';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        console.log(data)

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Mission');
    },[])


    return (
        <div className="app">
            <h1>MovieSearch</h1>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') searchMovies(searchTerm)
                    }}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) =>
                            <MovieCard key={movie.imdbID} movie={movie} />
                        )}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }

        </div>
    );
};

export default App;