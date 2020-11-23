import React, { useState } from 'react'
import './style.css';

const Search = ({ onClick }: { onClick: Function }) => {

    const [searchText, setSearchText] = useState('');
    const [searchOption, setSearchOption] = useState('all');
    const [showOptions, setShowOptions] = useState(false);

    const onSearchTextChange = (key: string) => {
        if (key.trim().length > 4) {
            setShowOptions(true);
        } else {
            setShowOptions(false);
        }
        setSearchText(key);
    }

    return (
        <div className="header-container">
            <div className="header-search-container">
                <input className="header-search-btn" type="button" value="Search" onClick={() => onClick(searchText, searchOption)} />
                <input className="header-search-box" name="searchKey" type="text" placeholder="Search for a movie, tv show, person...." value={searchText} onChange={(e) => onSearchTextChange(e.target.value)} />
            </div>
            {showOptions &&
                <div className="header-search-option">
                    <input type="radio" value="person" name="searchType" onChange={(e) => setSearchOption(e.target.value)} /> Actors
                    <input type="radio" value="movie" name="searchType" onChange={(e) => setSearchOption(e.target.value)} /> Movies
                    <input type="radio" value="tv" name="searchType" onChange={(e) => setSearchOption(e.target.value)} /> Tv Shows
                    <input type="radio" value="all" name="searchType" onChange={(e) => setSearchOption(e.target.value)} /> All
                </div>
            }
        </div>
    )
}

export default Search;