import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router';
import {fetchSingleUser} from '../actions/users';

const UserProfile = () => {
    const {id} = useParams();

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(()=> {
        fetchSingleUser(id).then((user) => {
            console.log(user.data);
            setEmail(user.data.email);
            setFirstName(user.data.firstName);
            setLastName(user.data.lastName);
        })
    }, []);


return (
<div>
<h1>`Your Profile: ${firstName} ${lastName}`</h1>
<p>{email}</p>
<p>Enter your choice here and get a recommendation!</p>
</div>
)  
};

export {UserProfile as default };

// The Profile Page of the User