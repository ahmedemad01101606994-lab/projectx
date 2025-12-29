import React, { useEffect, useRef, useState } from "react";
import { Button, Form, FormControl, FormGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { use } from "react";
import { useSelector } from "react-redux";
import "./login.css";

function Login({ theme }) {
  //states
  const [password, setpassword] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [User, setUser] = useState("");
  //ref
  const usernameRef = useRef();
  const passwordRef = useRef();
  //dispatch
  const dispatch = useDispatch();
  //naviagte
  const navigate = useNavigate();

  async function handleSubmit(ev) {
    ev.preventDefault();

    try {
      setLoading(true);

      const loginData = {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      };

      //  Login
      const loginRes = await axios.post(
        "https://dummyjson.com/auth/login",
        loginData
      );

      toast.success("Login success");

      //  Store user
      dispatch(setUser(loginRes.data));
      localStorage.setItem("user", JSON.stringify(loginRes.data));

      //  Get auth user
      const token = loginRes.data.accessToken;

      const meRes = await axios.get("https://dummyjson.com/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const role = meRes.data.role;
      console.log("User role:", role);

      // Navigate by role
      if (role === "admin") {
        navigate("/Dashbord");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  //get data =>endpoint =>error=>respone=>store=>userslice=>go home
  return (
    <div bg={theme} className=" min-vh-100  mt-5">
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-3">
          <Form.Label htmlFor="username">Username</Form.Label>
          <FormControl
            ref={usernameRef}
            type="text"
            placeholder="username"
            id="Username"
            required
          />
        </FormGroup>
        <FormGroup className=" mb-3">
          <Form.Label htmlFor="password">password</Form.Label>
          <InputGroup>
            <FormControl
              ref={passwordRef}
              type={password ? "password" : "text"}
              placeholder="password"
              id="password"
              required
            />
            <InputGroup.Text>
              <div
                onClick={() => {
                  setpassword((prev) => !prev);
                }}
              >
                {password ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </InputGroup.Text>
          </InputGroup>
        </FormGroup>

        <Button variant="primary" type="submit">
          {Loading ? "loading..." : "submit"}
        </Button>
      </Form>
    </div>
  );
}

export default Login;
