import React, { useState, useEffect } from "react";
import "./App.css"; // Make sure this path is correct based on your project structure
import workouts from "./workouts.json"; // Make sure the path is correct

function App() {
  const [currentDay, setCurrentDay] = useState("Day 1");
  const [completedWorkouts, setCompletedWorkouts] = useState({});
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  const toggleWorkout = (day, workout) => {
    const dayCompleted = completedWorkouts[day] || [];
    if (dayCompleted.includes(workout)) {
      setCompletedWorkouts({
        ...completedWorkouts,
        [day]: dayCompleted.filter((w) => w !== workout),
      });
    } else {
      setCompletedWorkouts({
        ...completedWorkouts,
        [day]: [...dayCompleted, workout],
      });
    }
  };

  const nextDay = () => {
    const dayNumbers = Object.keys(workouts).map((day) =>
      parseInt(day.slice(3))
    );
    const currentDayNumber = parseInt(currentDay.slice(3));
    const nextDayIndex =
      (dayNumbers.indexOf(currentDayNumber) + 1) % dayNumbers.length;
    const nextDayNumber = dayNumbers[nextDayIndex];
    setCurrentDay(`Day ${nextDayNumber}`);
  };

  return (
    <div className="app-container">
      <h1 className="routine-day">{`Workout Plan - ${currentDay}`}</h1>

      <ul className="workout-list">
        {workouts[currentDay].map((workout) => (
          <li key={workout.name} className="workout-item">
            <label className="workout-label">
              <input
                type="checkbox"
                className="workout-checkbox"
                checked={completedWorkouts[currentDay]?.includes(workout.name)}
                onChange={() => toggleWorkout(currentDay, workout.name)}
              />
              <div className="workout-details">
                <div className="workout-name">{workout.name}</div>
                <div className="workout-sets">{workout.sets}</div>
              </div>
            </label>
          </li>
        ))}
      </ul>

      <button onClick={nextDay} className="navigation-button">
        Next Day
      </button>

      <div className="stopwatch">
        <div className="stopwatch-timer">
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
        </div>
        <button onClick={() => setTimerOn(true)} className="stopwatch-button">
          Start
        </button>
        <button onClick={() => setTimerOn(false)} className="stopwatch-button">
          Stop
        </button>
        <button onClick={() => setTime(0)} className="stopwatch-button">
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
