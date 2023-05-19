import React, { useContext, useState } from 'react';
import { UserContext } from '../context/Usercontext'
import * as Rb from 'react-bootstrap';

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
    firstname: '',
    lastname: '',
    email: ''
  });
  const [errors, setErrors] = React.useState<FormErrors>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setState1(prevState => ({ ...prevState, [id]: value }));
  };

  const validate = () => {
    const vErrors: FormErrors = {};
    const regString: RegExp = /^[aA-zZ\s]+$/;
    const regEmail: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!state1.firstname) {
      vErrors.firstname = 'Required';
    } else if (!regString.test(state1.firstname)) {
      vErrors.firstname = 'Must be letters';
    }
    if (!state1.lastname) {
      vErrors.lastname = 'Required';
    } else if (!regString.test(state1.lastname)) {
      vErrors.lastname = 'Must be letters';
    }
    if (!state1.email) {
      vErrors.email = 'Required';
    } else if (!regEmail.test(state1.email)) {
      vErrors.email = 'Must be a valid email';
    }
    setErrors(vErrors);
    return !vErrors.firstname && !vErrors.firstname && !vErrors.email;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      const response = await fetch(`http://localhost:8888/api/cart/${state1.email}`);
      if (response.status === 404) {
        try {
          await fetch(`http://localhost:8888/api/cart/${state1.email}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: state1.email,
              firstname: state1.firstname,
              lastname: state1.lastname,
              product_data: [],
              total: 0,
              count: 0
            })
          });
        } catch (error) {
          console.error('Error:', error);
        }
      }
      // Update the user context here
      defaultContext.updateUser({ firstname: state1.firstname, lastname: state1.lastname, email: state1.email });
    } else alert('invalid input');
  };

  const defaultContext = useContext(UserContext);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <span>
          <Rb.Form.Label>
            <p>First Name</p>
          </Rb.Form.Label>

          <input
            type="input"
            id="firstname"
            placeholder="Firstname"
            onChange={(evt) => handleInputChange(evt)}
          />
          {errors.firstname ? <span style={{ color: 'red' }}>{errors.firstname}</span> : null}
        </span>
        <span>
          <Rb.Form.Label>
            <p>Last name</p>
          </Rb.Form.Label>
          <input
            type="input"
            id="lastname"
            placeholder="lastname"
            onChange={(evt) => handleInputChange(evt)}
          />
          {errors.lastname ? <span style={{ color: 'red' }}>{errors.lastname}</span> : null}
        </span>
        <span>
          <Rb.Form.Label>
            <p>Email address</p>
          </Rb.Form.Label>
          <input
            type="email"
            id="email"
            placeholder="email@example.com"
            onChange={(evt) => handleInputChange(evt)}
          />
          {errors.email ? <span style={{ color: 'red' }}>{errors.email}</span> : null}
        </span>
        {
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        }
        <button type="reset" className="btn btn-danger">
          Cancel
        </button>
      </form>

    </div>
  );
}

export default Login;
