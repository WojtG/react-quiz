function FinishScreen({ score, maxPoints, highScore, dispatch }) {
  const pointsPercentage = (score / maxPoints) * 100;

  return (
    <>
      <p className="result">
        You scored <strong>{score}</strong> out of the {maxPoints} (
        {Math.ceil(pointsPercentage)}%)
      </p>
      <p className="highscore">
        Highscore: <strong>{highScore}</strong>
      </p>
      <button
        onClick={() => dispatch({ type: "reset" })}
        className="btn btn-ui"
      >
        Restart quiz
      </button>
    </>
  );
}

export default FinishScreen;
