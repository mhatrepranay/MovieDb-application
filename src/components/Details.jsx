import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom"; // Import useLocation to get query params
import "./Details.css";
import Loader from "./Loader";

const Details = () => {
    const { id } = useParams();
    const { search } = useLocation(); // Get query parameters
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_KEY = "c45a857c193f6302f2b5061c3b85e743";

    // Get current page from URL query params
    const urlParams = new URLSearchParams(search);
    const currentPage = urlParams.get("page") || 1;

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
                const data = await res.json();
                setMovie(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        const fetchMovieCast = async () => {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
                const data = await res.json();
                setCast(data.cast || []);
            } catch (error) {
                console.error("Error fetching cast details:", error);
            }
        };

        fetchMovieDetails();
        fetchMovieCast();
    }, [id]);

    if (loading || !movie) {
        return <Loader />;
    }

    // Navigate back to the same page number after viewing details


    return (
        <div className="details">
            {/* Movie Hero Section */}
            <div className="movie-details-container">
                {/* Left Section - Poster and Info */}
                <div className="movie-info-container">
                    <div className="poster-and-info">
                        {movie.poster_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="movie-poster"
                            />
                        ) : (
                            <img
                                src={`/Default.png`}
                                alt={movie.title}
                                className="movie-poster"
                            />
                        )}
                        <div className="movie-info122">
                            <h1 style={{ fontSize: "20px" }}>{movie.title}</h1>
                            <p className="rating">⭐ Rating: {movie.vote_average}</p>
                            <p className="runtime">{movie.runtime} min</p>
                            <p className="genres">
                                {movie.genres?.map((genre) => genre.name).join(", ") || "N/A"}
                            </p>
                            <p className="release-date">📅 Release Date: {movie.release_date}</p>
                        </div>
                    </div>
                    {/* Overview Section Below */}
                    <div className="overview">
                        <h2>Overview</h2>
                        <p>{movie.overview}</p>
                    </div>
                </div>

                {/* Right Section - Backdrop Image */}
                <div className="backdrop-container">

                    {movie.backdrop_path ? (
                        <img
                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                            alt={movie.title}
                            className="backdrop-image"
                        />
                    ) : (
                        <img
                            src={`/Default.png`}
                            alt={movie.title}
                            className="backdrop-image1"
                        />
                    )}
                </div>
            </div>

            {/* Cast Section */}
            <h2 className="cast-title">Cast</h2>
            <div className="cast-container">
                {cast.length > 0 ? (
                    cast.map((actor) => (
                        <div key={actor.id} className="cast-card">
                            <img
                                src={
                                    actor.profile_path
                                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                        : `/user.png`
                                }
                                alt={actor.name}
                            />
                            <p>{actor.name}</p>
                            <p>Character: {actor.character}</p>
                        </div>
                    ))
                ) : (
                    <p>No cast available</p>
                )}
            </div>
        </div>
    );
};

export default Details;
