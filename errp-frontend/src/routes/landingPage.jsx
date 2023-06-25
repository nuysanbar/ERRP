import { useLoaderData,Outlet, NavLink} from "react-router-dom"
import {AiOutlineStar,AiFillStar,AiOutlinePhone,AiOutlineMail} from "react-icons/ai"
import {GoLocation} from "react-icons/go"
import axios  from "axios";
import { useState } from "react";
export async function loader({params}){
    var userRole;
    var response1;
    const access_token=window.localStorage.getItem('access_token');
    const apiUrl=`http://localhost:3500/users/${params.username}`
    const res = await axios.get(apiUrl,{
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      })
    if(res.statusText=="OK"){
    if(res.data.user.roles===2001){
        userRole="consumer"
    }
    else{
        userRole="retailer"
    }
    response1=res.data
    console.log(response1)}
    return [userRole,response1]
}
export default function LandingPage({customPath}){
    const [userRole,response1]=useLoaderData()
    const username=response1?response1.user.username:null
    const [isFavorite,setIsFavorite]=useState(response1?response1.isFavored:null)
    const access_token=window.localStorage.getItem("access_token")
    const handleFavorite =async()=>{
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
        <div >
            {userRole && (<div className="personalInfoContainer">
            <div className="personalInfo">
            <div className="sensitiveInfo">
            <NavLink to={`/home/${response1.user.username}`} className="personalName">
                <img src={`http://localhost:3500/${response1.user.imgUrl}`} alt="profileImg" />
                <span>{response1.user.firstname} {response1.user.lastname}</span>
            </NavLink>
            { userRole==="retailer" && <div className="contact"> 
            <div>
               <span><AiOutlinePhone/></span> <span>{response1.user.phoneNum}</span>
            </div>
            <div>
             <span><span><AiOutlineMail/> </span>{response1.user.email}</span>
            </div>
            <div>
                <span><GoLocation/></span> <span>{response1.user.subcity}</span>, <span>{response1.user.city}</span>
            </div>
            </div>}
            </div>
            <div className="favorite">
                    { userRole==="retailer" && isFavorite===false?<AiOutlineStar onClick={handleFavorite}/>:
                        <AiFillStar onClick={handleFavorite}/>} <br /><span>{response1.user.favoredNumber}</span>
            </div>
            </div>
            </div>)}
            <Outlet />
        </div>
    )}
