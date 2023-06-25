import {useLoaderData,NavLink } from 'react-router-dom'
import {IoArrowForward} from 'react-icons/io5'
import axios from 'axios'
import { Alert,AlertTitle} from '@mui/material';

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
    const {costumer,order,product,retailer}=useLoaderData()
    const days=order.prime=="Yes"?" 24 hours":"2 days"
    return(
        <div className='paymentSuccess'>
            <div>
            <Alert severity="success">
                <AlertTitle>Successfully Ordered</AlertTitle>
                This product will reach you in — <strong>{days}</strong>
            </Alert>
            </div>
            <div className='paymentSuccessInfo'>
            <div className='SuccessProductInfo'>
                <NavLink to={`/home/${retailer.username}/${product.barcode}`}>
                    <img src={`http://localhost:3500/products/${product.imgUrl[0]}`} alt="productImage" />
                </NavLink >
            </div>
            <div >
                <NavLink to={`/home/${retailer.username}/${product.barcode}`}>
                    <p>{product.brandName} <IoArrowForward/> </p> 
                </NavLink >
                <h3>Shipped to </h3>
                <p>{costumer.subcity}, {costumer.city}</p>
                <NavLink to="/home/profile/edit"> change address <IoArrowForward/></NavLink>
                <p>check in your <NavLink to={'/home/purchases'}>purchases <IoArrowForward/></NavLink></p>
            </div>
            </div>
        </div>
    )
}