import React from "react";
import { Jumbotron } from "reactstrap";
import JumbotronContent from "./JumbotronContent";
import Stats from "./Stats";
import TableCourses from "./TableCourses";
import { Container } from "reactstrap";

const Landing = () => {
  return (
    <div>
      <Jumbotron>
        <JumbotronContent />
      </Jumbotron>
      <Container>
        <Stats />
        <TableCourses />
      </Container>
    </div>
  );
};

export default Landing;
