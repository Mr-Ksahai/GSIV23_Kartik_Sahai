import React, { useState, useEffect } from "react";
import  {useRouter}  from "next/navigation";
import axios from "axios";
import MovieCard from "./MovieCard";
import { IMovie } from "@/interface/movie";

interface SearchComponentProps {
  loadMovies: (page: number) => void;
  setSearchQuery: (query: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  loadMovies,
  setSearchQuery,
}) => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState<IMovie[]>([]);
  const router=useRouter();

  useEffect(() => {
    if (input.trim() === "") {
      setSearchResults([]);
      return;
    }

    const searchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          {
            params: {
              api_key: process.env.NEXT_PUBLIC_API_KEY,
              query: input,
            },
          }
        );

        setSearchResults(response.data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    const searchTimeout = setTimeout(searchMovies, 300);

    return () => {
      clearTimeout(searchTimeout);
    };
  }, [input]);

  const navigateToMovieDetails = (movieId: any) => {
    router.push(`/movie/${movieId}`);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(input);
    loadMovies(1);
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search Upcoming Movies"
        required
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-6">
        {searchResults.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            rating={parseFloat(movie.vote_average).toFixed(1)}
            description={movie.overview}
            image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            onClick={() => navigateToMovieDetails(movie.id)}
          />
        ))}
      </div>
    </form>
  );
};

export default SearchComponent;
