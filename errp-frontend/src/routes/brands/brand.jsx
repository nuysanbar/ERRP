import { useLoaderData, Outlet,NavLink} from "react-router-dom"
import "../../index.css"
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
    return response
}

export default function Brand(){
    const response=useLoaderData()
    return (
        <div className="brandContainer">
            <div className="brand">
            {response && <p className="type">{response.type}</p> }
                {response && response.brand.map((item)=>{
                   return (
                        <NavLink to={`/home/brands/${response.type}/${item}`} key={item} className={({ isActive, isPending }) =>
                            isActive
                            ? "singleBrand active"
                            : isPending
                            ? "singleBrand pending"
                            : "singleBrand"
                        }>
                        <p >{item}</p>
                     </NavLink>
                    )
                })}
            </div>
            <div className="brandDetail">
                <Outlet/>
            </div>
        </div>
    )
}
