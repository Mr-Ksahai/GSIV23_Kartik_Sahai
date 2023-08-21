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
          <Typography className="ml-2" lineClamp={1} variant="description">act1, act2, act3, act4</Typography>
        </div>
        <div className="flex mt-4">
          <Typography variant="description">Description:</Typography>
          <Typography className="ml-2 " variant="description" >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, modi minima voluptatum maxime error repellendus quos quidem odio labore aperiam, possimus numquam deserunt obcaecati vel vitae corrupti facilis harum nobis.</Typography>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
