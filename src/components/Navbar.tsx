import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
  <nav className="navbar navbar-expand-lg navbar-light primary py-3 border border-secondary">
    <div className="container-fluid">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <a className="navbar-brand mt-2 mt-lg-0 home-icon" href="#">
        </a>

        <ul className="navbar-nav">
          <li className="nav-item">
          <NavLink className="nav-link" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
          <NavLink className="nav-link" to="/catalogue">Products</NavLink>
          </li>
        </ul>
      </div>

      <div className="d-flex align-items-center">
        <a className="nav-link" href="#" data-toggle="modal" data-target="#cartModal">
        <div id="cart">
            <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio= "none" width="29px" height="30px" viewBox="-2.4 -2.4 28.80 25.80" fill="none">
   
              <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
              
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.048"/>
              
              <g id="SVGRepo_iconCarrier"> <path d="M8 12L8 8C8 5.79086 9.79086 4 12 4V4C14.2091 4 16 5.79086 16 8L16 12" stroke="#222222" strokeWidth="1.176" strokeLinecap="round"/> <path d="M3.69435 12.6678C3.83942 10.9269 3.91196 10.0565 4.48605 9.52824C5.06013 9 5.9336 9 7.68053 9H16.3195C18.0664 9 18.9399 9 19.514 9.52824C20.088 10.0565 20.1606 10.9269 20.3057 12.6678L20.8195 18.8339C20.904 19.8474 20.9462 20.3542 20.6491 20.6771C20.352 21 19.8435 21 18.8264 21H5.1736C4.15655 21 3.64802 21 3.35092 20.6771C3.05382 20.3542 3.09605 19.8474 3.18051 18.8339L3.69435 12.6678Z" fill="#222222"/> </g>
              
              </svg>
            </div>
            
          </a>
   
          <ul className="navbar-nav align-items-center" style={{display:'contents'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
   
                <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                
                <g id="SVGRepo_iconCarrier"> <circle cx="12" cy="8" r="4" fill="#222222"/> <path d="M5.33788 17.3206C5.99897 14.5269 8.77173 13 11.6426 13H12.3574C15.2283 13 18.001 14.5269 18.6621 17.3206C18.79 17.8611 18.8917 18.4268 18.9489 19.0016C19.0036 19.5512 18.5523 20 18 20H6C5.44772 20 4.99642 19.5512 5.0511 19.0016C5.1083 18.4268 5.20997 17.8611 5.33788 17.3206Z" fill="#222222"/> </g>
                
                </svg>
              <li className="nav-item" >
              <NavLink className="nav-link" to="/login">Log in</NavLink>
              </li>
            </ul>
  
      </div>

    </div>
  </nav>

    );
  }
  
  export default Navbar;
  