import React from 'react';

const Search = () => {
    return (
        <div>
        <form>
        <fieldset>
        <legend>Search for the right wine</legend>
            <p>
            <label for="keyfeature1">Key Feature 1</label>
            <input type="search" id="keyfeature1"></input>
            </p>
            <p>
            <label for="keyfeature2">Key Feature 2</label>
            <input type="checkbox" id="keyfeature2"></input>
            </p>
            <p>
            <label for="keyfeature3">Key Feature 3</label>
            <input type="range" id="keyfeature3"></input>
            </p>
            <p>
            <label for="keyfeature4">Key Feature 4</label>
            <input type="search" id="keyfeature4"></input>
            </p>
            <p>
            <button type="submit">What is my wine</button>
            <input type="reset" value="Reset the filter"></input>
            </p>
            
        </fieldset>
        </form>
        </div>
    )  
    };
    
    export {Search as default };

    // This component includes the filters and form to submit and to perform a search