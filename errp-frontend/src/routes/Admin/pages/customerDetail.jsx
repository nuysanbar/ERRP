import { useLoaderData,NavLink,Outlet } from "react-router-dom";

export default function CustomerDetail(){
    const response=useLoaderData()
    return (
        <>
        <div className="favoriteContainer">
            <div className="favorites">
                    <NavLink to={`/admin/customers/${response.username}`} className={({ isActive, isPending }) =>
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