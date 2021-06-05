import axios from 'axios'
const backendURL = process.env.REACT_APP_BACKENDURL;

const fetchAllUsers = async () => {

try {

const response = await axios.get(`${backendURL}/api/users`);
return response;

} catch (error) {
return error;
}
}

const fetchSingleUser = async (id) => {

    try {
    
    const response = await axios.get(`${backendURL}/api/users/${id}`);
    return response;
    
    } catch (error) {
    return error;
    }
    }

export {fetchAllUsers, fetchSingleUser};