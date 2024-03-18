function Progress({ currIndex, numQuestions, score, maxPoints, answer }) {
  return (
    <header className="progress">
      <progress
        value={currIndex + Number(answer !== null)}
        max={numQuestions}
      />
      <p>
        Question <strong>{currIndex + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{score}</strong>/ {maxPoints} points
      </p>
    </header>
  );
}

export default Progress;
