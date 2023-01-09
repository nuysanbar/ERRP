import { useLoaderData } from "react-router-dom";
import axios from "axios";
export async function loader(){
    const access_token=window.localStorage.getItem('access_token');
    const apiUrl=`http://localhost:3500/home/saved`
    const res = await axios.get(apiUrl,{
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      })
    const response=res.data
    return response;
}
export default function Saved(){
    const response = useLoaderData()
    return (
        <>
        <h1>saved section {response.saved }</h1>
        </>
    )
}