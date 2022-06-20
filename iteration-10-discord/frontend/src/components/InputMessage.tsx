import React, { useState } from "react"
import { useParams } from "react-router-dom";

export default function InputMessage() {
    const { id } = useParams();

    const [ message, setMessage ] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:4000/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-User': '331dcda5-84d0-4f9c-9e49-6ee481ad45f1'
            },
            body: JSON.stringify( {
                'channelId': id,
                'content': message
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Succes:', data);
        })
        .catch((error) => {
            console.error('Error', error);
        })
        setMessage("");
    }

    return (
        <div className="chat-input">
            <form onSubmit={handleSubmit} className="chat-input__form">
                <input 
                    type="text"
                    name=""
                    id=""
                    placeholder="Write message"
                    value={message}
                    className="chat-input__text-input"
                    onChange={e => setMessage(e.target.value)}
                />
                <input 
                    type="submit"
                    value="Send message"
                    className="chat-input__send button"
                />
            </form>
        </div>
    )
}