function NextButton({ dispatch, numQuestions, currIndex }) {
  const isLastQuetion = numQuestions - 1 === currIndex;
  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        dispatch(isLastQuetion ? { type: "end" } : { type: "nextQuestion" })
      }
    >
      {isLastQuetion ? "Finish" : " Next"}
    </button>
  );
}

export default NextButton;
