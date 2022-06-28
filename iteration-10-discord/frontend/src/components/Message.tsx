import React, { useState }  from 'react';
import { formatDistance } from 'date-fns';
import { userId } from '../store/user';
import useSWR from 'swr';
import fetcher from '../models/fetcher';

interface SenderProps {
    name: string,
    picture: string
}

export interface IMessageProps {
    id: string,
    content: string,
    createdAt: string,
    sender: SenderProps,
    action: () => void,
}

export function Message (message: IMessageProps) {
    const [edited, setEdited] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editMessage, setEditMessage] = useState("");

    const {data, error } = useSWR(`${import.meta.env.VITE_APP}user/${userId}`, fetcher)
    
    if (error) return <div>failed to load </div>
    if (!data) return <div>loading...</div>

    async function handleSubmit(e) {
        e.preventDefault();
        await fetch(`${import.meta.env.VITE_APP}message/${message.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-User': userId,
            },
            body: JSON.stringify({
                "content": editMessage
            }),
        });
        setShowEdit(false);
        setEdited(true);
        message.action();
    }

    async function deleteMessage(messageId: string) {
        await fetch(`${import.meta.env.VITE_APP}message/${messageId}`, {
            method: 'DELETE',
            headers: {
                'X-User': userId
            },
        });
        message.action();
    }

    return (
        <div className="chat__message message">
            <div className="message__profile-picture profile-picture">
                <img 
                    src={message.sender.picture} 
                    className="profile-picture__image image"
                    alt="Sender profile picture"    
                />
            </div>
            <div className="message__sent-by">
                <h2 className="message__sender-name heading heading--2">{message.sender.name}</h2>
                <span className="message__sent-at">{formatDistance(new Date(message.createdAt), new Date())}</span>
            </div>
            <div className="message__content">
                {message.content}
                {edited && <span className="message__edited">(edited)</span>}
            </div>
            {message.sender.name === data.data.name &&
                <div className="message__controls controls">
                    <button className="controls__control" onClick={() => setShowEdit(!showEdit)}>
                        <img 
                            src="../assets/edit.svg"
                            alt="edit button"
                            className="controls__icon"
                        />
                    </button>
                    <button className="controls__control" onClick={() => deleteMessage(message.id)}>
                        <img 
                            src="../assets/delete.svg"
                            alt="delete button"
                            className="controls__icon"
                        />
                    </button>
                </div>
            }
            {showEdit && 
                <div className="message-edit">
                    <form onSubmit={(e) => handleSubmit(e)} className="message-edit__form">
                        <input
                            type="text"
                            placeholder="Add the content of the message to the input here"
                            className="message-edit__text-input"
                            onChange={(e) => setEditMessage(e.target.value)}
                        />
                        <input
                            type="submit"
                            value="Edit message"
                            className="message-edit__send button"
                        />
                    </form>
                </div>
            }
        </div>
    )
}