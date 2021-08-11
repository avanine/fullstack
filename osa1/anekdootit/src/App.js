import React, { useState } from 'react'

function Title(props) {
  return <h1>{props.text}</h1>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0])

  function updateVotes() {
    const updatedArray = [...points];
    updatedArray[selected] += 1;
    return (
      updatedArray
    );
  }

  return (
    <div>
      <Title text="Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <button onClick={() => setPoints(updateVotes)}>vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * 7 + 1))}>next anecdote</button>
      <Title text="Anecdote with most votes" />
      <p>{anecdotes[points.indexOf(Math.max(...points))]}</p>
    </div>
  )
}

export default App