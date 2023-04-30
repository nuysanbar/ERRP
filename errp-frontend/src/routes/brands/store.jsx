import {AiOutlineStar,AiFillStar} from 'react-icons/ai'
import { useState } from "react"
import axios from 'axios'
const access_token=window.localStorage.getItem("access_token")
export default function Store({retailer,barcode}){
    const [saved,setSaved]=useState(retailer.isSaved)
    const [isFavorite,setIsFavorite]=useState(retailer.isFavorite)
    const [favoredAmount,setFavoredAmount]=useState(retailer.favoredAmount)
    const username=retailer.storeName
    const addorLowerFavoredAmount=()=>{
        if(!isFavorite){
            setFavoredAmount(favoredAmount+1)
        }else{
            setFavoredAmount(favoredAmount-1)
        }
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
                <p>Favored by {favoredAmount}</p>
                {isFavorite===false?<button onClick={handleFavorite}><AiOutlineStar/></button>:
                        <button onClick={handleFavorite}><AiFillStar /></button>}
            </div>
            <p>price: {retailer.price}</p>
            <p>{retailer.usedOrNew}</p>
            <p>availableAmount: {retailer.availableAmount}</p>
            <button>Buy now</button>
            {saved===false? <button onClick={handleSaved}>Add to Cart</button>
             : <button onClick={handleSaved}>remove from Cart</button>}
             <button>review</button>
        </div>
    )
}