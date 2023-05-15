import { useLoaderData,NavLink } from "react-router-dom";
import axios from "axios";

export async function loader(){
    const access_token=window.localStorage.getItem('access_token');
    const apiUrl=`http://localhost:3500/home/products`
    const res = await axios.get(apiUrl,{
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      })
    const response=res.data
    console.log(response)
    return response;
}

export default function ProductsList(){
  const response=useLoaderData()
  const displayProducts=()=>{
      const row=[]
      for(let i=0; i<response.products.length; i++){
          let container=<NavLink to={`/home/products/${response.products[i].barcode}`} key={i} className="myStoreProduct">
              <img src={`http://localhost:3500/products/${response.productInfo[i].imgUrl[0]}`} alt={response.productInfo[i].brandName} />
              <p >{response.productInfo[i].brandName}</p>
          </NavLink>
          row.push(container)
      }
      return row;
  }
    return(
        <div className="myStore">{response && displayProducts()} </div>
    )
}

