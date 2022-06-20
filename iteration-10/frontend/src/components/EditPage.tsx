import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function EditPage() {
    return (
        <>
            <nav className="navigation">
                <div className="navigation__setting-categories categories">
                    <div className="navigation__setting-category category">
                        <h2 className="category__heading heading heading--2">User setting</h2>
                        <ul className="list category__items items">
                            <Link to="/edit-page/my-account">
                                <li className="setting category__item category__item--selected item">
                                    <span className="item__name">My Account</span>
                                </li>
                            </Link>
                            <Link to="/edit-page/empty">
                                <li className="setting category__item item">
                                    <span className="item__name">User Profile</span>
                                </li>
                            </Link>
                            <Link to="/edit-page/empty">
                                <li className="setting category__item item">
                                    <span className="item__name">Privacy &amp; Safety</span>
                                </li>
                            </Link>
                        </ul>
                    </div>

                </div>
                <Link to="/" className="navigation__profile profile link">
                <div className="navigation__profile-picture">
                        <img 
                            src="../assets/back-arrow.png"
                            className="image" 
                            alt="back arrow"/>
                    </div>
                    <div className="profile__info">
                        <div className="profile__name">Back to server</div>
                    </div>
                </Link>
            
            </nav>
            <main className="main-window main-settings">
                <Outlet />
            </main>
        </>
    )
}