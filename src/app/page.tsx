"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "@/components/MovieCard";
import Header from "@/components/Header";
import { IMovie } from "@/interface/movie";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    loadMovies(1);
  }, []);

  
 

  const loadMovies = (page: number) => {
    setIsLoadingMore(true);
    let searchMovie = new URLSearchParams(window.location.search).get("movie");

    const apiUrl =
      searchMovie !== null
        ? `https://api.themoviedb.org/3/search/movie`
        : `https://api.themoviedb.org/3/movie/upcoming`;

    axios
      .get(apiUrl, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          query: searchMovie,
          language: "en-US",
          page,
        },
      })
      .then((res) => {
        const upcomingMovies = res.data.results;
        if (page === 1) {
          setMovies(upcomingMovies);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...upcomingMovies]);
        }
        setCurrentPage(page);
        setIsLoadingMore(false);
      });
  };

  const handleMovieClick = (movieId: number) => {
    console.log('clicked')
    router.push(`/movie/${movieId}`);
  };


  useEffect(() => {
    loadMovies(1);
  }, [searchParams]);

  

  return (
    <div>
      <Header loadMovies={loadMovies} onSearch={handleDataFromChild2} />
      {search.length === 0 && (
        <div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-6">
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
