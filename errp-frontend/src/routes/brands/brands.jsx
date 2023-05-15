import { useLoaderData,NavLink,Outlet} from "react-router-dom"
import axios from "axios"
const access_token=window.localStorage.getItem("access_token")
export async function loader(){
    const apiUrl='http://localhost:3500/home/products/brands'
    const res= await axios.get(apiUrl,{
        headers:{
            "Authorization":"Bearer "+ access_token
        }
    })
    const response=res.data
    console.log(response)
    return response
}
export default function Brands(){
    const response=useLoaderData()
    return (
        <div>
            <div className="categoryFirstContainer">
            {response && response.map((item)=>{
                return(
                    <div key={item.type} className="categoryFirst">
                        <NavLink to={`/home/brands/${item.type}`}>{item.type}</NavLink> <br />
                    </div>
                )
            })}
            </div>
            <Outlet />
        </div>
    )
}