import SpecificBrand from "../routes/brands/specificBrands";
import {useLoaderData} from 'react-router-dom'
import axios from 'axios';
const access_token=window.localStorage.getItem('access_token')
export async function searchLoader({request}){
    const url = new URL(request.url);
    console.log(url.search)
    const apiUrl = `http://localhost:3500/home/search${url.search}`
    const res = await axios.get(apiUrl,{
        headers:{
            "Authorization":'Bearer ' + access_token
        }
    })
    console.log(res.data)
    return res.data;
}
export async function recommendationLoader(){
    const apiUrl = `http://localhost:3500/home/`
    const res = await axios.get(apiUrl,{
        headers:{
            "Authorization":'Bearer ' + access_token
        }
    })
    console.log(res.data)
    return res.data
}
export default function Search(){
    const data=useLoaderData()
    return (
        <div>
           {data &&  <SpecificBrand isSearch={true} />}
           {!data && <>no recommended items yet</>}
        </div>
    )
}