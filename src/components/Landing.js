import React from "react";
import { Jumbotron } from "reactstrap";
import JumbotronContent from "./JumbotronContent";
import Stats from "./Stats";
import TableCourses from "./TableCourses";
import { Container } from "reactstrap";

const Landing = () => {
  return (
    <div>
    <Container>
      <Jumbotron style={{ background:'#F15B41', color: '#fff', marginTop:'30px'}}>
        <JumbotronContent />
      </Jumbotron>
        <Stats />
        <TableCourses />
      </Container>
    </div>
  );
};

export default Landing;
