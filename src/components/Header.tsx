import React, { useState } from 'react';
import SearchComponent from './SearchComponent';


interface HeaderProps {
  loadMovies: (page: number) => void;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ loadMovies, setSearchQuery }) => {
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center ">
          <SearchComponent loadMovies={loadMovies} setSearchQuery={setSearchQuery} />
          <div className="flex items-center lg:order-2">
          
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
