import { useLoaderData,NavLink, Outlet } from "react-router-dom";
import axios from "axios";
import {AiFillStar,AiOutlinePhone,AiOutlineMail} from "react-icons/ai"
import {GoLocation} from "react-icons/go"
import {BiEdit} from 'react-icons/bi'
export async function loader(){
    const access_token=window.localStorage.getItem('access_token');
    const apiUrl=`http://localhost:3500/home/profile`
    const res = await axios.get(apiUrl,{
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      })
    console.log("loader called")
    const response=res.data
    console.log(response)
    return response;
}
export default function Profile(){
    const response=useLoaderData()
    return (
        <>
           <div className="personalInfoContainer">
            <div className="personalInfo">
            <div className="sensitiveInfo">
            <NavLink to={`/home/${response.username}`} className="personalName">
                <img src={`http://localhost:3500/${response.imgUrl}`} alt="profileImg" />
                <span>{response.firstname} {response.lastname}</span>
            </NavLink>
             <div className="contact"> 
            <div>
               <span><AiOutlinePhone/></span> <span>{response.phoneNum}</span>
            </div>
            <div>
             <span><span><AiOutlineMail/> </span>{response.email}</span>
            </div>
            <div>
                <span><GoLocation/></span> <span>{response.subcity}</span>, <span>{response.city}</span>
            </div>
            </div>
            </div>
            <div className="favorite"><AiFillStar /><br /><span>{response.favoredNumber}</span></div>
            <NavLink to={`/home/profile/edit`} className="updateProfile"><BiEdit/>update profile</NavLink>
            </div>
            <Outlet />
            </div>
        </>
    )
}
