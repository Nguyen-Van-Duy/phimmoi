import React from 'react';
import { useSelector } from 'react-redux';
import './Search.css'

const SearchData = () => {

    const dataSearch = useSelector(state => state.datafilm.keyword)
    
    return (
        <div className="search__container">
            {dataSearch && dataSearch.map((item, id) => <span key={id}>{item.title || item.name}</span>)}
        </div>
    );
};

export default SearchData;