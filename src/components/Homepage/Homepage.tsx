import React, { useState } from 'react'
import { Link } from "react-router-dom";
import './style.css';

function Homepage() {

    const [searchKey, setSearchKey] = useState('');

    return (
        <div className="homepage-container">
            <div className="search-container">
                <input className="search-box" type="text" value={searchKey} onChange={(e) => setSearchKey(e.target.value)} placeholder="Search for a movie, tv show, person...." autoFocus />
                <Link to={`/dashboard/${searchKey}`}>
                    <input className="search-btn" type="button" value="Search" />
                </Link>
            </div>
        </div>
    )
}

export default Homepage;