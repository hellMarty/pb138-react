import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../models/fetcher";
import InputMessage from "./InputMessage";
import { Message, IMessageProps } from "./Message";



export default function Channel() {
    let { id } = useParams();

    const { data, error, mutate } = useSWR(`${import.meta.env.VITE_APP}channel/${id}`, fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    const channel = data.data;

    return (
        <>
            <div className="main-channel__header header">
                <img 
                    src="../assets/hashtag.svg"
                    alt="hashtag"
                    className="main-channel__logo"    
                />
                <h1 className="main-channel__heading heading heading--1">{ data.data.name }</h1>
            </div>
            <div className="main-channel__chat chat">
                <div className="chat__start chat-start">
                    <h2 className="chat-start__heading heading heading--2">
                        Welcome to the start of the
                        <img 
                            src="../assets/hashtag.svg"
                            alt="hashtag"
                            className="chat-start__icon image"    
                        />
                        { channel.name } channel
                    </h2>
                </div>
                {data.data.messages.map((message: IMessageProps, index: string) => <Message key={index} {...message} action={mutate} />)}
            </div>

            <InputMessage action={mutate} />
        </>
    )
}