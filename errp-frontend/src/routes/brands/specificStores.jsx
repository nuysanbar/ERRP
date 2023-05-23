import { useLoaderData} from "react-router-dom"
import {TiTick} from 'react-icons/ti'
import { useState,useEffect } from "react"
import Store from "./store"
import SimpleMap from "./simpleMap"
import axios from "axios"
const access_token=window.localStorage.getItem("access_token")
export async function loader({params}){
    const apiUrl=`http://localhost:3500/home/products/${params.barcode}`
    const res= await axios.get(apiUrl,{
        headers:{
            "Authorization":"Bearer "+ access_token
        }
    })
    const response=res.data
    console.log(response)
    console.log("specific store loader is being called")
    return response
}
export default function SpecificStore(){
    const response=useLoaderData()
    const product=response.product
    const retailers=response.retailers
    const details=product.details.split(",")
    const [imageUrl,setImageUrl]=useState(null)
    useEffect(()=>setImageUrl(`http://localhost:3500/products/${response.product.imgUrl[0]}`),[])
    return (
        <div className="specificStores">
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
                {retailers.map((item)=>{
                    return ( <div  key={item.storeName} className='store'>
                                <Store retailer={item} barcode={product.barcode} />
                            </div>)
                })}
            </div>
            <SimpleMap />
            </div>
    )
}