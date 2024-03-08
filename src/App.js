import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

const initialState = {
  questions: [],
  //'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceive":
      return { ...state, questions: action.payload, status: "ready" };
    case "error":
      return { ...state, status: "error" };
    case "reset":
      return initialState;
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

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
        <p>1/15</p>
        <p>qUESRTION?</p>
      </Main>
    </div>
  );
}

export default App;
