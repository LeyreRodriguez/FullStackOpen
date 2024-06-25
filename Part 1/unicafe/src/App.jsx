import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  // const [all, setAll] = useState(0)


  const handleGoodClick = () =>{
    setGood(good + 1)
  }

  const handleNeutralClick = () =>{
    setNeutral(neutral + 1)
  }

  const handleBadClick = () =>{
    setBad(bad + 1)
  }

  
  const all = () => good + neutral + bad
  

  const average = () => {
    return (good - bad) / all() 
  }

  const positive = () => {
    return (good / all()) * 100
  }

  return (
    <div>
      <Title text = "give feedback" /> 
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Title text = "statistics" /> 
      <Statistics good={good} neutral={neutral} bad={bad} all={all()} average={average()} positive={positive()} />


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



const Statistics = ({good, neutral, bad, all, average, positive}) => {

  if(all === 0) {
    return <div>No feedback given</div>
  }

  return(
    <div>
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
        <div>all {all}</div>
        <div>average {average}</div>
        <div>positive {positive} %</div>

    </div>
  )
}

export default App