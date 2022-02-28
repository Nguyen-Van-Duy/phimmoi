import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import NextArrow from "../Banner/NextArrow";
import PrevArrow from "../Banner/PrevArrow";
import MovieItem from "./MovieItem";

const MovieList = ({dataFilm, titleFilm, category, type}) => {
  
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    // centerMode: true,
    speed: 700,
    slidesToShow: 6,
    slidesToScroll: 5,
    initialSlide: 0,
    // centerPadding: '20px',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      //   {
      //     breakpoint: 480,
      //     settings: {
      //       slidesToShow: 1,
      //       slidesToScroll: 1
      //     }
      //   }
    ],
  };

  return (
    <div className="movie-list">
      <div className="movie-list__header">
        <span className="movie-list__title">{titleFilm}</span>
        {type !== 'similar' && <Link to={`/${category}/${type}/view`} className="movie-list__link">
          <span className="movie-list__more">View More</span>
        </Link>}
      </div>
      <Slider {...settings}>
        {dataFilm.map((item, index) => (
          <MovieItem key={index} item={item} category={category} />
        ))}
      </Slider>
    </div>
  );
};

export default MovieList;
