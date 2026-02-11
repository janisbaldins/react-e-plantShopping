import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, addItem } from './CartSlice'; // <-- + addItem
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const toNumber = (cost) => {
    if (typeof cost === 'number') return cost;
    const n = parseFloat(String(cost).replace('$', '').trim());
    return Number.isFinite(n) ? n : 0;
  };

  const calculateTotalAmount = () => {
    const total = cart.reduce((sum, item) => sum + toNumber(item.cost) * (item.quantity || 0), 0);
    return total.toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping?.(e);
  };

  // ✅ Task 4: use addItem to add/increment
  const handleIncrement = (item) => {
    dispatch(addItem(item));
  };

  // ✅ Task 4: updateQuantity to change count
  const handleDecrement = (item) => {
    const q = item.quantity || 0;
    if (q <= 1) {
      dispatch(removeItem(item.name));
      return;
    }
    dispatch(updateQuantity({ name: item.name, quantity: q - 1 }));
  };

  // ✅ Task 4: removeItem to delete completely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = (item) => {
    const total = toNumber(item.cost) * (item.quantity || 0);
    return total.toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>

      {cart.length === 0 ? (
        <div style={{ color: 'black', marginTop: 16 }}>Cart is empty.</div>
      ) : (
        <div>
          {cart.map(item => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>

                <div className="cart-item-quantity">
                  <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                </div>

                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button
  className="get-started-button1"
  onClick={() => alert("Coming Soon")}
>
  Checkout
</button>
      </div>
    </div>
  );
};

export default CartItem;
