import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useMutation, useQuery} from "react-query";
import {getAll, update} from "./request";
import {useQueryClient} from "react-query";
import { useNotificationDispatch} from "./NotificationContext";

const App = () => {
    const queryClient = useQueryClient();
    const dispatch = useNotificationDispatch();
    const voteMutation = useMutation(update,{
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData("anecdotes");
            const updatedAnecdotes = anecdotes.map(item => item.id === newAnecdote.id ? newAnecdote : item);
            queryClient.setQueryData("anecdotes",updatedAnecdotes);
            dispatch({type: "SHOW",payload: `anecdote ${newAnecdote.content} voted`})
        }
    });
  const handleVote = (anecdote) => {
    const newAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1,
    }
    voteMutation.mutate(newAnecdote)
  }
  const result = useQuery("anecdotes", getAll,
  {
          retry: false,
          refetchOnWindowFocus: false
  });
  if(result.error){
      return <p>Not available due to server problems</p>
  }
  if(result.isLoading){
      return <p>Loading...</p>
  }
  const anecdotes = result.data;
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
