import React, { useEffect, useState } from 'react'
import {user} from "../Join/Join";
import socketIo from "socket.io-client";
import "./Chat.css";
import sendLogo from "../../images/send.png";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";
import logo from "../../images/Chat-Buddy-logos_black.png"

let socket;

const ENDPOINT = "https://ss-chatbuddy.herokuapp.com/";

const Chat = () => {

    const [id, setid] = useState("");
    const [messages, setMessages] = useState([])

    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id });
        document.getElementById('chatInput').value = "";
    }

    console.log(messages);
    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            alert('Connected');
            setid(socket.id);

        })
        console.log(socket);
        socket.emit('joined', { user })

        socket.on('welcome', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })

        socket.on('userJoined', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })

        socket.on('leave', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message)
        })

        return () => {
            socket.emit('disconnectp');
            socket.off();
        }
    }, [])

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message, data.id);
        })
        return () => {
            socket.off();
        }
    }, [messages])


  return (
    <div className='chatPage'>
        <div><h3>Developed By: Shivanshu Singh</h3></div>
        <div className='chatContainer'>
            <div className='header'>
                <img src={logo} alt='logo' />
                <p>A Free Web based Chatting Application, based on React.js, Sockets.IO, express</p>
                <a href="/"> <img src={closeIcon} alt="Close" /></a>
            </div>

            <div className='chatBox'>
                <ReactScrollToBottom className="chatBox2">
                    {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
                </ReactScrollToBottom>
            </div>

            <div className='inputBox'>
                <input type="text" id="chatInput" />
                <button onClick={send} className='sendbtn'> <img src={sendLogo} alt="Send" /> </button>
            </div>
        </div>
    </div>
  )
}

export default Chat
