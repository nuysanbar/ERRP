import { useLoaderData,NavLink} from "react-router-dom"
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
    const displayStores=()=>{
        const stores=[]
        for(let i=0; i<response.retailersProducts.length; i++){
            const container= <div key={`${response.retailersProducts[i].retailerUserName}${response.retailersProducts[i].barcode}`}>
                <NavLink to={`/home/brands/${response.product.type}/${response.product.brand}/${response.product.barcode}/${response.retailers[i].username}`}>
                    <div>
                        <img src={`http://localhost:3500/products/${response.product.imgUrl[0]}`} alt={response.product.imgUrl[0]} />
                        <p>{response.product.brandName}</p>
                        <p>{response.retailersProducts[i].price}</p>
                        <p>{response.retailersProducts[i].likedCount}</p>
                        <p>{response.retailersProducts[i].disLikedCount}</p>
                    </div> 
                    <div>
                         <img src={`http://localhost:3500/${response.retailers[i].imgUrl}`} alt={response.retailers[i].username} />
                        <p>{response.retailers[i].username}</p>
                        <p>{response.retailers[i].favoredNumber}</p>
                    </div>
                </NavLink> 
            </div> 
            stores.push(container)
        }
        return stores
    }
    return (
        <div>
            {response && displayStores()}
        </div>
    )
}