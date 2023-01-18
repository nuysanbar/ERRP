import { useLoaderData,Outlet,NavLink} from "react-router-dom"
import axios  from "axios";
import { useState } from "react";

export default function FavoritePage(){
    const [userRole,response1]=useLoaderData()
    const username=response1.user.username
    const [isFavorite,setIsFavorite]=useState(response1.isFavored)
    const access_token=window.localStorage.getItem("access_token")
    const handleFavorite =async()=>{
        setIsFavorite(!isFavorite)
        console.log("fav action is being called")
        const apiUrl=`http://localhost:3500/users/${username}/favorite`
        const res=await axios.post(apiUrl,{"username":username},{
            headers: {
            'Authorization': 'Bearer ' + access_token
            }
        })
        return 0;
    }
    return (
        <div>
            <NavLink to={`/home/favorites/${response1.user.username}`}>
            userRole : {userRole} <br />
            username : {response1.user.username} <br />
            <img src={`http://localhost:3500/${response1.user.imgUrl}`} alt="profileImg" />
            </NavLink>
            {userRole==="retailer" && (isFavorite===false?<button onClick={handleFavorite}>Add to favorites</button>:
                    <button onClick={handleFavorite}>remove from favorites</button>)}
            {userRole==="retailer" && <button>rate</button>}
            <Outlet />
        </div>
    )}