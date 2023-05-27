import {useLoaderData,Form,redirect } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react';
const access_token=window.localStorage.getItem('access_token');
export async function loader({params}){
    var response1,response2;
    const apiUrl=`http://localhost:3500/users/${params.username}/${params.barcode}`
    const res = await axios.get(apiUrl,{
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      })
    const merchantUrl=`http://localhost:3500/users/merchantSecret/${params.username}`
    const res2 = await axios.get(merchantUrl,{
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
    })
    response1=res.data
    response2=res2.data
    console.log(response1,response2)
    return {response1,response2}}
export async function action({request}){
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const apiUrl='http://localhost:3500/order/CheckoutExpress'
    const response=await axios.post(apiUrl,updates ,{
        headers:{
            "Authorization":"Bearer "+access_token
        }
    })

    return redirect(response.data.url);
}

export default function ExpressCheckout(){
   const {response1,response2}=useLoaderData()
   const username=response1.product.retailerUserName
   const barcode=response1.product.barcode
   const price=response1.product.price
   const [quantity,setQuantity]=useState(1)
   const tax=price*quantity*0.02
   return (
    <div className='expressCheckout'>
        <div className='checkoutFormContainer'>
          <img src={`http://localhost:3500/products/${response1.productInfo.imgUrl[0]}`} alt={response1.productInfo.brandName}/>  <br />
          <Form method="post" >
              <input type="hidden" name='barcode' value={barcode} readOnly={true}/>
              <input type="hidden" name='retailer' value={username} readOnly={true}/>
              <input type="hidden" name='merchantCode' value={response2.sellerCode} readOnly={true}/>
              <input type="hidden" name='pdToken' value={response2.pdtToken} readOnly={true}/>
              <input type="hidden" name="ItemName" value={response1.productInfo.brandName} readOnly={true}/>
              <input type="hidden" name="UnitPrice" value={100} readOnly={true}/>
              <input type="hidden" name="DeliveryFee" value="100" readOnly={true}/>
              <input type="hidden" name="Discount" value="0" readOnly={true}/>
              <input type="hidden" name="Tax1" value={tax} readOnly={true}/>
              <input type="hidden" name="Tax2" value="0" readOnly={true}/>
              <input type="hidden" name="HandlingFee" value="0" readOnly={true}/>
              <span>Qty : <input type="number" value={quantity} name="Quantity" onChange={(e)=>setQuantity(e.target.value)}/></span> <br />
              <button type='submit'>Pay with YenePay</button>
          </Form>
        </div>
        <div className='checkoutInfo'>
          <p>{response1.productInfo.brandName}</p>
            <p>price : {price}</p> 
            <p>delivery : 100 ETB</p>
            <p>Tax : {tax} </p> 
            <p className="total">Total : {tax + 100+(quantity*price)} </p>
        </div>
    </div>
   )
}
