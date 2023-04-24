import CardFactory from "./CardFactory"
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


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
            <a
              href="./catalogue.html"
              className="btn px-5 py-3 text-white mt-3 mt-sm-0"
              style={{
                borderRadius: "0",
                backgroundColor: "#9D2626",
              }}
            >
              SEE PRODUCTS
            </a>
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
      <OwlCarousel className="owl-theme" loop margin={10} nav>
      <CardFactory endpoint="api/products/category/red"></CardFactory>
      </OwlCarousel>
      </div>
  
      <div className="container mx-auto mt-5 mb-5">
        <h3>
          {" "}
          <b>Products on sale:</b>{" "}
        </h3>
      </div>
  
      <div className="container mx-auto mt-5 mb-5">
      <OwlCarousel className="owl-theme" loop margin={10} nav>
      <CardFactory endpoint="api/products/category/white"></CardFactory>
      </OwlCarousel>
      </div>
  
      <div
        className="modal fade"
        id="cartModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="cartModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="cartModalLabel">
                Your Cart
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="cart-table">
                <div className="cart-table-header">
                  <div className="cart-table-cell">Product</div>
                  <div className="cart-table-cell">Quantity</div>
                  <div className="cart-table-cell">Total</div>
                  <div className="cart-table-cell"></div>
                </div>
                <div className="cart-table-body"></div>
              </div>
              <div className="cart-summary">
                <div className="total-items"></div>
                <div className="total-price"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div
        className="modal fade"
        id="atcModal"
        tabIndex={-1}
        aria-labelledby="atcModalLabel"
        aria-hidden="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="atcModalLabel">
                Successfully added to basket!
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body cart-modal-body">
              Your item has been added to the basket.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="basket-button primary-button"
                //onClick={viewCart}
              >
                View basket
              </button>
              <button
                type="button"
                className="accent basket-button"
                //onClick={jQuery('#atcModal').modal('hide')}
              >
                Continue shopping
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }

export default Home;
  