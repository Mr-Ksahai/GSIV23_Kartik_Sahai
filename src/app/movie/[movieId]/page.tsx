"use client";
import React, { useEffect, useState } from "react";

import Typography from "@/components/Typography";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import axios from "axios";
import { CastMember, CrewMember, IMovie } from "@/interface/movie";
import MovieDetail from "@/components/movieDetail";
import Header from "@/components/Header";

const MovieDetails: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.movieId;
  const [back, setBack] = useState(true)
  const [detail, setDetail] = useState<any>("");
  const [castName, setCastName] = useState<CastMember[]>([]);
  const [director, setDirector] = useState<CrewMember | null>(null);
  console.log("detatil", detail);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      ) //title,rating,yearofrelease,pic
      .then((res) => {
        const MovieDetails = res.data;
        setDetail(MovieDetails);
      });

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      ) //cast, crew
      .then((res) => {
        const castMembers = res.data.cast.map((member: any) => member.name);
        setCastName(castMembers.join(", "));
        const directorData = res.data.crew.find(
          (role: any) => role.job === "Director"
        );
        if (directorData) {
          setDirector(directorData.name);
        }
      });
  }, []);
  return (
    <div>
      <Header back={back} loadMovies={(page: number) => {}}
        />
      
      <MovieDetail
        title={detail.title}
        vote_average={parseFloat(detail.vote_average).toFixed(1)}
        overview={detail.overview}
        poster_path={`https://image.tmdb.org/t/p/w500/${detail.poster_path}`}
        cast={castName}
        director={director}
        runtime={detail.runtime}
        release_date={
          detail.release_date ? detail.release_date.split("-")[0] : ""
        }
        id={0}
      />
 
    </div>
  );
};

export default MovieDetails;
