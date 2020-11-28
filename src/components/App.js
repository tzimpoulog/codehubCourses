import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./Landing";
import Courses from "./Courses";
import Header from "./Header";
import CourseDetails from "./CourseDetails";
import AddCourse from './AddCourse';
import Footer from "./Footer";
import EditCourse from './EditCourse';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={Landing} />
          <Switch>
            <Route path="/courses/:id" component={CourseDetails} />
            <Route path="/courses" component={Courses} />
          </Switch>
          <Route path="/add-course" component={AddCourse} />
          <Route path="/edit-course/:id" component={EditCourse} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
