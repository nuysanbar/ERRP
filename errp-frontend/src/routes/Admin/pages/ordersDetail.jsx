import { useLoaderData,NavLink,Outlet} from "react-router-dom";
import axios from "axios"
import AlertDialog from '../../customAlertConfirm'
import { Alert,AlertTitle } from "@mui/material";
import Button  from '@mui/material/Button';
import {formatDate} from "../../purchases";
import Map from "../../brands/simpleMap"
export default function OrdersDetail(){
    const data=useLoaderData()
    const value=data.result.isDeliveredTwo;
    var markers=[]
    markers.push({address:`Source : ${data.retailer.firstname}`, lat:parseFloat(data.retailer.lat), lng:parseFloat(data.retailer.lon)})
    markers.push({address:`Destination : ${data.costumer.firstname}`, lat:parseFloat(data.costumer.lat), lng:parseFloat(data.costumer.lon)})
    return (
        <div>
                    <div className="purchases" style={{paddingTop:"0px"}}>
                    <div className="singlePurchaseContainer" >
                        {value && <Prove dataa={data}/> }
                        <div className="singlePurchase">
                            <div className="purchaseInfo">
                            <img src={`http://localhost:3500/products/${data.product.imgUrl[0]}`} alt="product img" style={{margin:"10px",height:"200px",width:"200px"}}/>
                                <p><NavLink to={`/admin/retailers/${data.result.retailerUserName}/status`}> from: {`${data.retailer.firstname} ${data.retailer.lastname}`}</NavLink></p> 
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
                       <Map markers={markers}/>     
            </div>
            </div>
        </div>)
}
export async function loader({params}){
    const access_token=window.localStorage.getItem("access_token")
    const apiUrl=`http://localhost:3500/admin2/orders`
    const res=await axios.get(apiUrl,{
        headers:{
            'Authorization':"Bearer "+access_token
        }
    })
    const response=res.data
    console.log(response)
    return response;
}
export async function specificOrdersLoader({params}){
    const access_token=window.localStorage.getItem("access_token")
    const apiUrl=`http://localhost:3500/admin2/orders/${params.id}`
    const res=await axios.get(apiUrl,{
        headers:{
            'Authorization':"Bearer "+access_token
        }
    })
    const response=res.data
    console.log(response)
    return response;
}
const Prove=({dataa})=>{
    return (
        <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Product is successfully delivered
            <div >
                <img src={`http://localhost:3500/delivery/${dataa.result.proveImg}`} alt="national img" style={{margin:"10px",height:"200px",width:"300px"}}/>
            </div>
            <div>delivered by <NavLink to={`/admin/deliverers/${dataa.result.deliveredBy}`}>{dataa.result.deliveredBy}</NavLink></div>
        </Alert> 
    )
}