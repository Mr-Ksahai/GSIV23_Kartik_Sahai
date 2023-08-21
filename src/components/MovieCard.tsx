import React from "react";
import Image from "next/image";
import Typography from "./Typography";

interface MovieCardProps {
  title: string;
  rating: string;
  description: string;
  image: string;
  onClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  rating,
  description,
  image,
  onClick,
}) => {
  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        padding: "16px",
        width: "300px",
        borderRadius: "8px",
        transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s",
        cursor: "pointer",
      }}
      className="hover:scale-105 hover:shadow-lg hover:border-yellow-400 hover:border"
      onClick={onClick}
    >
      <Image src={image} alt={title} priority={true} width={500} height={500} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "8px",
          transition: "color 0.3s",
        }}
      >
        <Typography variant="title">{title}</Typography>
        <Typography variant="description" color="yellow">
          {rating}
        </Typography>
      </div>
      <div style={{ marginTop: "4%", transition: "max-height 0.3s" }}>
        <Typography lineClamp={2} variant="description">
          {description}
        </Typography>
      </div>
    </div>
  );
};

export default MovieCard;
