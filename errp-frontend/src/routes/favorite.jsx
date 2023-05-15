import { useLoaderData,NavLink,Outlet } from "react-router-dom";
import axios from "axios"
export async function loader({params}){
    const access_token=window.localStorage.getItem("access_token")
    const apiUrl=`http://localhost:3500/home/favorites`
    const res=await axios.get(apiUrl,{
        headers:{
            'Authorization':"Bearer "+access_token
        }
    })
    const response=res.data
    console.log(response)
    console.log("response")
    return response;
}

export default function Favorite(){
    const response=useLoaderData()
    return (
        <div className="favoriteContainer">
            <div className="favorites">
                { response && response.map((favored)=>{
                    return (
                    <NavLink to={`/home/favorites/${favored.username}`} key={favored.username} className={({ isActive, isPending }) =>
                    isActive
                      ? "singleFavorites active"
                      : isPending
                      ? "singleFavorites pending"
                      : "singleFavorites"
                  }>
                        <img src={`http://localhost:3500/${favored.imgUrl}`} alt="profileImg" />
                        <p >{favored.name}</p>
                     </NavLink>
                    )
                })}
            </div>
            <div className="favoritesDetail">
                <Outlet/>
            </div>
        </div>
    )
}