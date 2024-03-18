function FinishScreen({ score, maxPoints, highScore }) {
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
    </>
  );
}

export default FinishScreen;
