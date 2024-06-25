import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () =>{
    setGood(good + 1)
  }

  const handleNeutralClick = () =>{
    setNeutral(neutral + 1)
  }

  const handleBadClick = () =>{
    setBad(bad + 1)
  }

  return (
    <div>
      <Title text = "give feedback" /> 
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Title text = "statistics" /> 
      <Result text="good" result={good}></Result>
      <Result text="neutral" result={neutral}></Result>
      <Result text="bad" result={bad}></Result>


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

const Result = ({text, result}) => {

  return (
    <div>
        {text} {result}
    </div>
  )
}


export default App