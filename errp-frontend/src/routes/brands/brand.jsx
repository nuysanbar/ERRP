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
export async function singleTypeLoader({params}){
    const apiUrl=`http://localhost:3500/home/products/brands/${params.type}/products`
    const res= await axios.get(apiUrl,{
        headers:{
            "Authorization":"Bearer "+ access_token
        }
    })
    const response=res.data
    console.log(response)
    console.log("specific brands loader is being called")
    return response
}

export default function Brand(){
    const response=useLoaderData()
    return (
        <div>
            {response && <h4>{response.type}</h4> }
            {response && response.brand.map((item)=>{
                return (
                    <div key={item}>
                        <NavLink to={`/home/brands/${response.type}/${item}`}>{item}</NavLink> <br />
                    </div>
                )
            })}
            <Outlet/>
        </div>
    )
}
