'use client'
import React, { useState } from 'react';
import { IMovie } from '@/interface/movie';
import Typography from '@/components/Typography';
import {useRouter} from 'next/navigation'


interface MovieDetailsProps {
    movie: IMovie; 
  }
  

const MovieDetails: React.FC<MovieDetailsProps> = () => {
 const router = useRouter()
   



  return (
    
    <div>
      <Typography variant="title">Movie</Typography>
    {/* //   <Typography variant="description">{movie.overview}</Typography> */}
    
 </div>
  );
};

export default MovieDetails;
