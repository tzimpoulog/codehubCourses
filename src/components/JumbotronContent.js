import React from 'react';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';

const JumbotronContent = () => {
  return (
    <div>
      <h1 className="display-3">Welcome to codeHub</h1>
        <p className="lead">Manage everything and have fun!!</p>
        {/* <p className="lead">
          <Button color="primary">
          <Link to='/courses'>All Courses</Link>
          </Button>
        </p> */}
    </div>
  );
}

export default JumbotronContent;