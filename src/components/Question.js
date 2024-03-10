import Options from "./Options";

function Question({ currQuestion }) {
  return (
    <div>
      <h4>{currQuestion.question}</h4>
      <Options options={currQuestion.options} />
    </div>
  );
}

export default Question;
