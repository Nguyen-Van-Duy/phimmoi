import React from "react";
import Slider from "react-slick";
import NextArrow from "../Banner/NextArrow";
import PrevArrow from "../Banner/PrevArrow";
import ContentItem from "./ContentItem";
import "./MovieContent.css";

const MovieContent = ({dataFilm, titleFilm, category}) => {

    const settings = {
        dots: false,
        infinite: true,
        // autoplay: true,
        // centerMode: true,
        speed: 700,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        // centerPadding: '20px',
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 910,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 400,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1,
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
    }

    return (
        <div className="movie-list">
      <div className="content-list__header">
        <span className="content-list__title">{titleFilm}</span>
      </div>
      <Slider {...settings}>
        {dataFilm.map((item, index) => (
          <ContentItem key={index} item={item} category={category} />
        ))}
      </Slider>
    </div>
    );
};

export default MovieContent;