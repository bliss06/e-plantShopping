import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onRemoveProduct, onContinueShopping }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.cost,
      0
    );
  };

  const handleContinueShopping = () => {
    console.log("Continue Shopping");

    if (onContinueShopping) {
      onContinueShopping();
    }
  };

  //Call the parent component function to update the added to cart flag
  const handleRemoveFromCart = (itemName) => {
    console.log("Removing item from cart: ", itemName);
    if (onRemoveProduct) {
      onRemoveProduct(itemName);
    }
  };

  const handleCheckoutShopping = (e) => {
    alert("Functionality to be added for future reference");
  };
  const handleIncrement = (item) => {
    console.log("Incrementing quantity for item: ", item.name);
    console.log("Total quantity: ", totalQuantity);
    console.log("Total amount: ", totalAmount);
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity === 0) {
      return;
    }
    if (item.quantity === 1) {
      handleRemoveFromCart(item.name);
    }
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
  };

  const handleRemove = (item) => {
    handleRemoveFromCart(item.name);
    dispatch(removeItem({ name: item.name }));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return item.quantity * item.cost;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>Total Cart Amount: ${totalAmount}</h2>
      <div>
        {cartItems.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      ></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
