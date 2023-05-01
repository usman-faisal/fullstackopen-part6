import axios from "axios";

const BASE_URL = "http://localhost:3001/anecdotes";

const getAll = async() => {
    const response = await axios.get(BASE_URL)
    return response.data;
}

const update = async(id,newAnecdote) => {
    const response = await axios.put(`${BASE_URL}/${id}`,newAnecdote)
    return response.data;
}

const createNew = async(anecdote) => {
    const response = await axios.post(BASE_URL,anecdote);
    return response.data;
}

export default {createNew,getAll,update};