import {Fragment, useContext} from 'react'

import {Outlet, Link} from 'react-router-dom'

import {UserContext} from "../../../context/user.context"

import { signOutUser } from '../../../utils/firebase.utils'

import {ReactComponent as CrwnLogo} from '../../../assets/crown.svg'

import './navigation.styles.scss'

const Navigation = () => {
  const {currentUser} = useContext(UserContext)

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
          </div>
        </div>
        <Outlet/>
      </Fragment>
    )
}

export default Navigation

