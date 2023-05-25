import s from "./Chat.module.css";
import { useEffect, useState } from "react";
import { socket } from "../utils/socket";
import debug from "../debugManager/DebugManager";

const Chat = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);

    const sendMsg = (event) => {
        event.preventDefault();
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

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, []);

    return(
        <>
            <ul className={s.messages}></ul>
            <form className={s.chat} action="">
                <input className={s.chat__input} autoComplete="off" />
                <button onClick={sendMsg}>Send</button>
            </form>
        </>
    )
}

export default Chat;