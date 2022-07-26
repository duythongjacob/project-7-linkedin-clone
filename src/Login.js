import React, {useState} from 'react'
import './Login.css'
import {auth} from './firebase'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';

import { login } from './features/userSlice';
function Login() {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [name, setName] = useState('')
const [profilePic, setProfilePic] = useState('')
const dispatch = useDispatch()
    const loginToApp = (e) =>{
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then(userAuth=>{
            dispatch(login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                photoUrL: userAuth.user.photoURL
            }))
        }).catch(error => alert(error.message))
    }
    const register = () => {
        if (!name) {
            return alert("please enter a full name!")
        }
        createUserWithEmailAndPassword( auth, email, password)
        .then((userAuth)=> {
            updateProfile ( userAuth.user,{
                displayName: name,
                photoUrL: profilePic,
            }).then(()=>{
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: name,
                    photoUrL: profilePic
                }))
            
         })
         })
         .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage || errorCode )
            // ..
          })
        }
  return (
    <div className="login">
     <img src="https://upload.wikimedia.org/wikipedia/commons/archive/0/01/20210504194945%21LinkedIn_Logo.svg" alt=""  />
     <form>
        <input value={name}  onChange={e=>setName(e.target.value)} placeholder='Full name (required if registering)' type={'text'}/>
        <input value={profilePic} onChange = { e => setProfilePic(e.target.value)} placeholder='Profile pic URL (optional)' type="text" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' type="email" />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' type="password" />
        <button type='submit' onClick={loginToApp}> Sign In</button>
     </form>
     <p>
        Not a member ?
        <span className='login__register' onClick={register}> Register Now</span>
     </p>
    </div>
  )
}

export default Login