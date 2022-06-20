import React from "react";
import useSWR from "swr";
import { Link, Outlet } from "react-router-dom";
import fetcher from "../models/fetcher";
import Profile from "./Profile";

export default function Navigation() {
    const { data, error } = useSWR('http://127.0.0.1:4000/channel', fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return (
        <>
            <nav className="navigation">
                <Link to="/">
                    <div className="navigation__server-header header">
                        <h1 className="navigation__server-heading heading heading--1">Server</h1>
                    </div>
                </Link>
                <div className="navigation__channels-categories categories">
                    {data.data.map((category) => (
                        <div className="navigation__channel-category category">
                            <h2 className="category__heading heading heading--2">{category.name}</h2>
                            <ul className="list channels category__items items">
                                {category.channels.map((channel) => (
                                    <Link to={'/channel/' + channel.id}>
                                        <li className="channel category__item item">
                                            <img src="../assets/hashtag.svg" alt="hashtag" className="channel__image image"/>
                                            <span className="channel__name item__name">{channel.name}</span>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <Profile />
            </nav>
            <main className="main-window main-channel">                        
                <Outlet />
            </main>
        </>
    )
}