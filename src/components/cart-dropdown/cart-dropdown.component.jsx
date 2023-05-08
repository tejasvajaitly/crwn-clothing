import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {selectCartItems} from '../../store/cart/cart.selector';
import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  const goToCheckouthandler = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map(item => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={goToCheckouthandler}>CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
