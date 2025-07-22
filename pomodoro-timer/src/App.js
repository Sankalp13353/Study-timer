import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const WORK_DURATION = 10;
  const BREAK_DURATION = 5;

  const [time, setTime] = useState(WORK_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [mode, setMode] = useState("Work");

  useEffect(() => {
    let timer;

    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }

    if (isRunning && time === 0) {

      if (mode === "Work") {
        alert("Time for a break!");
        setMode("Break");
        setTime(BREAK_DURATION);
        setSessionCount((prev) => prev + 1);
      } else {
        alert("Back to work!");
        setMode("Work");
        setTime(WORK_DURATION);
      }
      setIsRunning(false)

    }

    return () => clearInterval(timer);
  }, [isRunning, time, mode]);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const minStr = minutes < 10 ? "0" + minutes : minutes;
    const secStr = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
    return minStr + ":" + secStr;
  }

  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>
      <h2>{formatTime(time)}</h2>
      <h3>Mode: {mode}</h3>
  
      <button onClick={() => setIsRunning((prev) => !prev)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
  
      <button onClick={() => {
        setIsRunning(false);
        setTime(mode === "Work" ? WORK_DURATION : BREAK_DURATION);
      }}>
        Reset
      </button>
  
      <h3>Sessions Completed: {sessionCount}</h3>
    </div>
  );
  
}

export default App;
