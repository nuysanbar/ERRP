
import {useLoaderData,Form,NavLink } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react';
const access_token=window.localStorage.getItem('access_token');
export async function loader({params}){
    var response1;
    const apiUrl=`http://localhost:3500/users/${params.username}/${params.barcode}`
    const res = await axios.get(apiUrl,{
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      })
    response1=res.data
    console.log(response1)
    return response1
}

export async function action({request}){
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const apiUrl='http://localhost:3500/order/CheckoutExpress'
    const response=await axios.post(apiUrl,updates ,{
        headers:{
            "Authorization":"Bearer "+access_token
        }
    })
    console.log(response)
    return 0;
}

export default function ExpressCheckout(){
   const response1=useLoaderData()
   const username=response1.product.retailerUserName
   const barcode=response1.product.barcode
   return (
    <div>
        <p>{response1.productInfo.brandName}</p>
        <p>{response1.productInfo.modelName}</p>
        <img src={`http://localhost:3500/products/${response1.productInfo.imgUrl[0]}`} alt={response1.productInfo.modelName}/> <br />

        <Form method="post">
            <input type="hidden" name='barcode' value={barcode}/>
            <input type="hidden" name='retailer' value={username} />
            <input type="hidden" name="ItemName" value={response1.productInfo.brandName}/>
            <input type="hidden" name="UnitPrice" value={response1.product.price}/>
            <input type="hidden" name="DeliveryFee" value="5"/>
            <input type="hidden" name="Discount" value="2"/>
            <input type="hidden" name="Tax1" value="0.50"/>
            <input type="hidden" name="Tax2" value="0"/>
            <input type="hidden" name="HandlingFee" value="0"/>
            <span>Qty: <input type="text" value="1" name="Quantity"/></span><br/>
            <span>{response1.product.price}</span> <br />
            <span>delivery: 15 ETB</span>
            <button type='submit'>pay with yenepay</button>
        </Form>
    </div>
   )
}
