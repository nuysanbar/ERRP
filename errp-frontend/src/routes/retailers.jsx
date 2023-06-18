import { useLoaderData } from "react-router-dom"
import axios from "axios"
const access_token=window.localStorage.getItem("access_token")
export async function loader({request}){
    const url = new URL(request.url);
    console.log(url.search)
    const apiUrl = `http://localhost:3500/home/searchRetailers${url.search}`
    const res = await axios.get(apiUrl,{
        headers:{
            "Authorization":'Bearer ' + access_token
        }
    })
    console.log("retailer search loader being called")
    console.log(res.data)
    return res.data;
}
export default function Retailers(){
    // const data= useLoaderData()
    return(
        <div>
            retailers
        </div>
    )
}