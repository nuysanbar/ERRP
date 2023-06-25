import {redirect, Form,NavLink } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios'
import {useState} from 'react'
import { useEffect } from "react";
export async function action({request}){
    const formData = await request.formData();
    const apiUrl="http://localhost:3500/register/"
    const res=await axios.post(apiUrl,formData)
    const response=res.data
    console.log(response)
    return redirect('../')
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
    return(
        <div className="signUpContainer">
        <div className="signUp">
            <Typography component="h1" variant="h5" style={{textAlign:"center"}}>
                Sign up
            </Typography>
            <Form method="post"  encType="multipart/form-data">
            <input type="hidden" value={lat} name="lat" />
            <input type="hidden" value={lon} name="lon" />
            <TextField margin="normal"
              required
              id="username"
              label="username"
              name="username"
              autoFocus variant="outlined"
              value={values.username}
              onChange={(e)=>setValues({...values,"username":e.currentTarget.value})}/> <br />
              <TextField margin="normal"
              required
              id="firstname"
              label="first name"
              name="firstname"
              variant="outlined"
              value={values.firstname}
              onChange={(e)=>setValues({...values,"firstname":e.currentTarget.value})}/> <br />
              <TextField margin="normal"
              required
              id="lastname"
              label="last name"
              name="lastname"
              variant="outlined"
              value={values.lastname}
              onChange={(e)=>setValues({...values,"lastname":e.currentTarget.value})}/> <br />
              <TextField margin="normal"
              required
              id="password"
              label="password"
              name="password"
              variant="outlined"
              type="password"
              value={values.password}
              onChange={(e)=>setValues({...values,"password":e.currentTarget.value})}/> <br />
              {/*  after */}
              <input type="hidden" name="role" value={values.role=2001} id="costumer" onChange={(e)=>setValues({...values,"role":e.currentTarget.value})}/>
                <TextField margin="normal"
                required
                id="subcity"
                label="sub city"
                name="subcity"
                variant="outlined"
                value={values.subcity}
                onChange={(e)=>setValues({...values,"subcity":e.currentTarget.value})}/> <br />
              <TextField margin="normal"
                required
                id="city"
                label="city"
                name="city"
                variant="outlined"
                value={values.city}
                onChange={(e)=>setValues({...values,"city":e.currentTarget.value})}/> <br />
                <TextField margin="normal"
                required
                id="phoneNum"
                label="Phone number"
                name="phoneNum"
                variant="outlined"
                type="number"
                value={values.phoneNum}
                onChange={(e)=>setValues({...values,"phoneNum":e.currentTarget.value})}/> <br />
                <TextField margin="normal"
                required
                id="email"
                label="email"
                name="email"
                variant="outlined"
                type="email"
                value={values.emailsubcity}
                onChange={(e)=>setValues({...values,"email":e.currentTarget.value})}/> <br />
                <label htmlFor="email"></label>
                <label htmlFor="profileImg" ></label>
                <input type="file" name="profileImg"  onChange={(e)=>setValues({...values,"profileImg":e.currentTarget.files[0]})}/><br />
                <Button type="submit" variant="contained" style={{backgroundColor:"var(--bl)",width:"100px",textAlign:"center",margin:"10px"}}>submit</Button>
                <NavLink to={'/'} variant="body2"style={{color:"var(--bl)",fontSize:"small"}}>
                  {"have an account? Sign In"}
                </NavLink>
            </Form>
            <br />
        </div>
        </div>
    )
}