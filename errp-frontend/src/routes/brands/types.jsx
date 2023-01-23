import { useLoaderData, Outlet,NavLink} from "react-router-dom"
import axios from "axios"
const access_token=window.localStorage.getItem("access_token")
export async function loader({params}){
    const apiUrl=`http://localhost:3500/home/products/brands/${params.type}`
    const res= await axios.get(apiUrl,{
        headers:{
            "Authorization":"Bearer "+ access_token
        }
    })
    const response=res.data
    console.log(response)
    console.log("brands loader is being called")
    return response
}

export default function Catergory(){
    const response=useLoaderData()
    return (
        <div>
            
        </div>
    )
}