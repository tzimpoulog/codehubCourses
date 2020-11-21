import React from "react";
import { Jumbotron } from "reactstrap";
import JumbotronContent from "./JumbotronContent";
import Stats from './Stats';


const Landing = () => {

  return (
    <div>
      <Jumbotron>
        <JumbotronContent />
      </Jumbotron>
      <Stats />
    </div>
  );
};

export default Landing;
