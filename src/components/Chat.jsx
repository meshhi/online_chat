import { useEffect, useState } from "react";

const Chat = () => {
    const [messages, setMessages] = useState(['first', 'second']);

    const socket = new WebSocket('ws://127.0.0.1:8080');

    socket.addEventListener("message", (event) => {
        console.log("Message from server ", event.data);
        setMessages([...messages, event.data]);
    });

    const addMessage = (event) => {
        socket.send('some test data');
    }

    return(
        <>
            {
                messages.map(message => <div key={message}>{message}</div>)
            }
            <button onClick={addMessage}>Send message</button>
        </>
    )
}

export default Chat;