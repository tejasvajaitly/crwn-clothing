import {Fragment, useContext} from 'react'

import {Outlet, Link} from 'react-router-dom'

import CartIcon from '../../cart-icon/cart-icon.component'
import CartDropdown from '../../cart-dropdown/cart-dropdown.component'

import {UserContext} from "../../../context/user.context"
import {CartContext} from "../../../context/cart.context"

import { signOutUser } from '../../../utils/firebase.utils'

import {ReactComponent as CrwnLogo} from '../../../assets/crown.svg'

import './navigation.styles.scss'

const Navigation = () => {
  const {currentUser} = useContext(UserContext)
  const {isCartOpen} = useContext(CartContext)

    return (
      <Fragment>
        <div className='navigation'>
          <Link className='logo-container' to='/'>
            <CrwnLogo className='logo' />
          </Link>
          <div className='nav-links-container'>
            {
              currentUser ? 
                <span className='nav-link' onClick={signOutUser}>Sign Out</span>
              :
              <Link className='nav-link' to='/auth'>Sign In</Link>
            }
            <CartIcon/>
          </div>
          {
            isCartOpen ? <CartDropdown/> : null
          }
        </div>
        <Outlet/>
      </Fragment>
    )
}

export default Navigation

