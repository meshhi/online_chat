import s from "./Chat.module.css";
import { useEffect, useState, useRef } from "react";
import { socket } from "../utils/socket";
import debug from "../debugManager/DebugManager";

const Chat = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [chatMsg, setChatMsg] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMsg = (event) => {
        event.preventDefault();
        socket.emit("chat message", chatMsg);
    };

    useEffect(() => {
        function onConnect() {
            debug.log('client socket connected!');
            setIsConnected(true);
        }
    
        function onDisconnect() {
            debug.log('client socket disconnected!');
            setIsConnected(false);
        }

        function onMessage(data) {
            debug.log(`get message from backend: ${data}`);
            setMessages([...messages, data]);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('chat message', onMessage);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, []);

    return(
        <>
            <ul className={s.messages}>
                {messages.map((message) => <li>{message}</li>)}
            </ul>
            <form className={s.chat} action="">
                <input className={s.chat__input} autoComplete="off" onChange={(event) => {
                    setChatMsg(event.target.value);
                }}/>
                <button onClick={sendMsg}>Send</button>
            </form>
        </>
    )
}

export default Chat;