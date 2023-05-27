import axios from "axios"
import { useLoaderData, NavLink } from "react-router-dom";
import { useState } from "react";
import { Confirm,Alert } from "./customAlertConfirm";
const access_token=window.localStorage.getItem('access_token')
export async function loader(){
    var result;
    const apiUrl='http://localhost:3500/home/purchases'
    const response=await axios.get(apiUrl,{
        headers:{
        "Authorization":"Bearer " + access_token
        }
    })
    result=response.data
    console.log(result)
    return result;
}

export default function Purchases(){
    const orderData=useLoaderData()
    const [isDelivered,setIsDelivered]=useState(orderData.delivered);
    const refundAsked=orderData.refund;
    return(
        <div>
            {orderData.map((item)=>{
                return (
                    <div key={item.retailerUserName+item.barcode+item.date}>
                        <div>
                            <NavLink to={`/home/${item.retailerUserName}/${item.barcode}`} >Brand: {item.ItemName} </NavLink>
                            <p>Quantity :{item.Quantity}</p>
                            <p>Delivery fee : {item.DeliveryFee}</p>
                            <p>refund amount :{item.UnitPrice*item.Quantity}</p>
                        </div>
                      
                        <div>
                            <p>Total : {item.TotalAmount}</p>
                            <p>ordered on :{item.date}</p>
                            {!isDelivered && <input type="checkbox" value={isDelivered} />}
                            <span>Accept product</span>
                            {!refundAsked && <button>Ask Refund</button> }
                        </div>
                    </div>
                )})}
        </div>
    )
}

function handleDelivery(){
    return 0
}