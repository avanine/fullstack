import React, { useState } from "react";

function Button(props) {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  );
}

function StatisticLine(props) {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
}

function Statistics(props) {

  if (props.all === 0) {
    return (
      <p>No feedback given</p>
    );
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.all} />
        <StatisticLine text="average" value={(props.good - props.bad) / props.all} />
        <StatisticLine text="positive" value={(props.good / props.all) * 100 + " %"} />
      </tbody>
    </table>
  );
}

function App() {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClick={() => setBad(bad + 1)} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={good + neutral + bad} />
    </div>
  );
}

export default App;
