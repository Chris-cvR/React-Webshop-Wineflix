import CardFactory from "./CardFactory"
import { NavLink } from 'react-router-dom'
import { HeroBanner } from "./HeroBanner";


function Home() {
    return (
    <div>
      <HeroBanner></HeroBanner>
      <div className="container mx-auto mt-5 mb-5">
        <h3>
          {" "}
          <b>Newest Products:</b>{" "}
        </h3>
      </div>

  
      <div className="container mx-auto mt-5 mb-5">
      <CardFactory carousel={true} endpoint="api/products?category=white"></CardFactory>
      </div>
  
      <div className="container mx-auto mt-5 mb-5">
        <h3>
          {" "}
          <b>Products on sale:</b>{" "}
        </h3>
      </div>
  
      <div className="container mx-auto mt-5 mb-5">
      <CardFactory carousel={true} endpoint="api/Products?country=South%20Africa"></CardFactory>
      </div>
  
      </div>
    );
  }

export default Home;
  