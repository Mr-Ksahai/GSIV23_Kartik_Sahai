'use client'
import React, { useEffect, useState } from 'react';

import Typography from '@/components/Typography';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { IMovie } from '@/interface/movie';




const MovieDetails: React.FC = () => {
  const router = useRouter();
 const params = useParams();
 const id = params.movieId
  console.log('param', params.movieId)
  const [detail, setDetail] = useState<any>(null)
  // console.log('detatil', detail.title)

useEffect(()=> {


  axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`) //title,rating,yearofrelease,pic
  .then((res)=> {
    setDetail(res.data)
    console.log('res', res.data)
  }).catch((error)=>{
    console.log(error)
  })
},[])


  // axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`) //cast, crew
  // .then((res1)=> {
   
  // }).catch((error)=>{
  //   console.log(error)
  // })
  return (
    
    <div>
      <Typography variant="title">Movie</Typography>
          
    
 </div>
  );
};

export default MovieDetails;
