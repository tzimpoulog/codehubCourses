import React, { useState, useEffect } from "react";
import { API } from "../api";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Row, Col, Container } from "reactstrap";
import { useInput } from "./hooks/useInput";

const AddCourse = () => {
  const [instructor, setInstructor] = useState([]);
  const { value: title, bind: bindTitle, reset: resetTitle } = useInput("");
  const {
    value: duration,
    bind: bindDuration,
    reset: resetDuration,
  } = useInput("");
  const {
    value: imagePath,
    bind: bindImagePath,
    reset: resetImagePath,
  } = useInput("");
  const {
    value: description,
    bind: bindDescription,
    reset: resetDescription,
  } = useInput("");
  const {
    value: priceNormal,
    bind: bindPriceNormal,
    reset: resetPriceNormal,
  } = useInput("");
  const {
    value: priceEarlyBird,
    bind: bindEarlyBird,
    reset: resetEarlyBird,
  } = useInput("");
  const {
    value: startDate,
    bind: bindStartDate,
    reset: resetStartDate,
  } = useInput("");
  const {
    value: endDate,
    bind: bindEndDate,
    reset: resetEndDate,
  } = useInput("");
  const initialCheckboxes = [instructor];
  const [checkboxItems, setCheckboxItems] = useState(initialCheckboxes);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    //alert(` ${title} ${duration} ${imagePath} ${description}`);
    resetTitle();
    resetDuration();
    resetImagePath();
    resetDescription();
    postCourse();
    resetPriceNormal();
    resetEarlyBird();
    resetStartDate();
    resetEndDate();
  };
  
 
  useEffect(() => {
    const fetchInstructors = () => {
      fetch(API + "instructors")
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Something went wrong ...");
          }
        })
        .then((data) => {
          setInstructor(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchInstructors();
  },[]);
  //fetchInstructors();

  const postCourse = () => {
    fetch(API + "courses", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        duration: duration,
        imagePath: imagePath,
        description: description,
        price: {
          normal: priceNormal,
          early_bird: priceEarlyBird,
        },
        dates: {
          start_date: startDate,
          end_date: endDate,
        },
        open: true,
        instructors:["01"]
      }),
    })
      .then((response) => response.json())
      // .then((responseJson) => {
      //   return responseJson.movies;
      // })
      .catch((error) => {
        console.error(error);
      });
  };

  

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="title">Title:</Label>
          <Input type="text" {...bindTitle} />
        </FormGroup>
        <FormGroup>
          <Label for="duration">Duration:</Label>
          <Input type="text" {...bindDuration} />
        </FormGroup>
        <FormGroup>
          <Label for="imagePath">Image Path:</Label>
          <Input type="text" {...bindImagePath} />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description:</Label>
          <Input
            type="textarea"
            name="text"
            id="description"
            {...bindDescription}
          />
          <FormGroup>
            <Label for="priceNormal">Start Date:</Label>
            <Input type="text" {...bindStartDate} />
          </FormGroup>
          <FormGroup>
            <Label for="priceNormal">End Date:</Label>
            <Input type="text" {...bindEndDate} />
          </FormGroup>
          <FormGroup>
            <Label for="priceNormal">Price Normal:</Label>
            <Input type="text" {...bindPriceNormal} />
          </FormGroup>
          <FormGroup>
            <Label for="priceEarlyBird">Price Early Bird:</Label>
            <Input type="text" {...bindEarlyBird} />
          </FormGroup>
        </FormGroup>
        {       
          checkboxItems.map((checkbox, index) => 
            <div>
              <p key={checkbox.id}>{checkbox.name?.first}</p>
              <input
                type={"checkbox"}
                onChange={e => {
                  const newCheckboxes = [...checkboxItems];
                  newCheckboxes[index].checked = e.target.checked;
                  setCheckboxItems(newCheckboxes);
                }}
                checked={checkbox.checked}
              />
            </div>
          )
        }
        <input type="submit" value="Submit" />
      </Form>
    </Container>
  );
};

export default AddCourse;
