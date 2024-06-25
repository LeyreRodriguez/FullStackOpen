import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const [points, setPoints] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0
  });

  const handleAnecdote = () => {
    
    setSelected(getRandomNumber())
    console.log(selected)
  }

  const handleVote = () => {
    const copy = { ...points };
    copy[selected] += 1;
    setPoints(copy);
  }

  const getRandomNumber = () => Math.floor(Math.random() * 7) + 1
  
  let mostVotedIndex = 0;
  for (let i = 1; i < anecdotes.length; i++) {
    if (points[i] > points[mostVotedIndex]) {
      mostVotedIndex = i;
    }
  }

  return (
    <div>
      <Title text = "Anecdote of the day" /> 
      <Anecdote text={anecdotes[selected]} />
      <Votes value = {points[selected]} />
      <Button handleClick={handleVote} text = "Vote" />
      <Button handleClick={handleAnecdote} text = "Next Anecdote" />
      <Title text = "Anecdote with most votes" /> 
      <Anecdote text={anecdotes[mostVotedIndex]} />
      <Votes value = {points[mostVotedIndex]} />

    </div>
  )
}

const Anecdote = ({text}) => {
  return (
    <div>
        {text}
    </div>
  )
}

const Votes = ({value}) => {
  return (
    <div>
      Has {value} votes.
    </div>
  )
}
const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>  
)


const Title = ({text}) => {
  return (
    <div>
      <h1>
        {text}
      </h1>
    </div>
  )
}


export default App