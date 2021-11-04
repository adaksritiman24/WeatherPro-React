import React from 'react'
import "./App.css";

export default function Search(props) {

    function searchHandler(){
        const city = document.querySelector('#city').value;
        
        props.getSearchDetails(city);
    }
    return (
        <div className = "searchdiv">
            <input type = "text" placeholder="Enter city name" id="city"></input>
            <button onClick={searchHandler}>Search</button>
        </div>
    )
}
