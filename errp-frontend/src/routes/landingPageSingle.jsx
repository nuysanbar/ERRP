import {useLoaderData } from 'react-router-dom'
import axios from 'axios'
export async function loader({params}){
    var response1;
    const access_token=window.localStorage.getItem('access_token');
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
export async function likeAction({params}){
    return params.username;
}
export async function dislikeAction({params}){
    return params.username;
}

export default function LandingPageSingle(){
    const response1=useLoaderData()
   return (
    <div>
        LandingPageSingle 
        {response1.like===false?" false":" true"}
    </div>
   )
}