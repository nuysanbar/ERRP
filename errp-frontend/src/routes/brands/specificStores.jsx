import { useLoaderData,NavLink} from "react-router-dom"
import Store from "./store"
import axios from "axios"
const access_token=window.localStorage.getItem("access_token")
export async function loader({params}){
    const apiUrl=`http://localhost:3500/home/products/brands/${params.type}/${params.brand}/${params.barcode}`
    const res= await axios.get(apiUrl,{
        headers:{
            "Authorization":"Bearer "+ access_token
        }
    })
    const response=res.data
    console.log(response)
    console.log("specific store loader is being called")
    return response
}
export default function SpecificStore(){
    const response=useLoaderData()
    const product=response.product
    const retailers=response.retailers
    return (
        <div>
            <div>
                {product.imgUrl.map((item)=>{
                    return (
                        <img src={`http://localhost:3500/products/${item}`} alt={item} key={item}/>
                    )
                })}
                 <p>{product.brandName}</p>
                 <p>{product.details}</p>
            </div>
            {retailers.map((item)=>{
                return ( <Store retailer={item} barcode={product.barcode} key={item.storeName} />)
            })}
        </div>
    )
}