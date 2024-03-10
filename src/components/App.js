import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = {
  questions: [],
  //'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  currIndex: 0,
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
      return { ...state, currIndex: state.currIndex + 1 };
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [{ currIndex, status, questions }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;

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
          <Question currQuestion={questions.at(currIndex)} />
        )}
      </Main>
      <button onClick={() => dispatch({ type: "nextQuestion" })}>Next</button>
    </div>
  );
}

export default App;
