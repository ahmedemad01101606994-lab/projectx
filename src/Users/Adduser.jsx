import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addUser } from "../store/usersSlice";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function AddUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameRef = useRef();
  const ageRef = useRef();
  const genderRef = useRef();
  const deptRef = useRef();
  console.log(deptRef);
  const submit = (e) => {
    e.preventDefault();
    dispatch(
      addUser({
        id: uuidv4(),
        user: nameRef.current.value,
        age: Number(ageRef.current.value),
        gender: genderRef.current.value,
        company: { department: deptRef.current.value },
      })
    );
    navigate("/Dashbord/Users");
  };

  return (
    <Form className="p-3" onSubmit={submit}>
      <Form.Control
        ref={nameRef}
        placeholder="Username"
        required
        className="mb-2"
      />
      <Form.Control
        ref={ageRef}
        type="number"
        placeholder="Age"
        required
        className="mb-2"
      />
      <Form.Select ref={genderRef} className="mb-2">
        <option>male</option>
        <option>female</option>
      </Form.Select>
      <Form.Control
        ref={deptRef}
        placeholder="Department"
        required
        className="mb-2"
      />
      <Button type="submit">Add</Button>
    </Form>
  );
}

export default AddUser;
