import React, { useState } from "react"
import { useParams } from "react-router-dom";
import { userId } from "../store/user";

export interface IProps {
    action: () => void,
}

export default function InputMessage( props: IProps ) {
    const { id } = useParams();

    const [ message, setMessage ] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`${import.meta.env.VITE_APP}message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-User': userId
            },  
            body: JSON.stringify( {
                'channelId': id,
                'content': message
            }),
        });
        setMessage("");
        props.action();
    }

    return (
        <div className="chat-input">
            <form onSubmit={handleSubmit} className="chat-input__form">
                <input 
                    type="text"
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