import React from "react";
import { Link } from "react-router-dom";
import apiConfig from "../../API/configApi";
import Loading from "../Loading";
import "./BannerItem.css";

const BannerItem = ({ item, category}) => {
  return (
    <>
    {item ? <div
      className="banner__container"
      style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})` }}
    >
      <div className="banner__content">
        <h2 className="banner__heading">{item.title || item.name} </h2>
        <p className="banner__desc">
           {item.vote_average}/10<span className="banner__date">{item.release_date}</span>
        </p>
        <p className="banner__desc">
          {item.overview}
        </p>
        <br />
        <div className="banner__button">
          <span className="button red">
            <i className="fas fa-play-circle"></i>Play Now
          </span>
          <Link to={`/${category}/${item.id}`} className="content-item__link">
            <span className="button blue">
              <i className="fas fa-info-circle"></i>More Info
            </span>
          </Link>
        </div>
      </div>
    </div>: <div className='loading'><Loading /></div>}
    </>
  );
};

export default BannerItem;
