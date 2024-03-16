import Options from "./Options";

function Question({ currQuestion, dispatch, answer, score }) {
  return (
    <div>
      <h4>{currQuestion.question}</h4>
      <Options
        answer={answer}
        score={score}
        dispatch={dispatch}
        currQuestion={currQuestion}
      />
    </div>
  );
}

export default Question;
