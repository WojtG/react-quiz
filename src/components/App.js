import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";

const initialState = {
  questions: [],
  //'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  currIndex: 0,
  answer: null,
  score: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceive":
      return { ...state, questions: action.payload, status: "ready" };
    case "error":
      return { ...state, status: "error" };
    case "reset":
      return initialState;
    case "start":
      return { ...state, status: "active" };
    case "nextQuestion":
      return { ...state, currIndex: state.currIndex + 1, answer: null };
    case "newAnswer":
      const question = state.questions.at(state.currIndex);
      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === question.correctOption
            ? state.score + question.points
            : state.score,
      };
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [{ currIndex, status, questions, answer, score }, dispatch] =
    useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        dispatch({ type: "reset" });
        const response = await fetch("http://localhost:9000/questions");

        if (!response.ok) throw new Error("Whoops something went wrong");

        const data = await response.json();

        dispatch({ type: "dataReceive", payload: data });
      } catch (err) {
        dispatch({ type: "error" });
      }
    }

    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              currIndex={currIndex}
              numQuestions={numQuestions}
              score={score}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              dispatch={dispatch}
              answer={answer}
              score={score}
              currQuestion={questions.at(currIndex)}
            />
            {answer !== null && <NextButton dispatch={dispatch} />}
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
