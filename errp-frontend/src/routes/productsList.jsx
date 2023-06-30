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
      const apiUrlProduct2=`http://localhost:3500/home/pendingProducts`
      const res2=await axios.get(apiUrlProduct2,{
          headers:{
              "Authorization":'Bearer '+access_token
          }
      })
    const response=res.data
    const response2=res2.data
    console.log(response,response2)
    return {response,response2};
}

export default function ProductsList(){
  const {response,response2}=useLoaderData()
  const displayProducts=()=>{
      const row=[]
      for(let i=0; i<response2.length; i++){
        let container1=<div style={{display:"inline-block"}} className="myStoreProduct" key={response2[i].barcode}>
                          <img src={`http://localhost:3500/products/${response2[i].imgUrl[0]}`} alt="product image"/>
                          <p style={{color:"red"}}>Pending...</p>
                      </div> 
        row.push(container1)
      }
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
      <div>
        <div className="myStore">{response && displayProducts()} </div>
      </div>
        
    )
}

