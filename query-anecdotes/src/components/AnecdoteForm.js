import {useMutation} from "react-query";
import {createNew} from "../request";
import {useQueryClient} from "react-query";
import { useNotificationDispatch} from "../NotificationContext";

const AnecdoteForm = () => {
    const queryClient = useQueryClient();
    const dispatch = useNotificationDispatch();
  const newAnecdoteMutation  = useMutation(createNew,{
      onSuccess: (newAnecdote) => {
          const anecdotes = queryClient.getQueryData("anecdotes");
          queryClient.setQueryData("anecdotes",anecdotes.concat(newAnecdote))
          dispatch({type: "SHOW",payload:`anecdote ${newAnecdote.content} added` })
      },
      onError: (response) => {
          dispatch({type: "SHOW",payload: response.response.data.error})
      }
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({
          content,
          votes: 0
    })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
