import React, { useState } from "react";
import useSWR from "swr";
import fetcher from "../models/fetcher";
import { userId } from "../store/user";

export default function MyAccountPage() {
    const [canEdit, setCanEdit] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:4000/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( {
                'id': userId,
                'name': name,
                'email': email,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Succes:', data);
        })
        .catch((error) => {
            console.error('Error', error);
        })
        setName("");
        setEmail("");
    }

    const {data, error } = useSWR('http://127.0.0.1:4000/user/' + userId, fetcher)
    
    if (error) return <div>failed to load </div>
    if (!data) return <div>loading...</div>
    
    return (
        <>
            <h1 className="main-settings__heading heading heading--1">My Account</h1>
            <div className="main-settings__content">
                <div className="profile-editor">
                    <div className="profile-editor__banner"></div>
                    <div className="profile-editor__controls">
                        <div className="profile-editor__profile profile-info">
                            <div className="profile-editor__profile-picture profile-picture">
                                <img 
                                    src={data.data.picture || "../assets/default-profile.png"}
                                    alt="profile picture"
                                    className="profile-editor__pfp-image profile-picture__image img"
                                />
                            </div>
                            <div className="profile-info__account-info">
                                <h2 className="profile-info__name heading heading--2">{data.data.name}</h2>
                                <span className="profile-info__slug">slug</span>
                            </div>
                            <button 
                                className="profile-info__allow-edit button"
                                onClick={() => setCanEdit(!canEdit)}
                            >
                                Edit profile
                            </button>
                        </div>

                        <form className="profile-editor__form" onSubmit={handleSubmit}>
                            <label className="profile-editor__label label" htmlFor="username">
                                Username
                            </label>
                            <input
                                type="text"
                                className="profile-editor__input"
                                name="username"
                                id="username"
                                placeholder="Current username: X"
                                value={name}
                                disabled={canEdit}
                                onChange={e => setName(e.target.value)}
                            />

                            <label className="profile-editor__label label" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                className="profile-editor__input"
                                name="email"
                                id="email"
                                placeholder="Current email: X"
                                value={email}
                                disabled={canEdit}
                                onChange={e => setEmail(e.target.value)}
                            />

                            <input
                                type="submit"
                                className={`profile-editor__submit ${canEdit ? "profile-editor__submit--disabled" : ""} button`}
                                value="Change profile info"
                                disabled={canEdit}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}