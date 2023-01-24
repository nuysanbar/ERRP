import {AiOutlineLike,AiFillLike,AiFillDislike,AiOutlineDislike,AiOutlineStar,AiFillStar} from 'react-icons/ai'
import {BsBookmark,BsFillBookmarkFill} from 'react-icons/bs'
import { useState } from "react"
import axios from 'axios'
const access_token=window.localStorage.getItem("access_token")
export default function Store({retailer,barcode}){
    const [like,setLike]=useState(retailer.isLiked)
    const [dislike,setDisLike]=useState(retailer.isDisLiked)
    const [saved,setSaved]=useState(retailer.isSaved)
    const [isFavorite,setIsFavorite]=useState(retailer.isFavorite)
    const [favoredAmount,setFavoredAmount]=useState(retailer.favoredAmount)
    const [likeCount,setLikeCount]=useState(retailer.likeCount)
    const [disLikeCount,setDisLikeCount]=useState(retailer.disLikeCount)
    const username=retailer.storeName
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
    const addorLowerFavoredAmount=()=>{
        if(!isFavorite){
            setFavoredAmount(favoredAmount+1)
        }else{
            setFavoredAmount(favoredAmount-1)
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
     const handleFavorite =async()=>{
        addorLowerFavoredAmount()
        console.log("fav action is being called")
        const apiUrl=`http://localhost:3500/users/${username}/favorite`
        const res=await axios.get(apiUrl,{
            headers: {
            'Authorization': 'Bearer ' + access_token
            }
        })
        setIsFavorite(!isFavorite)
        console.log(res.data)
        return 0;
    }
    return (
        <div>
            <div>
                <img src={`http://localhost:3500/${retailer.storeImg}`} alt={retailer.storeImg} className="profileImg"/>
                <p>{retailer.storeName}</p>
                <p>Favourite for {favoredAmount} consumer</p>
                {isFavorite===false?<button onClick={handleFavorite}><AiOutlineStar/></button>:
                        <button onClick={handleFavorite}><AiFillStar /></button>}
            </div>

            {like===false? <button onClick={handleLike} ><span>{likeCount}</span><AiOutlineLike/></button>
             : <button onClick={handleLike}><span>{likeCount}</span><AiFillLike/></button>}
            {dislike===false? <button onClick={handleDislike}><span>{disLikeCount}</span><AiOutlineDislike/></button>
             : <button onClick={handleDislike}><span>{disLikeCount}</span><AiFillDislike/></button>}
            {saved===false? <button onClick={handleSaved}><BsBookmark /></button>
             : <button onClick={handleSaved}><BsFillBookmarkFill /></button>}
        </div>
    )
}