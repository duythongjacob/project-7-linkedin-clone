import React, {useEffect} from 'react';
import { login, logout, selectUser } from './features/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Feed from './Feed';
import Header from './Header'
import Sidebar from './Sidebar';
import Login from './Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Widgets from './Widgets'
function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if(userAuth) {
            //user is logged in 
          dispatch(login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrL: userAuth.photoURL
          }))
      } else {
          //user is logged out
          dispatch(logout())
      }
    })
  }, [dispatch]);
  return (
    <div className="app">
      <Header/>
      {
        !user ? (
          <Login/>
        ) :(
          <div className="app__body">
          <Sidebar />
          <Feed/>
          <Widgets/>
      </div>
        )
      }

    </div>
  );
}

export default App;
