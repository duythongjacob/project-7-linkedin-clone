import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HeaderOption from './HeaderOption';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {auth} from './firebase'
import './Header.css'
import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { logout} from './features/userSlice';

function Header() {   

  const dispatch = useDispatch()
  const logoutOfApp = () => {
    dispatch(logout())
    signOut(auth).then(() => {
      console.log('success !!!');
    }).catch((error) => {
     console.log(error);
    });
  } 
  return (
    
    <div className='header'>
 
        <div className="header__left">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg" alt="" />
            <div className="header__search">
                {/* searchIcon */}
                <SearchIcon/>
                <input type="text" />
                
            </div>
        </div>
        <div className="header__right">
                <HeaderOption Icon={HomeIcon} title="Home"/>
                <HeaderOption Icon={SupervisorAccountIcon} title="My NetWork"/>
                <HeaderOption Icon={BusinessCenterIcon} title="Jobs"/>
                <HeaderOption Icon={ChatIcon} title="Messaging"/>
                <HeaderOption avatar={true} title="me" onClick={logoutOfApp}/>

        </div>

    </div>
     )
    
  }
export default Header