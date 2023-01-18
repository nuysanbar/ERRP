import {useLoaderData } from 'react-router-dom'
import axios from 'axios'
export async function loader({params}){
    var response1;
    const access_token=window.localStorage.getItem('access_token');
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
export async function likeAction({params}){
    return params.username;
}
export async function dislikeAction({params}){
    return params.username;
}

export default function ProductsListSingle(){
    const response1=useLoaderData()
   return (
    <div>
        <p>{response1.product.availableAmount}</p>
        <p>{response1.product.likedCount}</p>
        <p>{response1.product.disLikedCount}</p>
        <p>{response1.product.price}</p>
        <p>{response1.productInfo.brandName}</p>
        <p>{response1.productInfo.modelName}</p>
        <img src={`http://localhost:3500/products/${response1.productInfo.imgUrl}`}/>
        <p></p>
        <button>add up amount</button>
        <button>lower amount</button>
        <button>sold out</button>
    </div>
   )
}