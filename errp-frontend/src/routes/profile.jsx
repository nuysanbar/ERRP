import { useLoaderData,NavLink, Outlet } from "react-router-dom";
import axios from "axios";
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
          <h1>{response.username}</h1>
          <img src={`http://localhost:3500/${response.imgUrl}`} alt="profileImg" /> <br />
          <button><NavLink to={`/home/profile/edit`}>edit</NavLink></button>
          <Outlet />
        </>
    )
}