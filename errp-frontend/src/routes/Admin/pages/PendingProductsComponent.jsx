import { useState,useEffect } from 'react';
import { TiTick } from 'react-icons/ti';
import Button from '@mui/material/Button';
import { useLoaderData,NavLink,redirect,useNavigate } from 'react-router-dom';
import axios from 'axios';
export function PendingProductsStatus(){
    const product=useLoaderData()
    const details=product.details.split(",")
    const [imageUrl,setImageUrl]=useState(null)
    const navigate=useNavigate()

    const handleApprove=async()=>{
        const access_token=window.localStorage.getItem("access_token")
        const apiUrl=`http://localhost:3500/admin2/handleApprove/${product.barcode}`
        const res=await axios.get(apiUrl,{
            headers:{
                'Authorization':"Bearer "+access_token
            }
        })
        const response=res.data
        return navigate(-1);
    }
    const handleRemove=async()=>{
        const access_token=window.localStorage.getItem("access_token")
        const apiUrl=`http://localhost:3500/admin2/handleRemove/${product.barcode}`
        const res=await axios.delete(apiUrl,{
            headers:{
                'Authorization':"Bearer "+access_token
            }
        })
        const response=res.data
        return navigate(-1);
    }

    useEffect(()=>setImageUrl(`http://localhost:3500/products/${product.imgUrl[0]}`),[])
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
            })}
            <div style={{height:"40px"}}>Added by<NavLink to={`/admin/retailers/${product.retailerUserName}/status`} style={{backgroundColor:"var(--lbl)",textDecoration:"underline"}}>{product.retailerUserName}</NavLink></div>
            <Button variant="contained" style={{backgroundColor:"var(--bl)",color:"var(--wh)"}} onClick={handleApprove}>Approve</Button>
            <Button variant="outlined" style={{borderColor:"var(--bl)"}} onClick={handleRemove}>Remove</Button>
        </div>
        </div>
        </div>
    )
}