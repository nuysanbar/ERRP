import { useLoaderData,NavLink } from "react-router-dom"
import axios from "axios"
export async function loader({params}){
    const access_token=window.localStorage.getItem('access_token');
    const apiUrlProduct=`http://localhost:3500/users/${params.username}/products`
    const res2=await axios.get(apiUrlProduct,{
        headers:{
            "Authorization":'Bearer '+access_token
        }
    })
    var response2=res2.data
    console.log(response2);
    return response2
}

export default function LandingPageProducts({customPath}){
    const response2=useLoaderData()
    const displayProducts=()=>{
        const row=[]
        for(let i=0; i<response2.products.length; i++){
            let container=<NavLink to={`/home/${customPath}${response2.products[i].retailerUserName}/${response2.products[i].barcode}`} key={i}>
                <img src={`http://localhost:3500/products/${response2.productInfo[i].imgUrl[0]}`} alt={response2.productInfo[i].brandName} />
                <p className="price">{response2.products[i].price} ETB</p>
                <p className="brandName">{response2.productInfo[i].brandName}</p>
            </NavLink>
            row.push(container)
        }
        return row;
    }
    return (
        <div className="personalProducts">
            {displayProducts()} 
        </div>
             
            
    )
}