import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Channel from "./components/Channel";
import EditPage from "./components/EditPage";
import EmptyPage from "./components/EmptyPage";
import MyAccountPage from "./components/MyAccountPage";
import Navigation from "./components/Navigation";


export default function App() {
    return (
        <body className="app">           
            <Routes>
                <Route path="/" element={<Navigation />}>
                    <Route path="/channel/:id" element={<Channel />} />
                    <Route path="*" />
                </Route>
                <Route path="/edit-page" element={<EditPage />}>
                    <Route path="/edit-page/my-account" element={<MyAccountPage />} />
                    <Route path="/edit-page/empty" element={<EmptyPage />} />
                </Route>
            </Routes>
        </body>
    )
}
