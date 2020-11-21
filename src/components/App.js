import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import { BreadcrumbItem } from 'reactstrap';
import  Landing  from './Landing';
import  Courses  from './Courses';

function App() {
  return (
    <div>
     <BrowserRouter>
       <div>
         <Route path="/" exact component={Landing} />
         <Route path="/courses" component={Courses} />
       </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
