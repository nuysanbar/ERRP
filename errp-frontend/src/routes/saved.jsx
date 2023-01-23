import { useLoaderData,NavLink } from "react-router-dom";
import axios from "axios";

export async function loader(){
    const access_token=window.localStorage.getItem('access_token');
    const apiUrl=`http://localhost:3500/home/saved`
    const res = await axios.get(apiUrl,{
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      })
    const response=res.data
    console.log(response)
    return response;
}
export default function Saved(){
    const response = useLoaderData()
    return (
        <>
        {response && response.map((save)=>{
            return (
            <NavLink to={`/home/${save.retailer}/${save.barcode}`} key={`${save.barcode}${save.retailer}`}>
              <div>
                <img src={`http://localhost:3500/${save.retailerImg}`} alt="profilePic"/>
                <h4>{save.retailer}</h4>
                <img src={`http://localhost:3500/products/${save.productImg[0]}`} alt="productImg"/>
                <h5>{save.brand}</h5>
              </div>
            </NavLink>
            )
          })
        }
        </>
    )
}