import React, {useState, useEffect, useContext} from 'react';

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
          Submit();
        }
        else alert('invalid input') 
        
    
      };

    return(

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
      <button type="submit" className="btn btn-primary" /*onclick="store()"*/>Submit</button> 
      <button type="reset" className="btn btn-danger">Cancel</button>
    </form>
  </div>

    )
}


export default Login;
