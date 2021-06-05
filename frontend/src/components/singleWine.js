import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router'
import { fetchSingleWines } from '../actions/wines';

const SingleWine = () => {
    const {id} = useParams();

    const [description, setDescription] = useState("");
    const [price, setPrice] = useState();
    const [name, setName] = useState();

    useEffect(() => {

    fetchSingleWines(id).then((wine) => {
        console.log(wine.data);
        setDescription(wine.data.description);
        setPrice(wine.data.price);
        setName(wine.data.name);
        })
    }, []);



    return (
        <div>
        <h1>`This is wine ${name}`</h1>
        <p>This is a description about wine XYZ.</p>
        <p>This is a description of the flavor profile.</p>
        <p>{price}</p>
        <p>Type of Wine</p>
        <p>Best Foodpairings</p>
        <p>Community Rating</p>
        <p>{description}</p>
        </div>
    )
}

export {SingleWine as default };

// This component is to show a page for a single wine to get more details on it.