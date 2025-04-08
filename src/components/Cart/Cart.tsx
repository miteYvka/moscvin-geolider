import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { removeFromCart, updateQuantity, clearCart } from '../../store/slices/cartSlice';
import './Cart.scss';

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isOpen, setIsOpen] = useState(false);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <div className={`cart ${isOpen ? 'open' : ''}`}>
      <button className="cart-toggle" onClick={() => setIsOpen(!isOpen)}>
        Корзина ({cartItems.reduce((total, item) => total + item.quantity, 0)})
      </button>
      
      {isOpen && (
        <div className="cart-content">
          <h2>Ваша корзина</h2>
          
          {cartItems.length === 0 ? (
            <p>Корзина пуста</p>
          ) : (
            <>
              <ul className="cart-items">
                {cartItems.map(item => (
                  <li key={item.id} className="cart-item">
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>Вкус: {item.texture}</p>
                    </div>
                    <div className="item-controls">
                      <div className="quantity-control">
                        <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <div className="item-price">{item.price * item.quantity} ₽</div>
                      <button 
                        className="remove-item"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        ×
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="cart-total">
                <span>Итого:</span>
                <span>{totalPrice} ₽</span>
              </div>
              
              <div className="cart-actions">
                <button 
                  className="clear-cart"
                  onClick={() => dispatch(clearCart())}
                >
                  Очистить корзину
                </button>
                
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;