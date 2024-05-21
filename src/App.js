import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timerType, setTimerType] = useState('Session');
  const [timer, setTimer] = useState(sessionLength * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 0) {
            // Switch between Session and Break
            if (timerType === 'Session') {
              setTimerType('Break');
              setTimer(breakLength * 60);
            } else {
              setTimerType('Session');
              setTimer(sessionLength * 60);
            }
            return prevTimer;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isActive, breakLength, sessionLength, timerType]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimerType('Session');
    setSessionLength(25);
    setBreakLength(5);
    setTimer(25 * 60);
  };

  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <div className="timer">
        <div className="session">
          <h2>Session Length</h2>
          <div className="session-buttons">
            <button onClick={() => setSessionLength(sessionLength - 1)} disabled={isActive || sessionLength === 1}>-</button>
            <div className="session-length">{sessionLength}</div>
            <button onClick={() => setSessionLength(sessionLength + 1)} disabled={isActive || sessionLength === 60}>+</button>
          </div>
        </div>
        <div className="break">
          <h2>Break Length</h2>
          <div className="break-buttons">
            <button onClick={() => setBreakLength(breakLength - 1)} disabled={isActive || breakLength === 1}>-</button>
            <div className="break-length">{breakLength}</div>
            <button onClick={() => setBreakLength(breakLength + 1)} disabled={isActive || breakLength === 60}>+</button>
          </div>
        </div>
      </div>
      <div className="timer-display">
        <h2>{timerType}</h2>
        <div className="time">{formatTime(timer)}</div>
        <div className="controls">
          <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
          <button onClick={resetTimer}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
