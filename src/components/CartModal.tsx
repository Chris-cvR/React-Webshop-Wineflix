import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { UserContext } from "../context/Usercontext";
import { useContext } from "react";

interface Props {
  show: boolean;
  onHide: () => void;
}

interface ProductData {
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
    quantity: number;
  }

  export function CartModal(props: Props) {
    const { user, updateUser } = useContext(UserContext);

    const removeProduct = (productId: number) => {
        const updatedProducts = user.product_data.map((product) =>
          product.id === productId
            ? { ...product, quantity: product.quantity - 1 }
            : product
        );
      
        const filteredProducts = updatedProducts.filter(
          (product) => product.quantity > 0
        );
      
        const updatedTotalPrice = filteredProducts.reduce(
          (acc: number, product: ProductData) =>
            acc + product.price * product.quantity,
          0
        );
      
        const updatedUser = {
          ...user,
          product_data: filteredProducts,
          total: updatedTotalPrice,
        };
      
        // Make the PUT request to update the cart
        fetch(`http://localhost:8888/api/account/${user.email}`, {
          method: "PUT",
          body: JSON.stringify({
            total: updatedUser.total,
            count: updatedUser.product_data.length,
            product_data: updatedUser.product_data,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(() => {
            updateUser(updatedUser);
          })
          .catch((err) => console.error(err));
      };
      
      
      const cartItems = user.product_data.map((product: ProductData) => (
        <div className="cart-table-row">
          <div className="cart-table-cell">{product.name}</div>
          <div className="cart-table-cell">{product.quantity}</div>
          <div className="cart-table-cell">
            {product.quantity * product.price} DKK
          </div>
          <div className="cart-table-cell">
            <button
              className="remove-btn"
              onClick={() => removeProduct(product.id)}
            >
              &times;
            </button>
          </div>
        </div>
      ));
  
    const totalItems = user.product_data.reduce(
      (acc: number, product: ProductData) => acc + product.quantity,
      0
    );
  
    const totalPrice = user.product_data.reduce(
      (acc: number, product: ProductData) => acc + product.price * product.quantity,
      0
    );
  
    return (
      <Modal {...props} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Your cart</Modal.Title>
        </Modal.Header>
        {cartItems.length > 0 ? (
          <Modal.Body>
            <div className="cart-table">
              <div className="cart-table-header">
                <div className="cart-table-cell">Product</div>
                <div className="cart-table-cell">Quantity</div>
                <div className="cart-table-cell">Total</div>
                <div className="cart-table-cell"></div>
              </div>
              <div className="cart-table-body">{cartItems}</div>
            </div>
            <div className="cart-summary">
              <div className="total-items">Total items: {totalItems}</div>
              <div className="total-price">Total price: {totalPrice} DKK</div>
            </div>
          </Modal.Body>
        ) : (
          <Modal.Body>
            <div>Your cart is empty!</div>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
