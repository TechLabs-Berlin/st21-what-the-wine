import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { fetchAllWines } from '../actions/wines';


const AllWines = () => {

const [wines, setWines] = useState([]);

useEffect(()=> {
fetchAllWines().then((wineList)=> {
console.log(wineList?.data);
setWines(wineList?.data);

})}, []);

return (
    <div>
        <h1>See all Wines</h1>
        <p>This is a page with all the wines you can get.</p>
        <ul>
        {wines.map((wine) => {
            return <Wine id={wine._id} name={wine.name} price={wine.price} description={wine.description} />
        })}
        </ul>
    </div>
)};

const Wine = ({name, price, description, id}) => {
    return (
    <>
    <Link to={`/wine/${id}`}><li>{`${name} for ${price}`}</li></Link>     
    </>
    )
}
    
    export {AllWines as default, Wine};

// This is an overview page of all the wines that exist. 