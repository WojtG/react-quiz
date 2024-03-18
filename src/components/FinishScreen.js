function FinishScreen({ score, maxPoints }) {
  const pointsPercentage = (score / maxPoints) * 100;

  return (
    <p className="result">
      You scored <strong>{score}</strong> out of the {maxPoints} (
      {Math.ceil(pointsPercentage)}%)
    </p>
  );
}

export default FinishScreen;
