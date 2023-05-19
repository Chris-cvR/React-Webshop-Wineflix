import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import { UserContext } from "../context/Usercontext";
import { FlexModal } from "./FlexModal";

interface IProduct {
  brand: string;
  description: string;
  id: number;
  image: string;
  list_price: number;
  name: string;
  country: string;
  year: number;
  category: string;
  price: number;
  url: string;
}

const options = {
  margin: 30,
  responsiveClass: true,
  nav: true,
  dots: true,
  autoplay: false,
  navText: ["<", ">"],
  smartSpeed: 1000,
  responsive: {
    0: {
      items: 1,
    },
    400: {
      items: 1,
    },
    600: {
      items: 1,
    },
    700: {
      items: 2,
    },
    1000: {
      items: 3,
    },
  },
};

function CardFactory({ carousel }: { endpoint: string; carousel: boolean }) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [myArray, setMyArray] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const { user, updateUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    fetchData();
  }, [myArray, user]);

  const fetchData = async (): Promise<any> => {
    setIsLoading(true);

    try {
      let filter = "";
      if (myArray.length > 0) {
        filter = myArray[0].replace("&", "?");
      }
      filter += myArray.slice(1).join("");
      const response = await fetch(
        `http://localhost:8888/api/products${filter}`
      );
      const data = await response.json();
      setProducts(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  function addToArray(str: string): void {
    // Extract the filter type from the new filter string
    const [type] = str.split("=");

    // Remove any existing filter of the same type
    setMyArray((prevArray) =>
      prevArray.filter((item) => !item.startsWith(`${type}=`))
    );

    // Add the new filter
    setMyArray([...myArray, str]);
  }

  function removeFromArray(str: string): void {
    setMyArray(myArray.filter((item) => item !== str));
  }

  function addToCart(id: number): void {
    const existingProductIndex = user.product_data.findIndex(
      (product) => product.id === id
    );

    if (existingProductIndex !== -1) {
      // Product already exists, increase quantity and update total price
      const updatedProductData = [...user.product_data];
      const existingProduct = updatedProductData[existingProductIndex];
      const updatedQuantity = existingProduct.quantity + 1;
      const updatedTotal = user.total + existingProduct.price;
      updatedProductData[existingProductIndex] = {
        ...existingProduct,
        quantity: updatedQuantity,
      };

      updateUser({
        ...user,
        product_data: updatedProductData,
        count: user.count + 1,
        total: updatedTotal,
      });
    } else {
      // Product doesn't exist yet, fetch product data and add to cart
      fetch(`http://localhost:8888/api/products?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          const newProductData = { ...data[0], quantity: 1 };
          const updatedProductData = [
            ...user.product_data,
            { ...newProductData },
          ];
          const updatedCount = user.count + 1;
          const updatedTotal = user.total + newProductData.price;

          fetch(`http://localhost:8888/api/cart/${user.email}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              total: updatedTotal,
              count: updatedProductData.length,
              product_data: updatedProductData,
            }),
          })
            .then((response) => {
              if (response.status === 404) {
                fetch(`http://localhost:8888/api/cart/${user.email}`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    total: updatedTotal,
                    count: updatedProductData.length,
                    product_data: updatedProductData,
                  }),
                })
                  .then((response) => response.json())
                  .then((data) => console.log(data))
                  .catch((err) => console.log(err));
              }
              return response.json();
            })
            .then((data) =>
              updateUser({
                ...user,
                product_data: updatedProductData,
                count: updatedCount,
                total: updatedTotal,
              })
            )
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {carousel ? (
        <OwlCarousel className="owl-theme" {...options}>
          {products.map((product: IProduct) => {
            const { id, image, name, price, description } = product;

            return (
              <div key={id} className="card">
                <div className="card-body">
                  <NavLink className="nav-link" to={`/product/${id}`}>
                    <div>
                      <img className="mb-5" src={`${image}`} alt={`${name}`} />
                      <h5 className="card-title">{`${name}`}</h5>
                    </div>
                  </NavLink>
                  <h5 className="card-price">{`${price}`} DKK</h5>
                  <div className="card-text">{`${description}`}</div>
                  <button
                    className="basket-button"
                    onClick={() => {
                      addToCart(id);
                      setShowModal(true);
                    }}
                    data-pid={id}
                  >
                    Add to basket
                  </button>
                </div>
              </div>
            );
          })}
        </OwlCarousel>
      ) : (
        <div>
          <div id="filter-container">
            <div className="container mx-auto mt-5 mb-5">
              {/* <button
                className="btn btn-secondary"
                type="button"
                onClick={() => fetchData()}
                id="resetButton"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Reset
              </button> */}
              <label htmlFor="country">Countries:</label>
              <div>
                <input
                  type="checkbox"
                  name="country"
                  id="South Africa"
                  value="South Africa"
                  onChange={(event) => {
                    if (event.target.checked) {
                      addToArray("&country=South Africa");
                    } else {
                      removeFromArray("&country=South Africa");
                    }
                  }}
                  checked={myArray.includes("&country=South Africa")}
                />
                <label htmlFor="South Africa">South Africa</label>
              </div>

              <div>
                <input
                  type="checkbox"
                  name="country"
                  id="France"
                  value="France"
                  onChange={(event) => {
                    if (event.target.checked) {
                      addToArray("&country=France");
                    } else {
                      removeFromArray("&country=France");
                    }
                  }}
                  checked={myArray.includes("&country=France")}
                />
                <label htmlFor="France">France</label>
              </div>

              <div>
                <input
                  type="checkbox"
                  name="country"
                  id="Italy"
                  value="Italy"
                  onChange={(event) => {
                    if (event.target.checked) {
                      addToArray("&country=Italy");
                    } else {
                      removeFromArray("&country=Italy");
                    }
                  }}
                  checked={myArray.includes("&country=Italy")}
                />
                <label htmlFor="Italy">Italy</label>
              </div>

              <label htmlFor="wineType">Type of Wine:</label>
              <div>
                <input
                  type="checkbox"
                  name="wineType"
                  id="red"
                  value="red"
                  onChange={(event) => {
                    if (event.target.checked) {
                      addToArray("&category=Red");
                    } else {
                      removeFromArray("&category=Red");
                    }
                  }}
                  checked={myArray.includes("&category=Red")}
                />

                <label htmlFor="red">Red</label>
              </div>

              <div>
                <input
                  type="checkbox"
                  name="wineType"
                  id="white"
                  value="white"
                  onChange={(event) => {
                    if (event.target.checked) {
                      addToArray("&category=White");
                    } else {
                      removeFromArray("&category=White");
                    }
                  }}
                  checked={myArray.includes("&category=White")}
                />
                <label htmlFor="white">White</label>
              </div>

              <div>
                <input
                  type="checkbox"
                  name="wineType"
                  id="sparkling"
                  value="sparkling"
                  onChange={(event) => {
                    if (event.target.checked) {
                      addToArray("&category=Sparkling");
                    } else {
                      removeFromArray("&category=Sparkling");
                    }
                  }}
                  checked={myArray.includes("&category=Sparkling")}
                />
                <label htmlFor="sparkling">Sparkling</label>
              </div>

              <label htmlFor="vintageYear">Year of vintage:</label>
              <div>
                <input
                  type="checkbox"
                  name="vintageYear"
                  id="2014"
                  value="2014"
                  onChange={(event) => {
                    if (event.target.checked) {
                      addToArray("&year=2014");
                    } else {
                      removeFromArray("&year=2014");
                    }
                  }}
                  checked={myArray.includes("&year=2014")}
                />

                <label htmlFor="2014">2014</label>
              </div>

              <div>
                <input
                  type="checkbox"
                  name="vintageYear"
                  id="2016"
                  value="2016"
                  onChange={(event) => {
                    if (event.target.checked) {
                      addToArray("&year=2016");
                    } else {
                      removeFromArray("&year=2016");
                    }
                  }}
                  checked={myArray.includes("&year=2016")}
                />
                <label htmlFor="2016">2016</label>
              </div>

              <div>
                <input
                  type="checkbox"
                  name="vintageYear"
                  id="2017"
                  value="2017"
                  onChange={(event) => {
                    if (event.target.checked) {
                      addToArray("&year=2017");
                    } else {
                      removeFromArray("&year=2017");
                    }
                  }}
                  checked={myArray.includes("&year=2017")}
                />
                <label htmlFor="2017">2017</label>
              </div>

              <div>
                <input
                  type="checkbox"
                  name="vintageYear"
                  id="2019"
                  value="2019"
                  onChange={(event) => {
                    if (event.target.checked) {
                      addToArray("&year=2019");
                    } else {
                      removeFromArray("&year=2019");
                    }
                  }}
                  checked={myArray.includes("&year=2019")}
                />
                <label htmlFor="2019">2019</label>
              </div>

              <div>
                <input
                  type="checkbox"
                  name="vintageYear"
                  id="2020"
                  value="2020"
                  onChange={(event) => {
                    if (event.target.checked) {
                      addToArray("&year=2020");
                    } else {
                      removeFromArray("&year=2020");
                    }
                  }}
                  checked={myArray.includes("&year=2020")}
                />
                <label htmlFor="2020">2020</label>
              </div>

              <div>
                <input
                  type="checkbox"
                  name="vintageYear"
                  id="2021"
                  value="2021"
                  onChange={(event) => {
                    if (event.target.checked) {
                      addToArray("&year=2021");
                    } else {
                      removeFromArray("&year=2021");
                    }
                  }}
                  checked={myArray.includes("&year=2021")}
                />
                <label htmlFor="2021">2021</label>
              </div>
            </div>
          </div>
          <div id="grid-container" className={error ? "show-error" : ""}>
            {products.length > 0 ? (
              products.map((product: IProduct) => {
                const { id, image, name, price, description } = product;

                return (
                  <div key={id} className="card">
                    <div className="card-body">
                      <NavLink className="nav-link" to={`/product/${id}`}>
                        <div>
                          <img
                            className="mb-5"
                            src={`${image}`}
                            alt={`${name}`}
                          />
                          <h5 className="card-title">{`${name}`}</h5>
                        </div>
                      </NavLink>
                      <h5 className="card-price">{`${price}`} DKK</h5>
                      <div className="card-text">{`${description}`}</div>
                      <button
                        className="basket-button"
                        onClick={() => addToCart(id)}
                        data-pid={id}
                      >
                        Add to basket
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <div className="container mx-auto mt-5 mb-5">
                  <p id="error-message">No products match your criteria!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {showModal && (
  <FlexModal
    show={showModal}
    onHide={() => setShowModal(false)}
    headline="Item added to cart!"
    body="Your item has been added to the shopping cart."
  />
)}

    </>
  );
}


export default CardFactory;
