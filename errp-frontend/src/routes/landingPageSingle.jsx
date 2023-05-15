import {useLoaderData,Form,NavLink } from 'react-router-dom'
import {TiTick} from 'react-icons/ti'
import {FaCartPlus} from 'react-icons/fa'
import {IoArrowForward} from 'react-icons/io5'
import {IoIosSend} from 'react-icons/io'
import {BsCartDashFill} from 'react-icons/bs'
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
   const details=response1.productInfo.details.split(",")
   const [saved,setSaved]=useState(response1.saved)
   const [comment,setComment]=useState('')
   const [imageUrl,setImageUrl]=useState(`http://localhost:3500/products/${response1.productInfo.imgUrl[0]}`)

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
    <div className='landingPageSingle'>
      <div className='imageContainer'>
        <div  className="smallerImage">
          {
          response1.productInfo.imgUrl.map((img)=>{
            return <img src={`http://localhost:3500/products/${img}`} alt={response1.productInfo.modelName} onClick={(e)=>setImageUrl(e.target.src)} key={`http://localhost:3500/products/${img}`}/>
          })
          }
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
          <p className='availableAmount'><span>{response1.product.availableAmount} </span> in stock</p>
          <p className='price'>{response1.product.price} ETB</p>
          <p className='usedOrNew'>{response1.product.usedOrNew}!</p> <br />
          <NavLink to={`/home/${username}/${barcode}/checkout`}>Buy It Now <IoArrowForward /></NavLink>
          {saved===false? <button onClick={handleSaved} className='toFromCart plus'><span><FaCartPlus/></span> Add To Cart</button>
              : <button onClick={handleSaved} className='toFromCart minus'>Remove From <span><BsCartDashFill/></span></button>}
      </div><br />
        <Form method="post"  onSubmit={handleReview}>
            <textarea name="review" id="" cols="40" rows="3" defaultValue={comment} placeholder='comment here'></textarea>
            <button type='submit'><span><IoIosSend /></span></button>
        </Form>

        {response1.review.map((comment)=>{
          return (
            <div key={comment.text} className='commentContainer'>
              <img src={`http://localhost:3500/${comment.imgUrl}`} alt="profileImg" />
              <NavLink to={`/home/${comment.reviewedBy}`}>{comment.name}</NavLink>
              <p>{comment.text}</p>
            </div>
          )
        })}
    </div>
   )
}

