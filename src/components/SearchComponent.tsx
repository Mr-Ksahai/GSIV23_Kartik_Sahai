"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { IMovie } from "@/interface/movie";

interface SearchComponentProps {
  loadMovies: (page: number) => void;
  setSearchResults: React.Dispatch<React.SetStateAction<IMovie[]>>;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  loadMovies,
  setSearchResults,
}) => {
  const [input, setInput] = useState("");

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
  }, [input, setSearchResults]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loadMovies(1);
  };

  return (
    <form className="w-auto" onSubmit={handleSearchSubmit}>
      <input
        type="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search Upcoming Movies"
        required
      />
    </form>
  );
};

export default SearchComponent;
