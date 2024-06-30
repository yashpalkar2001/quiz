import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InitialPage from "./Components/InitialPage";
import Quiz from "./Components/Quiz";
// import GeneralKnowledge from "./Components/GeneralKnowledge";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InitialPage />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
