function Options({ currQuestion, dispatch, answer, score }) {
  const { options, correctOption } = currQuestion;
  const hasAnswer = answer !== null;

  return (
    <div className="options">
      {options.map((curr, i) => (
        <button
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
          key={curr}
          className={`btn btn-option ${
            hasAnswer && i === correctOption
              ? "correct"
              : hasAnswer && i !== correctOption
              ? "wrong"
              : ""
          }
          ${i === answer ? "answer" : ""}`}
          disabled={hasAnswer}
        >
          {curr}
        </button>
      ))}
    </div>
  );
}

export default Options;
