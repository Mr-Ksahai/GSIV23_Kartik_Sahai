import React, { useState } from "react";
import SearchComponent from "./SearchComponent";
import MovieCard from "./MovieCard";
import { IMovie } from "@/interface/movie";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/navigation";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

interface HeaderProps {
  loadMovies: (page: number) => void;
  setSearchQuery: (query: string) => void;
  onClick?: () => void;
  back?: boolean;
  setSearchResults?: React.Dispatch<React.SetStateAction<IMovie[]>>;
}

const Header: React.FC<HeaderProps> = ({
  loadMovies,
  setSearchQuery,
  back,
}) => {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<IMovie[]>([]);
  const navigateToMovieDetails = (movieId: any) => {};

  return (
    <header>
      <nav className="bg-white w-full border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center">
          {back ? (
            <div className="cursor-pointer" onClick={() => router.push("/")}>
              <KeyboardBackspaceIcon fontSize="large" />
            </div>
          ) : (
            <SearchComponent
              loadMovies={loadMovies}
              setSearchQuery={setSearchQuery}
              setSearchResults={setSearchResults}
            />
          )}

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
          <div className="cursor-pointer" onClick={() => router.push("/")}>
            <HomeIcon fontSize="large" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
