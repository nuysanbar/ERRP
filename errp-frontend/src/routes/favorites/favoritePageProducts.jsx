import { useLoaderData,NavLink } from "react-router-dom"
import axios from "axios"


export default function FavoritePageProducts(){
    const response2=useLoaderData()
    const displayProducts=()=>{
        const row=[]
        for(let i=0; i<response2.products.length; i++){
            let container=<NavLink to={`/home/favorites/${response2.products[i].retailerUserName}/${response2.products[i].barcode}`} key={i}>
                <p >{response2.products[i].price}</p>
                <p >{response2.products[i].barcode}</p>
                <p >{response2.productInfo[i].brandName}</p>
                <img src={`http://localhost:3500/products/${response2.productInfo[i].imgUrl}`} alt={response2.productInfo[i].brandName} />
            </NavLink>
            row.push(container)
        }
        return row;
    }
    return (
        <div>
            {displayProducts()} 
        </div>
             
            
    )
}