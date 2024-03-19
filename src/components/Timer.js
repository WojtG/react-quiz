import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const minutes = `${Math.floor(secondsRemaining / 60)}`.padStart(2, 0);
  const seconds = `${secondsRemaining % 60}`.padStart(2, 0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  return (
    <div className="timer">
      {minutes}:{seconds}
    </div>
  );
}

export default Timer;
