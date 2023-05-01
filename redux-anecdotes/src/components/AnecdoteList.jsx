import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addVote} from "../reducers/anecdoteReducer";


const AnecdoteList = () => {
    const anecdotes = useSelector(state => [...state.anecdotes].sort((a,b) => {
        return b?.votes - a?.votes
    }).filter(item => {
        console.log(item);
        return item.content.includes(state.filter)
    }));
    const dispatch = useDispatch();
    const vote = (anecdote) => {
        dispatch(addVote(anecdote))
    }
    return (
        <>
        {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AnecdoteList;
