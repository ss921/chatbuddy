import React, { useState } from 'react'
import "./Join.css";
import logo from "../../images/Chat-Buddy-logos_black.png"
import { Link } from 'react-router-dom';

let user;

const sendUser = () =>{
  user = document.getElementById("JoinName").value;
  document.getElementById("JoinName").value = "";
}

const Join = () => {

  const [name, setname] = useState("");

  return (

    <div className='JoinPage'>
      <div className='JoinContainer'>
        <img src={logo} alt='logo' />
        <h3>Real Time [L!VE] Chatting Web App</h3>
        <h4>Developed By: Shivanshu Singh</h4>

        <input onChange={(e)=>setname(e.target.value)} placeholder='Enter Your Name...' type={'text'} id="JoinName" />

        <Link onClick={(event) => !name ? event.preventDefault() : null} to={"/Chat"}>
          <button onClick={sendUser} className='Joinbtn'>Login</button>
        </Link>
      </div>
    </div>
  )
}

export default Join
export {user}

