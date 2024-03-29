import React, { useRef, useState } from 'react';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {useAuthState, useSignInWithGoogle} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyB1wvhl2EKppjhHo0BXXdcC447wGmCuUxg",
  authDomain: "superchat-70ae6.firebaseapp.com",
  projectId: "superchat-70ae6",
  storageBucket: "superchat-70ae6.appspot.com",
  messagingSenderId: "137839803843",
  appId: "1:137839803843:web:0cba6a59fe7775e65ad176",
  measurementId: "G-Y390F0RR43"
})
const auth = firebase.auth();
const firestore = firebase.firestore();
function App() {
  const [user]=useAuthState(auth)
  return (
<div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}
function SignIn(){
  const useSignInWithGoogle=()=>{
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
    }
  return(<button className="sign-in" onClick={useSignInWithGoogle}>Sign In</button>)
}
function SignOut(){
  return auth.currentUser && (
    <button className='sign-out' onClick={()=> auth.SignOut()}>Sign Out</button>
  )
}
function ChatRoom(){
   const dummy = useRef();
  const messagesRef=firestore.collection('messages')
  const query =messagesRef.orderBy('createdAt')
  const[messages] =useCollectionData(query,{idField:'id'});
  
  const [formValue, setFormValue] = useState('');
  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }
  return (<fragment>
  <main>
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </fragment>)
}
function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div>
  </>)
}
export default App;
