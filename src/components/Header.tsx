import React, { useEffect, useState } from "react";
import SearchComponent from "./SearchComponent";
import MovieCard from "./MovieCard";
import { IMovie } from "@/interface/movie";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/navigation";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

interface HeaderProps {
  loadMovies: (page: number) => void;
  onClick?: () => void;
  back?: boolean;
  onSearch?: (searchResults: IMovie[]) => void;
}

const Header: React.FC<HeaderProps> = ({ loadMovies, onSearch, back }) => {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<IMovie[]>([]);
  const navigateToMovieDetails = (movieId: any) => {
    router.push(`/movie/${movieId}`);
  };

  useEffect(() => {
    if (onSearch) {
      if (searchResults.length > 0) {
        onSearch(searchResults);
      } 
      else {
        onSearch([]);
      }
    }
  }, [searchResults]); 

  return (
    <>
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
                setSearchResults={setSearchResults}
              />
            )}

            <div className="cursor-pointer" onClick={() => router.push("/")}>
              <HomeIcon fontSize="large" />
            </div>
          </div>
        </nav>
      </header>

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
    </>
  );
};

export default Header;
