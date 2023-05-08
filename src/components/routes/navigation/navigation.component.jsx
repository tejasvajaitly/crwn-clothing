import {Fragment} from 'react';
import {useSelector} from 'react-redux';
import {selectIsCartOpen} from '../../../store/cart/cart.selector';
import {selectCurrentUser} from '../../../store/user/user.selector';
import {Outlet, Link} from 'react-router-dom';
import CartIcon from '../../cart-icon/cart-icon.component';
import CartDropdown from '../../cart-dropdown/cart-dropdown.component';
import {signOutUser} from '../../../utils/firebase.utils';
import {ReactComponent as CrwnLogo} from '../../../assets/crown.svg';
import './navigation.styles.scss';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              Sign Out
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              Sign In
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen ? <CartDropdown /> : null}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
