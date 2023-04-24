function Login(){
    return(

    <div className="container w-50 mx-auto mt-5 mb-5">
    <p><i className="fas fa-home me-3"></i> Welcome, it’s nice to see you...</p>

    <form action="./index.html">
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">First name</label>
        <input type="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Last name</label>
        <input type="name" className="form-control" id="exampleInputPassword1"/> 
      </div>
      { <button type="submit" className="btn btn-primary" /*onclick="store()"*/>Submit</button> }
      <button type="reset" className="btn btn-danger">Cancel</button>
    </form>
  </div>

    )
}


export default Login;
