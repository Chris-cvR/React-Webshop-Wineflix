import CardFactory from "./CardFactory"
import { NavLink } from 'react-router-dom'


function Home() {
    return (
    <div>
      <div className="container mt-5 mx-auto" style={{ marginBottom: "8rem" }}>
        <div className="d-sm-flex align-items-center justify-content-between w-100">
          <div className="col-md-4 mx-auto mb-4 mb-sm-0 headline">
            <h1 className="display-4 my-4 font-weight-bold">
              Wine delivered to your door.
              <div style={{ color: "#9D2626" }}>Cheers to that!</div>
            </h1>
            <NavLink
              to="/catalogue"
              className="btn px-5 py-3 text-white mt-3 mt-sm-0"
              style={{
                borderRadius: "0",
                backgroundColor: "#9D2626",
              }}
            >
              SEE PRODUCTS
            </NavLink>
          </div>
  
          <div
            className="col-md-8 clipped"
            style={{
              minHeight: "350px",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="1"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="2"
                ></li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    className="d-block w-100 h-100"
                    src="https://images.pexels.com/photos/391213/pexels-photo-391213.jpeg?cs=srgb&dl=pexels-posawee-suwannaphati-391213.jpg&fm=jpg"
                    alt="First slide"
                  ></img>
                </div>
                <div className="carousel-item">
                  <img
                    className="d-block w-100 h-100"
                    src="https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHdpbmV8ZW58MHx8MHx8&w=1000&q=80"
                    alt="Second slide"
                  ></img>
                </div>
                <div className="carousel-item">
                  <img
                    className="d-block w-100 h-100"
                    src="https://www.foodandwine.com/thmb/ir1Mhc_qWGo4fWlj887-LzVc3_g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/dessert-wines-what-to-know-FT-BLOG0122-3b0040474802467bb57ea6ee5e4acd92.jpg"
                    alt="Third slide"
                  ></img>
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </div>
  
      <div className="container mx-auto mt-5 mb-5">
        <h3>
          {" "}
          <b>Newest Products:</b>{" "}
        </h3>
      </div>

  
      <div className="container mx-auto mt-5 mb-5">
      <CardFactory carousel={true} endpoint="api/products?category=red"></CardFactory>
      </div>
  
      <div className="container mx-auto mt-5 mb-5">
        <h3>
          {" "}
          <b>Products on sale:</b>{" "}
        </h3>
      </div>
  
      <div className="container mx-auto mt-5 mb-5">
      <CardFactory carousel={true} endpoint="api/products/?year=2020"></CardFactory>
      </div>
  
      </div>
    );
  }

export default Home;
  