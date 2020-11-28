import React, { useState, useEffect } from "react";
import { API } from "../api";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Row, Col, Container } from "reactstrap";
import { useInput } from "./hooks/useInput";
import { useHistory } from 'react-router-dom';

const AddCourse = () => {
  let history = useHistory();
  const { value: title, bind: bindTitle, reset: resetTitle } = useInput("");
  const { value: duration, bind: bindDuration, reset: resetDuration } = useInput("");
  const { value: imagePath, bind: bindImagePath, reset: resetImagePath } = useInput("");
  const { value: description, bind: bindDescription, reset: resetDescription } = useInput("");
  const { value: priceNormal, bind: bindPriceNormal, reset: resetPriceNormal } = useInput("");
  const { value: priceEarlyBird, bind: bindEarlyBird, reset: resetEarlyBird } = useInput("");
  const { value: startDate, bind: bindStartDate, reset: resetStartDate } = useInput("");
  const { value: endDate, bind: bindEndDate, reset: resetEndDate } = useInput("");
  const [checkBookable, setBookable] = useState({open: false});
  const [options, setOptions] = useState([]);
  const [instructors, setInstructors] = useState([]);


  const handleToggle = ({ target }) =>
    setBookable((s) => ({ ...s, [target.name]: !s[target.name] }));


  const handleSubmit = (e) => {
    e.preventDefault();
    resetAllInputs();   
  };

  const resetAllInputs = () =>{
    resetTitle();
    resetDuration();
    resetImagePath();
    resetDescription();
    postCourse();
    resetPriceNormal();
    resetEarlyBird();
    resetStartDate();
    resetEndDate();
  }

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
          setOptions(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchInstructors();
  }, []);
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
        open: checkBookable,
        instructors: instructors,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        history.push('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onCheckedChanged = e => {
    const value = e.target.value;
    if (instructors.includes(value)) {
      setInstructors(instructors.filter(instructors => instructors !== value));
    } else {
      setInstructors([...instructors, value]);
    }

    console.log(instructors);
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
        {Object.keys(checkBookable).map((key) => (
          <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              onChange={handleToggle}
              key={key}
              name={key}
              checked={checkBookable[key]}
            />
            Bookable
          </Label>
          </FormGroup>
        ))}
        <h4>Instructors</h4>
        {options.map(i => (
            <label style={{marginRight: '5px'}}>
            <input
                type='checkbox'
                name={i.id}
                value={i.id}
                checked={instructors.includes(i.id)}
                onChange={onCheckedChanged}
              />{' '}
              {i.name.first + ' ' + i.name.last}
            </label>
          
        ))}
        <input type="submit" value="Submit" />
      </Form>
    </Container>
  );
};

export default AddCourse;
