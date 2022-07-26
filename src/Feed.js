import React, {useState,useEffect} from 'react'
import './Feed.css'
import CreateIcon from '@mui/icons-material/Create';
import InputOption from './InputOption';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import Post from './Post';
import {  collection,addDoc,doc,onSnapshot, serverTimestamp, deleteDoc, setDoc, query, where, getDocs, orderBy, updateDoc} from 'firebase/firestore';
import  {db} from './firebase'
import { selectUser } from './features/userSlice';
import {useSelector} from 'react-redux'
import FlipMove from 'react-flip-move';

function Feed() {
  const user = useSelector(selectUser)
  const [posts , setPosts] = useState([])
  const [input, setInput] = useState('')
  console.log(input);
  console.log(posts);
  // console.log(" 🎸", input )
  //get data
  useEffect(() => {
    const collectionRef = collection( db, 'posts')
    const queryOrder= orderBy('timestamp', 'desc')
    const q =  query(collectionRef, queryOrder)
    onSnapshot( q, (snapshot) => {
      setPosts(snapshot.docs.map((doc)=>({
        id: doc.id,
        data: doc.data()
      }
    )))
    })
  }, []);
  //add data
  const handleAdd = async() =>{
    try {

      // setDoc(docRef,payload) --> set
      // addDoc(collectionRef,playload)
      const collectionRef = collection(db, "posts")
      const playload = {
       name: user.displayName,
       description:  user.email,
       message: input,
       photo: user.photoUrl || "",
       timestamp: serverTimestamp()
        
      }   
      const docRef = await addDoc(collectionRef, playload)
      
      console.log("Document written with ID: ", docRef.id);
   
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }    

  const sendPost = (e) => {
    e.preventDefault()
    console.log("👾", "im wroking!!!" )
    console.log(posts);
    handleAdd()
    setInput('')
  }
  
  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon/>
          <form >
             <input value={input} onChange={event => setInput(event.target.value)} />
             <button onClick={sendPost}  >Send</button>
          </form>
        </div>
        <div className="feed__inputOptions">
            <InputOption Icon={ImageIcon} title='Photo' color="#70b5f9"/>
            <InputOption Icon={SubscriptionsIcon} title='Video' color="#E7A33E"/>
            <InputOption Icon={EventNoteIcon} title='Event' color="#C0CBCD"/>
            <InputOption Icon={CalendarViewDayIcon} title='Write article' color="#7FC15E"/>
        </div>
      </div>
     
      <FlipMove>
      {
      posts.map(({id, data: {name, description, message, photoUrl}}) => (
      
        <Post key={id} name={name} description={description} message={message} photoUrl={photoUrl}/>
      ))
    }
      </FlipMove>

    
    </div>
  )
}

export default Feed