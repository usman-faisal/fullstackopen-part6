import React from 'react';
import {useDispatch} from "react-redux";
import {createAnecdote} from "../reducers/anecdoteReducer";
import {setNotification} from "../reducers/notificationReducer";
const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const addAnecdote = async(event) => {
        event.preventDefault()
        const {value} =event.target.anecdote;
        dispatch(createAnecdote({content: value,votes: 0}))
        dispatch(setNotification(`${value} created`))
        event.target.anecdote.value = "";
    }
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <button>create</button>
            </form>
        </>
    );
};

export default AnecdoteForm;
