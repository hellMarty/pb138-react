import { Link } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../models/fetcher";
import { userId } from "../store/user";


export default function Profile() {
    const {data, error } = useSWR(`${import.meta.env.VITE_APP}user/${userId}`, fetcher)
    
    if (error) return <div>failed to load </div>
    if (!data) return <div>loading...</div>
    
    return (
        <Link to="/edit-page" className="navigation__profile profile link">
            <div className="navigation__profile-picture profile__picture profile-picture">
                <img 
                    src={data.data.picture || "../assets/default-profile.png"}
                    className="profile-picture__image image" 
                    alt="Profile picture"/>
            </div>
            <div className="profile__info">
                <div className="profile__name">{data.data.name}</div>
                <div className="profile__slug">#slug</div>
            </div>
        </Link>
    )
}