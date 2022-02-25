import React from "react";
import { Link } from "react-router-dom";
import apiConfig from "../../API/configApi";
import "./ContentItem.css";

const ContentItem = ({ item, category }) => {
  return (
    <>
    <div className="content-item">
      <Link to={`/${category}/${item.id}`} className="content-item__link">
        <div
          className="content-item__content"
          style={{
            backgroundImage: `url(${apiConfig.w500Image(
              item.backdrop_path || item.poster_path
            )})`,
          }}
        >
          <div className="content-item__desc">
            <span className="content-item__name">
              {item.title || item.name}
            </span>
            <p className="content-item__date">
              {item.vote_average}/10{" "}
              <span className="content-item__point">{item.first_air_date}</span>
            </p>
          </div>
          <div className="content-item__quanlity">HD</div>
        </div>
      </Link>
      <span className="button red content-button">
        <i className="fas fa-play-circle"></i>Play Now
      </span>
    </div>
    </>
  );
};

export default ContentItem;
