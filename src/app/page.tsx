"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import { IMovie } from "@/interface/movie";
import axios from "axios";
import MovieCard from "@/components/MovieCard";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [search, setSearch] = useState<IMovie[]>([]);

  const handleDataFromChild2 = (data: any) => {
    setSearch(data);
  };

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
        const upcomingMovies = res.data.results;
        setMovies((prevMovies) => [...prevMovies, ...upcomingMovies]);
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
