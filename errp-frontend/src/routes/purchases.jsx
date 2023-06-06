import axios from "axios"
import { useLoaderData, NavLink } from "react-router-dom";
import { useState } from "react";
import AlertDialog from './customAlertConfirm'
import { Alert,AlertTitle } from "@mui/material";
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
    const data=useLoaderData()
    const [orderData,setOrderData]=useState(data)
    const acceptProductTitle='Did you get the ordered product?'
    const acceptProductContent="click agree if the ordered electronic product reached you to confirm that the retailer delivered the product properly and you are satisfied with it"
    const refundTitle="Do you want to ask refund? "
    const refundContent="Click agree if the product reached you and you want to ask for a refund ?"
    const [open, setOpen] =useState(false);
    const [openR,setOpenR]=useState(false)
    const [id,setId] = useState(null)
    const handleClickOpen = (id) => {
        setOpen(true);
        setId(id)
    };
    const handleClickOpenR = (id) => {
        setOpenR(true);
        setId(id)
    };
    const handleDisAgree = () => {
        setId(null)
        setOpen(false);
        setOpenR(false)
    };
    const handleAccept =async() => {
        const apiUrl=`http://localhost:3500/order/acceptProduct`
        const res = await axios.put(apiUrl,{id:id},{
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
          })
        setOrderData(orderData.map((item)=>{
            if(item._id==id){
             return {...item, delivered:true}}
            return item
        }))
        setOpen(false);
    };
    const handleRefund=async()=>{
        const apiUrl=`http://localhost:3500/order/refundProduct`
        const res = await axios.put(apiUrl,{id:id},{
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
          })
        setOrderData(orderData.map((item)=>{
            if(item._id==id){
             return {...item, delivered:true,refund:true}}
            return item
        }))
        setOpenR(false)
    }
    return(
        <div className="purchases">
            {orderData.map((item)=>{
                return (
                    <div className="singlePurchaseContainer"  key={item._id} >
                        {item.delivered &&item.refund===false && <Alert severity="success">
                                <AlertTitle>Success</AlertTitle>
                                Product is successfully delivered to you
                            </Alert> }
                        {item.delivered &&item.refund===true && <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            you asked refund and wait for 2 days
                        </Alert> }
                        <div className="singlePurchase">
                            <div className="purchaseInfo">
                                <NavLink to={`/home/${item.retailerUserName}/${item.barcode}`} style={{color:"var(--bl)"}}> <h5>{item.ItemName} </h5></NavLink>
                                <p>Quantity :{item.Quantity}</p>
                                <p>Delivery fee : {item.DeliveryFee}</p>
                            </div>
                            <div >
                            <p>refund amount :{item.UnitPrice*item.Quantity}</p>
                                <p>Total : {item.TotalAmount} ETB</p>
                                <p>ordered on : {formatDate(item.date)}</p>
                            </div>
                        </div>
                        <div className="purchaseAction">
                            {!item.delivered &&<> <button className="accept" onClick={()=>handleClickOpen(item._id)}>AcceptProduct</button> <button className="refund" onClick={()=>handleClickOpenR(item._id)}>Ask Refund</button></> }
                        </div>
                    </div>
                )})}
            <AlertDialog open={open} handleAgree={handleAccept} handleDisAgree={handleDisAgree} title={acceptProductTitle} content={acceptProductContent}/>
            <AlertDialog open={openR} handleAgree={handleRefund} handleDisAgree={handleDisAgree} title={refundTitle} content={refundContent}/>
        </div>
    )
}
export function formatDate(today){
    today=new Date(today)
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = dd + '/' + mm + '/' + yyyy;
    return formattedToday
}