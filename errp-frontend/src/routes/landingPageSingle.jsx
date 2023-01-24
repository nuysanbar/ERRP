import {useLoaderData,Form,NavLink } from 'react-router-dom'
import {AiOutlineLike,AiFillLike,AiFillDislike,AiOutlineDislike} from 'react-icons/ai'
import {BsBookmark,BsFillBookmarkFill} from 'react-icons/bs'
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
   const [likeCount,setLikeCount]=useState(response1.product.likedCount)
   const [disLikeCount,setDisLikeCount]=useState(response1.product.disLikedCount)
   const [like,setLike]=useState(response1.like)
   const [dislike,setDisLike]=useState(response1.dislike)
   const [saved,setSaved]=useState(response1.saved)
   const [comment,setComment]=useState('')
   const addorLowerLike=()=>{
    if(!like){
        setLikeCount(likeCount+1)
    }else{
        setLikeCount(likeCount-1)
    }
}
    const addorLowerDisLike=()=>{
        if(!dislike){
            setDisLikeCount(disLikeCount+1)
        }else{
            setDisLikeCount(disLikeCount-1)
        }
    }
    const handleLike=async()=>{
      setLike(!like)
      addorLowerLike()
      if(dislike){
        setDisLike(!dislike)
        addorLowerDisLike()
      }
      console.log("like action is being called") 
      const apiUrl=`http://localhost:3500/users/${username}/${barcode}/like`
      await axios.post(apiUrl,{"username":username},{
          headers: {
            'Authorization': 'Bearer ' + access_token
          }
        })
        return 0;
   }
   const handleDislike=async()=>{
      addorLowerDisLike()
      setDisLike(!dislike)
      if(like){
        setLike(!like)
        addorLowerLike()
      }
      console.log("dislike action is being called")
      const apiUrl=`http://localhost:3500/users/${username}/${barcode}/dislike`
      await axios.post(apiUrl,{"username":username},{
          headers: {
            'Authorization': 'Bearer ' + access_token
          }
        })
      return 0
   }
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
        <p>{response1.product.availableAmount} {response1.product.likedCount} {response1.product.disLikedCount}</p>
        <p>{response1.product.price}</p>
        <p>{response1.productInfo.brandName}</p>
        <p>{response1.productInfo.modelName}</p>
        <img src={`http://localhost:3500/products/${response1.productInfo.imgUrl[0]}`} alt={response1.productInfo.modelName}/> <br />
        {like===false? <button onClick={handleLike} ><span>{likeCount}</span><AiOutlineLike/></button>
             : <button onClick={handleLike}><span>{likeCount}</span><AiFillLike/></button>}
        {dislike===false? <button onClick={handleDislike}><span>{disLikeCount}</span><AiOutlineDislike/></button>
             : <button onClick={handleDislike}><span>{disLikeCount}</span><AiFillDislike/></button>}
        {saved===false? <button onClick={handleSaved}><BsBookmark /></button>
             : <button onClick={handleSaved}><BsFillBookmarkFill /></button>}

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

