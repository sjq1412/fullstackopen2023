import { useState } from 'react'

const StatisticsLine = ({text, value}) => (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )

const Statistics = ({good, neutral, bad}) => {

  if (!good && !neutral && !bad) {
    return <div>No feedback given</div>
  }

  const average = (good - bad) / (good + bad + neutral)
  const positive = (good / (good + bad +neutral)) * 100

  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="positive" value={`${positive}%`} />
      </tbody>
    </table>
  )
}

const Button = ({text, handleClick}) => {
  return <button onClick={handleClick}>{text}</button>
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
        <Button handleClick={handleGood} text="good" />        
        <Button handleClick={handleNeutral} text="neutral" />
        <Button handleClick={handleBad} text="bad" />
      </div>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App