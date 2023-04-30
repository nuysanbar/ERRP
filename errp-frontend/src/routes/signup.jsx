import {redirect, Form,useNavigate } from "react-router-dom"
import axios from 'axios'
import {useState} from 'react'
import { useEffect } from "react";
const access_token=window.localStorage.getItem("access_token")
export async function action({request}){
    return redirect('/')
}
export default function SignUp(){
    const [progressPage,setProgressPage]=useState(0)
    const [lat,setLat]=useState()
    const [lon,setLon]=useState()
    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } 
      }
      function showPosition(position) {
        setLat(position.coords.latitude)
        setLon(position.coords.longitude)
      }
    useEffect(()=>{
        getLocation()
    },[])
    const [values,setValues]=useState({username:"",firstname:"",lastname:"",password:"",role:"",subcity:"",city:"",phoneNum:"",email:"",profileImg:"",})

    function getFormData(object) {
        const formData = new FormData();
        Object.keys(object).forEach(key => formData.append(key, object[key]));
        return formData;
    }
    const handleSubmit=async()=>{
        const formValues={...values,"lat":lat,"lon":lon}
        const formData=getFormData(formValues)
        const apiUrl="http://localhost:3500/register/"
        const res=await axios.post(apiUrl,formData,{
            headers:{
                "Authorization":"Bearer " + access_token
            }
        })
        console.log("before redirect ")
        return redirect('./');
    }
    return(
        <div>
            <h2>Sign up</h2>
            <Form method="post"  encType="multipart/form-data" onSubmit={handleSubmit}>
            {progressPage===0 && <div>
                <label htmlFor="username"></label>
                <input type="text" name="username" value={values.username} id="username" placeholder="username" onChange={(e)=>setValues({...values,"username":e.currentTarget.value})}/><br />
                <label htmlFor="firstname"></label>
                <input type="text" name="firstname" value={values.firstname} id="firstname" placeholder="first name" onChange={(e)=>setValues({...values,"firstname":e.currentTarget.value})}/><br />
                <label htmlFor="lastname"></label>
                <input type="text" name="lastname" value={values.lastname} id="lastname" placeholder="last name" onChange={(e)=>setValues({...values,"lastname":e.currentTarget.value})}/> <br />
                <label htmlFor="password"></label>
                <input type="text" name="password" value={values.password} id="password" placeholder="password" onChange={(e)=>setValues({...values,"password":e.currentTarget.value})}/><br />
            </div> }
            {progressPage===1 && <div>
                <label htmlFor="role" value={values.role}></label>
                <input type="radio" name="role" value={2001} id="costumer" onChange={(e)=>setValues({...values,"role":e.currentTarget.value})}/>Consumer <br />
                <input type="radio" name="role" value={5508} id="retailer" onChange={(e)=>setValues({...values,"role":e.currentTarget.value})}/>Retailer <br />
                <label htmlFor="subcity"></label>
                <input type="text" name="subcity" value={values.subcity} id="subcity" placeholder="address" onChange={(e)=>setValues({...values,"subcity":e.currentTarget.value})}/> <br />
                <label htmlFor="city"></label>
                <input type="text" name="city" value={values.city} id="city" placeholder="city" onChange={(e)=>setValues({...values,"city":e.currentTarget.value})}/>
            </div>}
            {progressPage===2 && <div>
                <label htmlFor="phoneNum"></label>
                <input type="number" name="phoneNum" value={values.phoneNum} id="phoneNum" placeholder="phoneNum" onChange={(e)=>setValues({...values,"phoneNum":e.currentTarget.value})} /> <br />
                <label htmlFor="email"></label>
                <input type="text" name="email" value={values.email} id="email" placeholder="email" onChange={(e)=>setValues({...values,"email":e.currentTarget.value})}/> <br />
                <label htmlFor="profileImg" ></label>
                <input type="file" name="profileImg"  onChange={(e)=>setValues({...values,"profileImg":e.currentTarget.files[0]})}/><br />
                <input type="submit" placeholder="submit"/>
                </div>
                }
            </Form>
            <br />
            {progressPage<3 && progressPage>0 && <button onClick={()=>setProgressPage(progressPage-1)}>previous</button>}
            {progressPage<2 && progressPage >=0 && <button onClick={()=>setProgressPage(progressPage+1)}>next</button>}
        </div>
    )
}