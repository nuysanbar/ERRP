import { useLoaderData} from "react-router-dom"
import {TiTick} from 'react-icons/ti'
import { useState,useEffect } from "react"
import Store from "./store"
import Map from "./simpleMap"
import axios from "axios"
const access_token=window.localStorage.getItem("access_token")
export async function loader({params}){
    const apiUrl=`http://localhost:3500/home/product/${params.barcode}`
    const res= await axios.get(apiUrl,{
        headers:{
            "Authorization":"Bearer "+ access_token
        }
    })
    const response=res.data
    console.log("specific store loader is being called")
    return {response}
}
export default function SpecificStore(){
    const {response}=useLoaderData()
    console.log(response)
    const customerInfoLat=parseFloat(response.costumerInfo.lat);
    const customerInfoLon=parseFloat(response.costumerInfo.lon)
    console.log(customerInfoLat)
    var markers=[]
    const product=response.product
    const retailers=response.retailers
    console.log(retailers)
    const DistanceCalculator=(retailerLat,retailerLon)=>{
            var latT=(parseFloat(retailerLat)-parseFloat(customerInfoLat))
            var latDiff=(parseFloat(retailerLat)-parseFloat(customerInfoLat))*110.574;
            var lonDiff=(parseFloat(retailerLon)-parseFloat(customerInfoLon))*111.320*Math.cos(latT);
            var distance=Math.sqrt(latDiff**2+lonDiff**2)
            return distance
        
    }
    const newRetailers=retailers.filter((retailer)=>DistanceCalculator(retailer.lat,retailer.lon)<15000)
    const details=product.details.split(",")
    const [imageUrl,setImageUrl]=useState(null)
    useEffect(()=>setImageUrl(`http://localhost:3500/products/${response.product.imgUrl[0]}`),[])
    return (
        <div className="specificStores">
            <div>
            <div className='imageContainer'>
            <div  className="smallerImage">
                { product.imgUrl.map((img)=>{
                    return <img src={`http://localhost:3500/products/${img}`} alt={product.modelName} onMouseOver={(e)=>setImageUrl(e.target.src)} key={`http://localhost:3500/products/${img}`}/>
                })}
            </div>
                {imageUrl && <div className='largerImage'>
                    <img src={imageUrl} alt={product.modelName} />
                </div>}
            </div>
            <div className='productInformation'>
                <p className='brandName'>{product.brandName}</p>
                {details.map((detail)=>{
                    return <p key={detail} className='detail'><span><TiTick/></span>{detail}</p>
                })}</div>
            <div>
                {newRetailers.map((item)=>{
                    markers.push({address:`${item.firstname} ${item.lastname}`, lat:parseFloat(item.lat), lng:parseFloat(item.lon)})
                    return ( <div  key={item.storeName} className='store'>
                                <Store retailer={item} barcode={product.barcode} />
                            </div>)
                })}
            </div>
            </div>
            <Map markers={markers}/>
            </div>
    )
}