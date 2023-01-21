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
    return response;
}

export default function Favorite(){
    const response=useLoaderData()
    return (
        <>
            <div>
                { response.favorites.map((username)=>{
                    return (
                        <div key={username}>
                            <NavLink to={"/home/favorites/"+username} >{username}</NavLink> <br/>
                        </div>
                    )
                })}
            </div>
            <Outlet/>
        </>
    )
}