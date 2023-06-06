import { useState } from "react"
import { NavLink } from 'react-router-dom'
import {FaCartPlus} from 'react-icons/fa'
import {AiOutlineStar,AiFillStar} from 'react-icons/ai'
import {IoArrowForward} from 'react-icons/io5'
import {BsCartDashFill,BsCheck2Square} from 'react-icons/bs'
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
        <>
            <div className="storeInfo">
                <NavLink to={`/home/${username}/${barcode}`}>
                    <img src={`http://localhost:3500/${retailer.storeImg}`} alt={retailer.storeImg} className="profileImg"/>
                    <span className="storeName">{retailer.firstname} {retailer.lastname}</span>
                </NavLink>
                <div className="storeFavorite">
                    {isFavorite===false?<AiOutlineStar onClick={handleFavorite}/>:
                            <AiFillStar onClick={handleFavorite}/>} <br />
                    <span>{retailer.favoredAmount}</span>
                </div>
            </div>
            <div className='storeProductInformation'>
                 <span className='price'><BsCheck2Square/> {retailer.price} ETB</span> <br />
                <span className='availableAmount'><BsCheck2Square/> {retailer.availableAmount} in stock</span> <br />
                <span className='usedOrNew'>{retailer.usedOrNew}!</span>
                <NavLink to={`/home/${username}/${barcode}/checkout`} className="buyItNow">Buy It Now <IoArrowForward /></NavLink> <br />
                {saved===false? <button onClick={handleSaved} className='toFromCart plus'><span><FaCartPlus/></span> Add To Cart</button>
                    : <button onClick={handleSaved} className='toFromCart minus'>Remove From <span><BsCartDashFill/></span></button>}
                <button className="comments"><NavLink to={`/home/${username}/${barcode}`}><span>{retailer.review.length}</span>  reviews</NavLink></button>
            </div>
        </>
    )
}