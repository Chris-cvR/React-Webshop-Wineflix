import React, { useState, useEffect, useContext } from "react";
import CardFactory from "./CardFactory";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/Usercontext";
import { FlexModal } from "./FlexModal";

function Product() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { user, updateUser } = useContext(UserContext);


  useEffect(() => {
    const fetchData = async (id: any): Promise<any> => {
      const response = await fetch(
        `http://localhost:8888/api/products/?id=${id}`
      );
      const data = await response.json();
      return data;
    };

    fetchData(id)
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
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
              ...(user.firstname && user.lastname ? { firstname: user.firstname, lastname: user.lastname } : {})
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
                    ...(user.firstname && user.lastname ? { firstname: user.firstname, lastname: user.lastname } : {})
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

  return (
    <div>
      {products.map(
        (product: {
          id: any;
          image: any;
          name: any;
          price: any;
          description: any;
          brand: any;
          country: any;
        }) => {
          const { id, image, name, price, description, brand, country } =
            product;

          return (
            <div>
              <div
                style={{ display: "flex", backgroundColor: "white" }}
                className="container mx-auto mt-5 mb-5"
              >
                <div id="product">
                  <div
                    className="Product-picture"
                    style={{
                      width: "40%",
                      float: "right",
                      paddingLeft: "5%",
                      marginTop: "1%",
                    }}
                  >
                    <img
                      className="mb-5"
                      src={`${image}`}
                      style={{
                        maxWidth: "100%",
                        zoom: "140%",
                        backgroundColor: "white",
                      }}
                    />
                  </div>
                  <div
                    className="Product-info"
                    style={{ width: "60%", float: "left", marginTop: "1%" }}
                  >
                    <h3 id="name">{`${name}`}</h3>
                    <h5
                      className=" producer-link"
                      style={{ color: "#9D2626" }}
                    >{`${brand}`}</h5>
                    <h5 style={{ color: "#9D2626" }}>{`${country}`}</h5>
                    <h6 className="title-price">
                      <small>Price</small>
                    </h6>
                    <h5 style={{ marginTop: "0px" }}>{`${price} DKK`}</h5>
                    <div className="section" style={{ paddingBottom: "20px" }}>
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
                    <div className="Product-description">
                      <p
                        style={{ width: "100%", float: "left" }}
                      >{`${description}`}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container mx-auto mt-5 mb-5">
                <h3>
                  <b>Alternative Products:</b>
                </h3>
                <CardFactory
                  carousel={true}
                  endpoint={"api/products?category=white"}
                />
              </div>
            </div>
          );
        }
      )}
            {showModal && (
  <FlexModal
    show={showModal}
    onHide={() => setShowModal(false)}
    headline="Item added to cart!"
    body="Your item has been added to the shopping cart."
  />
)}
    </div>
  );
}

export default Product;
