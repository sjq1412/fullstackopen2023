import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  const average = (good - bad) / (good + bad + neutral)
  const positive = (good / (good + bad +neutral)) * 100

  return (
    <div>
      <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
        <div>average {average}</div>
        <div>positive {positive}%</div>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <button onClick={handleGood}>good</button>
        <button onClick={handleNeutral}>neutral</button>
        <button onClick={handleBad}>bad</button>
      </div>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App