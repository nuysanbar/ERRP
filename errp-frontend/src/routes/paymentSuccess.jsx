import {useLoaderData } from 'react-router-dom'
import axios from 'axios'
const access_token=window.localStorage.getItem('access_token');

export async function paymentSuccessLoader({request}){
    var response1;
    const url = new URL(request.url);
    const apiUrl=`http://localhost:3500/order/PaymentSuccessReturnUrl${url.search}`
    const res = await axios.get(apiUrl,{
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      })
    response1=res.data
    console.log(response1)
    return response1
}

export default function PaymentSuccessfull(){
    return(
        <div>
            <h1>payment success modified</h1>
        </div>
    )
}