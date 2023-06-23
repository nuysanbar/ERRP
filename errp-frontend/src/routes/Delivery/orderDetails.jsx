import axios from 'axios'
import { useLoaderData, Form,redirect} from "react-router-dom";
import { useState } from "react";
import AlertDialog from '../customAlertConfirm'
import { Alert,AlertTitle } from "@mui/material";
import Button  from '@mui/material/Button';
import {formatDate} from "../purchases";
import Map from "../brands/simpleMap"
const access_token=window.localStorage.getItem('access_token')
export async function loader({params}){
    const apiUrl=`http://localhost:3500/delivery/getOrderDetail/${params.id}`
    const res = await axios.get(apiUrl,{
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      })
    console.log(res.data)
    return res.data
}

export async function action({request,params}){
    const formData = await request.formData();
    const apiUrl=`http://localhost:3500/delivery/sendProve/${params.id}`
    const res=await axios.post(apiUrl,formData,{
        headers:{
            "Authorization":"Bearer "+access_token
        }
    })
    const response=res.data
    console.log(response)
    return redirect(`/delivery/history/${params.id}`);
}


export default function OrderDetails({value}){
    const data=useLoaderData()
    const acceptProductTitle='Are you sure you want to deliver the product?'
    const acceptProductContent="click agree if you really want to handle this delivery process"
    const [open, setOpen] =useState(false);
    var markers=[]
    markers.push({address:`Source : ${data.retailer.firstname}`, lat:parseFloat(data.retailer.lat), lng:parseFloat(data.retailer.lon)})
    markers.push({address:`Destination : ${data.costumer.firstname}`, lat:parseFloat(data.costumer.lat), lng:parseFloat(data.costumer.lon)})
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleDisAgree = () => {
        setOpen(false);
    };
    const handleAccept =async() => {
        const apiUrl=`http://localhost:3500/delivery/letMeShip`
        const res = await axios.post(apiUrl,{id:data.result._id},{
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
          })
        setOpen(false);
        return redirect(`/delivery/myselection/${data.result._id}`);
    };
    return(
        <div className="purchases" style={{paddingTop:"0px"}}>
                    <div className="singlePurchaseContainer" >
                        {value=="delivered"&& <Prove dataa={data}/>}
                        <div className="singlePurchase">
                            <div className="purchaseInfo">
                            <img src={`http://localhost:3500/products/${data.product.imgUrl[0]}`} alt="product img" style={{margin:"10px",height:"200px",width:"200px"}}/>
                                <p> from: {`${data.retailer.firstname} ${data.retailer.lastname}`}</p>
                                <p>{`${data.retailer.subcity}, ${data.retailer.city}`}</p>
                            </div>
                            <div >
                                <p> To: {`${data.costumer.firstname} ${data.costumer.lastname}`}</p>
                                <p>{`${data.costumer.subcity}, ${data.costumer.city}`}</p>
                                <p>ordered on : {formatDate(data.result.date)}</p>
                                <p>Quantity :{data.result.Quantity}</p>
                                <p>Delivery fee : {data.result.DeliveryFee}</p>
                                <p>prime : {data.result.prime}</p>
                            </div>
                        </div>
                       {value=="order"&& <Ship handleAccept={handleAccept} handleClickOpen={handleClickOpen} handleDisAgree={handleDisAgree} open={open} acceptProductTitle={acceptProductTitle} acceptProductContent={acceptProductContent}/>}
                       {value=="selected" && <SendProve />}
                       <Map markers={markers}/>     
            </div>
            </div>
)}
const Prove=({dataa})=>{
    return (
        <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Product is successfully delivered
            <div >
                <img src={`http://localhost:3500/delivery/${dataa.result.proveImg}`} alt="product img" style={{margin:"10px",height:"200px",width:"300px"}}/>
            </div>
        </Alert> 
    )
}
const Ship=({handleClickOpen,handleAccept,open,handleDisAgree,acceptProductTitle,acceptProductContent})=>{
    return (
        <>
            <div style={{textAlign:"center"}}>
                            <Button variant="contained" onClick={handleClickOpen} style={{backgroundColor:"var(--bl)",padding:"5px 60px",margin:"10px 0"}}>Let me ship</Button>
            </div>
            <AlertDialog open={open} handleAgree={handleAccept} handleDisAgree={handleDisAgree} title={acceptProductTitle} content={acceptProductContent}/> 
        </>
    )
}
const SendProve=()=>{
    return(
        <div style={{backgroundColor:"var(--bl)",color:"var(--wh)",display:"inline-block",textAlign:"center"}}>
            <Form method="post" encType="multipart/form-data">
                <input type="file" accept="image/*" name="proveImg" required />
                <Button type="submit" variant="contained" style={{backgroundColor:"var(--wh)",color:"var(--bl)",marginRight:"5px"}}>send prove</Button>
            </Form>
        </div>
    )
}