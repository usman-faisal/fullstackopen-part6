import {createSlice} from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdote"

const initialState = []

const anecdote = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    updateAnecdote(state,action) {
      return state.map(item => item.id === action.payload.id ? action.payload: item);
    },
    setAnecdotes(state,action) {
      return action.payload;
    },
    appendAnecdote(state,action){
      state.push(action.payload)
    }
  }
})

export const {updateAnecdote,setAnecdotes,appendAnecdote} = anecdote.actions

export const initializeAnecdotes = () =>{
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  }
}

export const createAnecdote = (newAnecdote) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(newAnecdote);
    dispatch(appendAnecdote(anecdote));
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = {...anecdote,votes: anecdote.votes + 1};
    const newAnecdote = await anecdoteService.update(anecdote.id,updatedAnecdote);
    dispatch(updateAnecdote(newAnecdote))
  }
}

export default anecdote.reducer;