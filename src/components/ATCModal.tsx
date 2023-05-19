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

  export function MyVerticallyCenteredModal(props: Props) {
    const { user } = useContext(UserContext);
  
    const cartItems = user.product_data.map((product: ProductData) => (
      <div className="cart-table-row">
        <div className="cart-table-cell">{product.name}</div>
        <div className="cart-table-cell">{product.quantity}</div>
        <div className="cart-table-cell">
          {product.quantity * product.price} DKK
        </div>
        <div className="cart-table-cell">
          <button className="remove-btn">&times;</button>
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
  
