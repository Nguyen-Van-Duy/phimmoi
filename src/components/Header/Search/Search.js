import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { dataSearch } from "../../../API/MoviesApi";
import { dataFilmAction } from "../../../store/dataFilmSlice";
import "./Search.css";

const Search = ({search, onSearch}) => {
  const valueRef = useRef(null);
  // const valueInputRef = useRef();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const handleValueInput = e => {

    // const fetchDataSearch = async (value) => {
    //   if(value.length > 2) {
    //     const result = await dataSearch(value);
    //     dispatch(dataFilmAction.handleSearch(result))
    //   } else {
    //     dispatch(dataFilmAction.handleSearch([]))
    //   }
    // } 
    // if (valueInputRef.current) {
    //   clearTimeout(valueInputRef.current)
    // }

    // valueInputRef.current = setTimeout(() => {
    //   fetchDataSearch(e.target.value)
    // }, 500)
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = valueRef.current.value;
    if (searchValue.length > 1) {
      dispatch(dataFilmAction.handleKeyword(searchValue))
      navigate(`/results/${searchValue}`)
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
          placeholder="Enter movie name..."
        />
      </form>
    </div>
  );
};

export default Search;
