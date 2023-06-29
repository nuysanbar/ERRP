import { useLoaderData,NavLink,Outlet } from "react-router-dom";
import axios from "axios"

export default function DelivererDetail(){
    const response=useLoaderData()
    return (
        <>
        <div className="favoriteContainer">
            <div className="favorites">
                    <NavLink to={`/admin/deliverers/${response.username}`} className={({ isActive, isPending }) =>
                            isActive
                            ? "singleFavorites active"
                            : isPending
                            ? "singleFavorites pending"
                            : "singleFavorites"
                        }>
                                <img style={{width:"30px",height:"30px",paddingTop:"15px",borderRadius:"30px"}} src={`https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg`} alt="license" />
                        <p >Profile</p>
                     </NavLink>
            </div>
            <div className="favoritesDetail">
                <Outlet/>
            </div>
        </div>
</>)
}
export async function loader({params}){
    const access_token=window.localStorage.getItem("access_token")
    const apiUrl=`http://localhost:3500/admin2/deliverers/${params.id}`
    const res=await axios.get(apiUrl,{
        headers:{
            'Authorization':"Bearer "+access_token
        }
    })
    const response=res.data
    console.log(response)
    return response;
}
export async function RetailerProductsLoader({params}){
    const access_token=window.localStorage.getItem("access_token")
    const apiUrl=`http://localhost:3500/admin2/retailers/${params.id}/products`
    const res=await axios.get(apiUrl,{
        headers:{
            'Authorization':"Bearer "+access_token
        }
    })
    const response=res.data
    console.log(response)
    return response;
}

