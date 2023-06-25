import { useLoaderData,NavLink } from "react-router-dom";
import axios from "axios";
import {IoArrowForward} from 'react-icons/io5'
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
            <div className="cart" key={`${save.barcode}${save.retailer}`}>
            <NavLink to={`/home/${save.retailer}/${save.barcode}`}  className="eachDetail">
              <div>
                <img src={`http://localhost:3500/${save.retailerImg}`} alt="profilePic" className="profileImg"/>
                <p className="storeName"> {save.firstname} {save.lastname} </p>
                <img src={`http://localhost:3500/products/${save.productImg[0]}`} alt="productImg" className="productImg"/>
                <p className="productName">{save.brandname}</p>
              </div>
            </NavLink>
            <NavLink to={`/home/${save.retailer}/${save.barcode}/checkout`} className="buyItNow">Order now <IoArrowForward /></NavLink>
            </div>
            )
          })
        }
        </>
    )
}
