import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/Usercontext";
import * as Rb from "react-bootstrap";
import { Row, Col, Button, Form } from "react-bootstrap";
import "../App.css";
import { FlexModal } from "./FlexModal";

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
}

interface FormErrors {
  firstname?: string;
  lastname?: string;
  email?: string;
}

function Login() {
  const [state1, setState1] = React.useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
  });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setState1((prevState) => ({ ...prevState, [id]: value }));
  };

  const validate = () => {
    const vErrors: FormErrors = {};
    const regString: RegExp = /^[aA-zZ\s]+$/;
    const regEmail: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!state1.firstname) {
      vErrors.firstname = "Required";
    } else if (!regString.test(state1.firstname)) {
      vErrors.firstname = "Must be letters";
    }
    if (!state1.lastname) {
      vErrors.lastname = "Required";
    } else if (!regString.test(state1.lastname)) {
      vErrors.lastname = "Must be letters";
    }
    if (!state1.email) {
      vErrors.email = "Required";
    } else if (!regEmail.test(state1.email)) {
      vErrors.email = "Must be a valid email";
    }
    setErrors(vErrors);
    return !vErrors.firstname && !vErrors.lastname && !vErrors.email;
  };

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validate();
    setNewUser(false); // Define he newUser variable

    if (isValid) {
      try {
        const response = await fetch(
          `http://localhost:8888/api/account/${state1.email}`
        );

        if (response.status === 404) {
          setNewUser(true); // Set newUser to true when the response is 404

          try {
            await fetch(`http://localhost:8888/api/account/${state1.email}`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: state1.email,
                firstname: state1.firstname,
                lastname: state1.lastname,
                product_data: [],
                total: 0,
                count: 0,
              }),
            });

            // Update the user context for a new cart
            defaultContext.updateUser({
              email: state1.email,
              firstname: state1.firstname,
              lastname: state1.lastname,
              count: 0,
              total: 0,
              product_data: [],
            });
          } catch (error) {
            console.error("Error:", error);
          }
        } else {
          setNewUser(false); // Set newUser to false when the response is not 404

          const jsonResponse = await response.json();

          // Update the user context with existing cart details
          defaultContext.updateUser({
            email: state1.email,
            firstname: jsonResponse.firstname,
            lastname: jsonResponse.lastname,
            count: jsonResponse.count,
            total: jsonResponse.total,
            product_data: jsonResponse.product_data,
          });
        }
        setShowModal(true);
        //navigate('/');
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("invalid input");
    }
  };

  const defaultContext = useContext(UserContext);

  return (
    <div className="container w-50 mx-auto mt-5 mb-5">
      <div className="header">
        <p>
          <i className="fas fa-home me-3"></i> Welcome, it’s nice to see you...
        </p>
      </div>
      <Form onSubmit={onSubmit}>
        <div className="label">
          <Form.Label>First Name</Form.Label>
        </div>

        <div className="field">
          <input
            type="input"
            id="firstname"
            placeholder="First name"
            onChange={(evt) => handleInputChange(evt)}
          />
          {errors.firstname ? (
            <span style={{ color: "red" }}>{errors.firstname}</span>
          ) : null}
        </div>

        <div className="label">
          <Form.Label>Last Name</Form.Label>
        </div>

        <div className="field">
          <input
            type="input"
            id="lastname"
            placeholder="Last name"
            onChange={(evt) => handleInputChange(evt)}
          />
          {errors.lastname ? (
            <span style={{ color: "red" }}>{errors.lastname}</span>
          ) : null}
        </div>

        <div className="label">
          <Form.Label>Email</Form.Label>
        </div>

        <div className="field">
          <input
            type="email"
            id="email"
            placeholder="email@example.com"
            onChange={(evt) => handleInputChange(evt)}
          />
          {errors.email ? (
            <span style={{ color: "red" }}>{errors.email}</span>
          ) : null}
        </div>
        {
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        }
        <NavLink type="reset" className="btn btn-danger nav-link" to="/">
          Cancel
        </NavLink>
      </Form>
      {showModal && (
        <FlexModal
          body="You are now logged in, click close to be redirected to the Home page"
          headline={
            newUser
              ? `Thank you for registering ${state1.firstname}!`
              : `Welcome Back ${state1.firstname}!`
          }
          show={showModal}
          onHide={() => {
            setShowModal(false);
            navigate("/");
          }}
        ></FlexModal>
      )}
    </div>
  );
}

export default Login;
