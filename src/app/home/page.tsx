"use client";
import React, { useEffect, useState } from "react";
import { IMovie } from "@/interface/movie";
import axios from "axios";
import MovieCard from "@/components/MovieCard";
import Header from "../../components/Header";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { loadMoviesAction } from "../../redux/Action/action";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isImgLoading, setIsImgLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !isLoadingMore
      ) {
        loadMovies(currentPage + 1);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoadingMore, currentPage]);

  const loadMovies = (page: number) => {
    setIsLoadingMore(true);
    let searchMovie = searchParams.get("movie");

    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
        {
          params: {
            api_key: process.env.NEXT_PUBLIC_API_KEY,
            query: searchMovie,
          },
        }
      )
      .then((res) => {
        const moviePromises = res.data.results.map((movie: any) =>
          axios.get(
            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=videos`
          )
        );

        Promise.all(moviePromises).then((movieDetails) => {
          setMovies((prevMovies) => [
            ...prevMovies,
            ...movieDetails.map((detail) => detail.data),
          ]);
          setCurrentPage(page);
          setIsLoadingMore(false);
        });
      });
  };
  const handleMovieClick = (movieId: number) => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          language: "en-US",
        },
      })
      .then((res) => {
        const movieData = res.data;

        // router.push(`/movie/${movieId}`);
        setMovieDetails(movieData);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    loadMovies(1);
  }, [searchParams]);

  return (
    <div>
      <Header loadMovies={loadMovies} setSearchQuery={setSearchQuery} />
      {searchQuery.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-6"></div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-6">
            {movies.map((movie, index) => (
              <MovieCard
                key={index}
                title={movie.title}
                rating={parseFloat(movie.vote_average).toFixed(1)}
                description={movie.overview}
                image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                onClick={() => handleMovieClick(movie.id)}
              />
            ))}
          </div>
          {isLoadingMore && <p>Loading movies...</p>}
        </div>
      )}
    </div>
  );
}
