import {useLoaderData,Form,redirect,useNavigate} from 'react-router-dom'
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
    const [barcode,setBarcode]=useState(response1.productInfo.barcode)
    const [amount,setAmount]=useState(response1.product.availableAmount)
    const [price,setPrice]=useState(response1.product.price)
    const [changePrice,setChangePrice]=useState(false)
    const [changeAmount,setChangeAmount]=useState(false)
    const handleAvailableAmount=async()=>{
        setAmount(amount-1)
        const apiUrl=`http://localhost:3500/home/products/${barcode}/soldOne`
        const res=await axios.post(apiUrl,{"price":price,"amount":amount},{
            headers:{
                "Authorization":"Bearer "+ access_token
            }
        })
        console.log(res.data)
        return 0
    }
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
   return (
    <div>
        <div> <p>{amount}</p>
        {changeAmount===false? <button onClick={()=>setChangeAmount(true)}>Change Amount</button>:
        <Form method="post" action="updateAmount" onSubmit={()=>setChangeAmount(false)}>
            <input type="number"  name='amount' placeholder='put in amount' onChange={(e)=>setAmount(parseInt(e.currentTarget.value))}/>
            <button onClick={()=>setChangeAmount(false)}>cancel</button>
            <button type='submit'>apply</button>
        </Form>
        }</div>
        <p>{price}</p>
        {changePrice===false?  <button onClick={()=>setChangePrice(true)}>change price</button> :
        <Form method="post" action='updatePrice' onSubmit={()=>setChangePrice(false)}>
            <input type="number" name='price' placeholder='put in price' onChange={(e)=>setPrice(parseInt(e.currentTarget.value))}/>
            <button onClick={()=>setChangePrice(false)}>cancel</button>
            <button type="submit">apply</button>
        </Form>
        }
        <p>{response1.productInfo.brandName}</p>
        <p>{response1.productInfo.modelName}</p>
        <img src={`http://localhost:3500/products/${response1.productInfo.imgUrl[0]}`} alt={response1.productInfo.brandName}/>
        <p></p>
        {amount >1 && <div><button onClick={()=>handleAvailableAmount(-1)}>Sold One</button><br /></div>}
        <button onClick={handleSoldOut}>Sold Out</button>
    </div>
   )
}

