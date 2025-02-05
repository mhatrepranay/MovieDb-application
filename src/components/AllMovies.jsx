import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Home.css';
import Loader from './Loader';
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const AllMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const { page, pagename } = useParams();  // ✅ Get pagename and page from URL
    const navigate = useNavigate();

    const currentPage = parseInt(page, 10) || 1;  // Convert page to number, default to 1
    const currentPageName = pagename || "popular"; // Default to "popular" if not provided
    useEffect(() => {
        setLoading(true);
        fetch(`https://api.themoviedb.org/3/movie/${currentPageName}?api_key=${API_KEY}&language=en-US&page=${currentPage}`)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results || []);
                setTotalPages(data.total_pages);
                setLoading(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setLoading(false);
            });
    }, [currentPage, currentPageName]); // ✅ Corrected dependency array

    if (loading) {
        return <Loader />;
    }

    // Handle movie click and navigate to the details page
    const handleMovieClick = (id) => {
        navigate(`/movie/${id}`);
    };

    // Handle page change and navigate to the new page
    const handlePageChange = (direction) => {
        let newPage = currentPage;
        if (direction === "next" && currentPage < totalPages) {
            newPage = currentPage + 1;
        } else if (direction === "prev" && currentPage > 1) {
            newPage = currentPage - 1;
        }

        if (newPage !== currentPage) {
            navigate(`/movies/${currentPageName}/${newPage}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="home">
            <h1>{currentPageName.replace("_", " ").toUpperCase()} MOVIES</h1> {/* Display correct page name */}
            <div className="movie-grid">
                {movies.map((movie) => (
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
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination">
                <button
                    onClick={() => handlePageChange("prev")}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange("next")}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllMovies;
