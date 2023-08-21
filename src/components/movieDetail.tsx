import React from "react";
import Image from "next/image";
import Typography from "./Typography";
import { IMovie } from "@/interface/movie";

const MovieDetail: React.FC<IMovie> = ({
  title,
  vote_average,
  overview,
  poster_path,
  cast,
  director,
  runtime,
  release_date,
}) => {
  return (
    <div className="relative border-2 border-gray-300 p-4 w-full cursor-pointer flex flex-col sm:flex-row item-center">
      <Image
        src={poster_path}
        alt={title}
        priority={true}
        width={400}
        height={100}
      />
      <div
        className="sm: mt-2 md: ml-4"
        style={{
          width: "-webkit-fill-available",
        }}
      >
        <div className="flex">
          <Typography variant="title">{title}</Typography>
          <div style={{ marginLeft: "10px" }}>
            <Typography variant="description" color="yellow">
              {vote_average}
            </Typography>
          </div>
        </div>
        <div className="flex mt-4">
          <Typography className="border-r border-gray-300 pr-4"  variant="description">{release_date}</Typography>
          <Typography className="ml-4 border-r border-gray-300 pr-4" variant="description">{runtime}</Typography>
          <Typography className="ml-4" variant="description">{director}</Typography>
        </div>
        <div className="flex mt-4">
          <Typography variant="description">Cast:</Typography>
          <Typography className="ml-2 line-clamp-1"  variant="description">{cast}</Typography>
        </div>
        <div className="flex mt-4">
          <Typography variant="description">Description:</Typography>
          <Typography className="ml-2" variant="description" >{overview}</Typography>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
