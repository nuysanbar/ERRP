import {useLoaderData,Form,redirect,useNavigate} from 'react-router-dom'
import AlertDialog from './customAlertConfirm'
import {TiTick} from 'react-icons/ti'
import {BiEdit} from 'react-icons/bi'
import {GiCancel} from 'react-icons/gi'
import {FcApproval} from 'react-icons/fc'
import {MdDelete} from 'react-icons/md'
import axios from 'axios'
import { useState } from 'react';
const access_token=window.localStorage.getItem('access_token');
export async function loader({params}){
    var response1;
    const apiUrl=`http://localhost:3500/home/products/${params.barcode}`
    const res = await axios.get(apiUrl,{
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      })
    response1=res.data
    console.log("response 1")
    console.log(response1)
    return response1
}
export const priceAction=async({request,params})=>{
    const formData=await request.formData()
    const updates = Object.fromEntries(formData)
    const apiUrl=`http://localhost:3500/home/products/${params.barcode}/updatePrice`
    const res=await axios.post(apiUrl,updates,{
        headers:{
            "Authorization":"Bearer "+access_token
        }
    })
    console.log(res.data)
    return redirect(`/home/products/${params.barcode}`);
}
export const amountAction=async({request,params})=>{
    const formData=await request.formData()
    const updates=Object.fromEntries(formData)
    const apiUrl=`http://localhost:3500/home/products/${params.barcode}/updateAmount`
    const res=await axios.post(apiUrl,updates,{
        headers:{
            'Authorization':"Bearer "+ access_token
        }
    })
    console.log(res.data)
    return redirect(`/home/products/${params.barcode}`)
}
export default function ProductsListSingle(){
    const navigate=useNavigate()
    const response1=useLoaderData()
    const barcode=response1.productInfo.barcode
    const details=response1.productInfo.details.split(",")
    const [amount,setAmount]=useState(response1.product.availableAmount)
    const [price,setPrice]=useState(response1.product.price)
    const [changePrice,setChangePrice]=useState(false)
    const [changeAmount,setChangeAmount]=useState(false)
    const [open,setOpen]=useState(false)
    const deleteTitle="Are you sure you want to remove this?"
    const deleteContent="Click agree if you really want to delete this product from your store"
    const [imageUrl,setImageUrl]=useState(`http://localhost:3500/products/${response1.productInfo.imgUrl[0]}`)
    const handleDisAgree = () => {
      setOpen(false);
    };
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleSoldOut=async()=>{
        const apiUrl=`http://localhost:3500/home/products/${barcode}/deleteProduct`
        const totalSell=amount*price
        const res=await axios.post(apiUrl,{"amount":amount,"price":totalSell},{
            headers:{
                "Authorization":"Bearer " + access_token
            }
        })
        console.log(res.data)
        setAmount(0)
        return navigate(-1);
    }
    const handlePriceCancel=()=>{
        setChangePrice(false)
        setPrice(response1.product.price)
    }
    const handleAmountCancel=()=>{
        setChangeAmount(false)
        setAmount(response1.product.availableAmount)
    }
   return (
    <div className='myStoreSpecificProduct'>
        <div className='imageContainer'>
        <div  className="smallerImage">
          {
          response1.productInfo.imgUrl.map((img)=>{
            return <img src={`http://localhost:3500/products/${img}`} alt={response1.productInfo.modelName} onMouseOver={(e)=>setImageUrl(e.target.src)} key={`http://localhost:3500/products/${img}`}/>
          })}
        </div>
        <div className='largerImage'>
            <img src={imageUrl} alt={response1.productInfo.modelName} />
        </div>
      </div>
      <div className='productInformation'>
        <p className='brandName'>{response1.productInfo.brandName}</p>
          {details.map((detail)=>{
            return <p key={detail} className='detail'><span><TiTick/></span>{detail}</p>
          })}
          <p className='usedOrNew'>{response1.product.usedOrNew}!</p> <br />
          <span className='availableAmount'>{amount} in stock</span>
            {changeAmount===false? <BiEdit onClick={()=>setChangeAmount(true)} className="edit"/>:
            <Form method="post" action="updateAmount" onSubmit={()=>setChangeAmount(false)}>
                <input type="number"  name='amount' min={1} placeholder={amount} onChange={(e)=>setAmount(parseInt(e.currentTarget.value))}/>
                <GiCancel onClick={handleAmountCancel} className='cancel'/>
                <button><FcApproval className='apply'/></button>
            </Form>} <br />
          <span className='price'>{price} ETB</span>
          {changePrice===false?  <BiEdit onClick={()=>setChangePrice(true)} className='edit'/>:
            <Form method="post" action='updatePrice' onSubmit={()=>setChangePrice(false)}>
                <input type="number" name='price' min={100} placeholder={price} onChange={(e)=>setPrice(parseInt(e.currentTarget.value))}/>
                <GiCancel onClick={handlePriceCancel} className='cancel'/>
                <button><FcApproval className='apply'/></button>
            </Form>} <br />
          <button onClick={handleClickOpen} className='delete'><MdDelete/>Delete</button>
      </div>
      <AlertDialog open={open} handleAgree={handleSoldOut} handleDisAgree={handleDisAgree} title={deleteTitle} content={deleteContent}/>
    </div>
   )
}

