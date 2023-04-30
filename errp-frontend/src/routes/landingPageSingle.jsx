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

export async function reviewAction({request,params}){
    const formData= await request.formData()
    const updates=Object.fromEntries(formData)
    console.log("review action is being called")
    const apiUrl=`http://localhost:3500/users/${params.username}/${params.barcode}/review`
    await axios.post(apiUrl,updates,{
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      })
      return 0;
}

export default function LandingPageSingle(){
   const response1=useLoaderData()
   const username=response1.product.retailerUserName
   const barcode=response1.product.barcode
   const [saved,setSaved]=useState(response1.saved)
   const [comment,setComment]=useState('')

   const handleSaved=async()=>{
      setSaved(!saved)
      console.log("save action is being called")
      const apiUrl=`http://localhost:3500/users/${username}/${barcode}/save`
      await axios.post(apiUrl,{"barcode":barcode},{
          headers: {
            'Authorization': 'Bearer ' + access_token
          }
        })
      return 0
   }
   const handleReview=(e)=>{
     setComment('')
     e.currentTarget=''
   }

   return (
    <div>
        <p>{response1.product.availableAmount}</p>
        <p>{response1.product.price}</p>
        <p>{response1.productInfo.brandName}</p>
        <p>{response1.productInfo.modelName}</p>
        <img src={`http://localhost:3500/products/${response1.productInfo.imgUrl[0]}`} alt={response1.productInfo.modelName}/> <br />
        <NavLink to={`/home/${username}/${barcode}/checkout`}>Buy it now</NavLink>
        {saved===false? <button onClick={handleSaved}>Add to cart</button>
             : <button onClick={handleSaved}>remove from cart</button>}

        <Form method="post"  onSubmit={handleReview}>
            <textarea name="review" id="" cols="40" rows="3" defaultValue={comment} placeholder='comment here'></textarea>
            <button type='submit'>post</button>
        </Form>

        {response1.review.map((comment)=>{
          return (
            <div key={comment.text}>
              <img src={`http://localhost:3500/${comment.imgUrl}`} alt="profileImg" />
              <NavLink to={`/home/${comment.reviewedBy}`}><h4>{comment.reviewedBy}</h4></NavLink>
              <p>{comment.text}</p>
            </div>
          )
        })}
    </div>
   )
}

