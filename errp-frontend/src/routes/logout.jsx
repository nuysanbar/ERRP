import { redirect } from "react-router-dom";
import axios from 'axios'
export async function loader(){
    const access_token=window.localStorage.getItem('access_token');
     window.localStorage.setItem('access_token',"")
     const apiUrl='http://localhost:3500/logout/'
     const res = await axios.get(apiUrl,{
         headers: {
           'Authorization': 'Bearer ' + access_token
         }
       })
    return redirect('/')
}
