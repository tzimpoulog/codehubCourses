import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./Landing";
import Courses from "./Courses";
import Header from "./Header";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={Landing} />
          <Route path="/courses" component={Courses} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
