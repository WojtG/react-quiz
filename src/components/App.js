import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  //'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  currIndex: 0,
  answer: null,
  score: 0,
  highScore: getLocalStorageHighScore(),
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceive":
      return { ...state, questions: action.payload, status: "ready" };
    case "error":
      return { ...state, status: "error" };
    case "reset":
      return { ...initialState, status: "ready", questions: state.questions };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
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
    case "end":
      return {
        ...state,
        status: "finished",
        highScore:
          state.score > state.highScore ? state.score : state.highScore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
        highScore:
          state.secondsRemaining === 0
            ? Math.max(state.highScore, state.score)
            : state.highScore,
      };

    default:
      throw new Error("Action unknown");
  }
}

function setLocalStorageHigscore(highScore) {
  localStorage.setItem("hScore", JSON.stringify(highScore));
}

function getLocalStorageHighScore() {
  const response = JSON.parse(localStorage.getItem("hScore"));
  const data = response ? response : 0;
  return data;
}

function App() {
  const [
    {
      currIndex,
      status,
      questions,
      answer,
      score,
      highScore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

  useEffect(() => {
    async function fetchQuestions() {
      try {
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

  useEffect(() => setLocalStorageHigscore(highScore), [highScore]);

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
            <Footer>
              {answer !== null && (
                <NextButton
                  currIndex={currIndex}
                  numQuestions={numQuestions}
                  dispatch={dispatch}
                  setLocalStorageHigscore={setLocalStorageHigscore}
                />
              )}
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            dispatch={dispatch}
            highScore={highScore}
            score={score}
            maxPoints={maxPoints}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
