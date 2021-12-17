import React, { useRef } from "react";
import "./Search.css";

const Search = ({search, onSearch}) => {
  const valueRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = valueRef.current.value;
    if (searchValue.length > 2) {
      alert("Search");
    }
  };

  return (
    <div className="search-box">
      <button className="search-mobile" onClick={() => onSearch()}>
        <i className="fas fa-search"></i>
      </button>
      <form className={`form-search ${search ? "show-search" : ""}`} onSubmit={handleSubmit}>
        <button type="submit" className="btn-search">
          Search
        </button>
        <input
          ref={valueRef}
          type="text"
          className="input-search"
          placeholder="Nhập tên phim..."
        />
      </form>
    </div>
  );
};

export default Search;
