import React, {useState, useEffect, useContext} from 'react';
import {UserContext } from '../App'
import * as Rb from "react-bootstrap";

function Login(){

  type FormData = {
    firstname : string;
    lastname : string;
    email : string; 
    
    }
    
    type FormErrors = {
     firstname? : string;
     lastname? : string;
     email? : string;
    }
    
    
    const [state1, setState1] = React.useState<FormData>({firstname: "",lastname: "", email: ""})
    const [errors, setErrors] = React.useState<FormErrors>({});
    
    
    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) =>{
      const name = event.target.id;
      const value = event.target.value;
      setState((prev) => ({ ...prev, ...{ [name]: value } }));
    };
    
    const validate = () => {
      const vErrors : FormErrors = {};
      const regString : RegExp = /^[aA-zZ\s]+$/;
      const regEmail : RegExp =  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      

      
      if(!state1.firstname){
        vErrors.firstname = "Required";
      }else if (!regString.test(state1.firstname)){
         vErrors.firstname = "Must be letters";
      }
      if(!state1.lastname){
        vErrors.lastname = "Required";
      }else if (!regString.test(state1.lastname)){
         vErrors.lastname = "Must be letters";
      }
      if (!state1.email) {
        vErrors.email = "Required"
        }else if (!regEmail.test(state1.email)){
           vErrors.email= "Must be a valid email";
        }
        setErrors(vErrors);
        return !vErrors.firstname && !vErrors.firstname && !vErrors.email;
      
      }
      const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
          submitForm();
        }
        else alert('invalid input') 
        
    
      };

      {/* State Hook has been used, where setemail, setlastname, and setfirstname are set everytime input changes (onChange) in the input fields
      When the Login button is clicked the submitForm() function is indirectly called which sends the Post request to the API. */}

      const [state, setState] = useState({ loading: false });
      const [firstname, setfirstname] = useState("");
      const [lastname, setlastname] = useState("");
      const [email, setemail] = useState("");
      const [product_data] = useState([]);
      const [total] = useState([]);
      const [count] = useState([]);

      {/*  Before the Post request is being sent the context are updated, using the updateUser() function implemented in the userContext type.
        tried to send data via the post method below.  */}

      {/*  Created a usercontext file that can update the user by the same attributes as in the post request. 
    But dont think it matches the way our json is setup. Maybe it just doesnt work and needs to be made in a different way. */}
      
      
      const defaultContext = useContext(UserContext);
      async function submitForm() {
        setState({ ...state, loading: true });
        defaultContext.updateUser({firstname: firstname, lastname: lastname, email: email })

        const response = await fetch(`http://localhost:3000/api/cart/:id`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, firstname, lastname ,product_data, total, count} ),
          
    });

    setState({ ...state, loading: false });
      
        
      }

      {/* Had to use react-bootstrap elements to make it work. 
    This has changed the way it looks. will make it prettier when everything else works. 
  Validation works. But nothing happens currently when you rty to login */}

    return (

<div >
<form  onSubmit={onSubmit} >

<span>
  
      <Rb.Form.Label><p>First Name</p></Rb.Form.Label>

  <input 
    type="input"
    id="firstname"
    placeholder = "Firstname"
    onChange={evt => {setfirstname(evt.target.value); handleInputChange(evt); setState1((input) => ({...input, ...{ [evt.target.id]: evt.target.value}}))}}
  />
  {errors.firstname ? <span style={{color : "red"}}>{errors.firstname}</span> : null}
</span>
<span>
<Rb.Form.Label><p>Last name</p></Rb.Form.Label>
  <input 
    type="input"
    id="lastname"
    placeholder = "lastname"
    onChange={evt => {setlastname(evt.target.value); handleInputChange(evt); setState1((input) => ({...input, ...{ [evt.target.id]: evt.target.value}}))}}
  />
  {errors.lastname ? <span style={{color : "red"}}>{errors.lastname}</span> : null}
</span>
<span>
<Rb.Form.Label><p>Email address</p></Rb.Form.Label>
<input
    type="email"
    id="email"
    placeholder="email@example.com"
    onChange={evt => {setemail(evt.target.value);handleInputChange(evt); setState1((input) => ({...input, ...{ [evt.target.id]: evt.target.value}}))}}
  />
  {errors.email ? <span style={{color : "red"}}>{errors.email}</span> : null}
</span>
{ <button type="submit" className="btn btn-primary" /*onclick="store()"*/>Submit</button> }
      <button type="reset" className="btn btn-danger">Cancel</button>

</form>
</div>

    )

}

export default Login;


/* Original login
<div className="container w-50 mx-auto mt-5 mb-5">
<p><i className="fas fa-home me-3"></i> Welcome, it’s nice to see you...</p>

<form onSubmit={onSubmit} >
<div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
    <input type="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">First name</label>
    <input type="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Last name</label>
    <input type="name" className="form-control" id="exampleInputPassword1"/> 
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button> 
  <button type="reset" className="btn btn-danger">Cancel</button></form></div> */




