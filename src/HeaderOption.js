import React from 'react'
import { Avatar } from '@mui/material';
import './HeaderOption.css'
import { selectUser } from './features/userSlice';
import { useSelector } from 'react-redux';
function HeaderOption({Icon, title, avatar, onClick}) {
  const user = useSelector(selectUser)
  return (
        <div onClick={onClick} className="headerOption">
                {Icon && <Icon  className='headerOption__icon'/>}
                {avatar && <Avatar className='headerOption__icon' src={user?.photoUrl}>{user?.email[0]}</Avatar>  }
                <h3 className='headerOption__title'>{title}</h3>
        </div>
  )
}

export default HeaderOption