import { useLoaderData,NavLink,Outlet} from "react-router-dom";
import axios from "axios"

export default function PendingProductsDetail(){
    const response=useLoaderData()
    return (
        <div>
        <div className="favoriteContainer">
            <div className="favorites">
                    <NavLink to={`/admin/pendingProducts/${response.barcode}`} className={({ isActive, isPending }) =>
                            isActive
                            ? "singleFavorites active"
                            : isPending
                            ? "singleFavorites pending"
                            : "singleFavorites"
                        }>
                                <img style={{width:"30px",height:"30px",paddingTop:"15px",borderRadius:"30px"}} src={`data:image/png;base64,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`} alt="license" />
                        <p >status</p>
                    </NavLink>
            </div>
            <div className="favoritesDetail">
                <Outlet/>
            </div>
        </div>
</div>)
}
export async function loader({params}){
    const access_token=window.localStorage.getItem("access_token")
    const apiUrl=`http://localhost:3500/admin2/pendingProducts/${params.id}`
    const res=await axios.get(apiUrl,{
        headers:{
            'Authorization':"Bearer "+access_token
        }
    })
    const response=res.data
    console.log(response)
    return response;
}
