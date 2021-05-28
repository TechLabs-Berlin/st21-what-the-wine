import React from 'react';

const Search = () => {
    return (
        <div>
        <form method="post" action="/st21-what-the-wine/public/index.html">
        <fieldset>
        <legend>Search for the right wine</legend>
            <p>
            <label name="foodpairing">What Food do you want to eat with the wine?</label>
            <input type="text" name="foodpairing" value="Name the Food."></input>
            <input type="checkbox" name="foodpairing"></input>
            <label name="foodpairing">I don't want to eat any food with the wine.</label>
            </p>
            <p>
            <input type="checkbox" name="vegan"></input>
            <label name="vegan">The wine should be vegan.</label>
            </p>
            <p>
            <label name="price">What price should the wine have?</label>
            <select name="price">
            <option>Not selected</option>
            <option> Below 2€</option>
            <option>2€ - 4€</option>
            <option>Above 4€</option>
            <option>No preference</option>
            </select>
            </p>
            <p>
            <label name="winetype">What type of wine do you prefer?</label>
            <input type="radio" name="winetype" value="red"></input>
            <label name="winetype">Red</label>
            <input type="radio" name="winetype" value="white"></input>
            <label name="winetype">White</label>
            <input type="radio" name="winetype" value="rosé"></input>
            <label name="winetype">Rosé</label>
            <input type="radio" name="winetype" value="no preference"></input>
            <label name="winetype">No preference</label>
            </p>
            <p>
            <label name="sweetness">What sweetness of the wine do you prefer?</label>
            <input type="range" name="sweetness" value="Wine Sweetness"></input>
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