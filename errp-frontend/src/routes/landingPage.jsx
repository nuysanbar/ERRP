import { useLoaderData } from "react-router-dom"
import axios  from "axios";
import jwt from 'jwt-decode'
export async function loader({params}){
    var userRole;
    var response1;
    var response2;
    const access_token=window.localStorage.getItem('access_token');
    const apiUrl=`http://localhost:3500/users/${params.username}`
    const res = await axios.get(apiUrl,{
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      })
    if(res.data.roles===2001){
        userRole="consumer"
    }
    else{
        userRole="retailer"
    }
    response1=res.data
    const apiUrlProduct=`http://localhost:3500/users/${params.username}/products`
    const res2=await axios.get(apiUrlProduct,{
        headers:{
            "Authorization":'Bearer '+access_token
        }
    })
    response2=res2.data
    console.log(response2);
    return [userRole,response1,response2]
}
export default function LandingPage(){
    const [userRole,response1,response2]=useLoaderData()
    return (
        <div>
            userRole:{userRole} <br />
            username: {response1.username} <br />
            imgUrl: {response1.imgUrl} <br />
            id: {response1._id} <br />
            roles: {response1.roles} <br />
            <img src={`http://localhost:3500/${response1.imgUrl}`} alt="profileImg" />
        </div>
    )
}