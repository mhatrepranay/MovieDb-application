import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Home.css'; // Reuse styles from AllMovies
import Loader from './Loader';

const SearchMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const { search } = useLocation();
    const navigate = useNavigate();

    const urlParams = new URLSearchParams(search);
    const query = urlParams.get("query") || "";
    const currentPage = parseInt(urlParams.get("page"), 10) || 1;

    useEffect(() => {
        if (!query) return;

        setLoading(true);
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${query}&page=${currentPage}`)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results || []);
                setTotalPages(data.total_pages || 1);
                setLoading(false);

                window.scrollTo({ top: 0, behavior: 'smooth' });
            })
            .catch((error) => {
                console.error("Error fetching search results: ", error);
                setLoading(false);
            });
    }, [query, currentPage]);

    if (loading) {
        return <Loader />;
    }

    const handleMovieClick = (id) => {
        navigate(`/movie/${id}`);
    };

    const handlePageChange = (direction) => {
        let newPage = currentPage;
        if (direction === "next" && currentPage < totalPages) {
            newPage = currentPage + 1;
        } else if (direction === "prev" && currentPage > 1) {
            newPage = currentPage - 1;
        }

        if (newPage !== currentPage) {
            navigate(`/search?query=${query}&page=${newPage}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="home">
            <h1>Search Results for "{query}"</h1>
            <div className="movie-grid">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie.id)}>
                            {movie.poster_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="movie-img"
                                />
                            ) : (
                                <img
                                    src={`/Default.png`}
                                    alt={movie.title}
                                    className="movie-img"
                                />
                            )}
                            <div className="movie-info">
                                <h3>{movie.title}</h3>
                                <p>Rating: {movie.vote_average}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </div>

            {movies.length > 0 && (
                <div className="pagination">
                    <button onClick={() => handlePageChange("prev")} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => handlePageChange("next")} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default SearchMovies;
