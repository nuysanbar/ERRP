import { Form,redirect,useLoaderData,useNavigate } from "react-router-dom";
import axios from "axios";
import jwt from 'jwt-decode'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export async function action({request}){
    const formData = await request.formData();
    const access_token=window.localStorage.getItem('access_token')
    const apiUrl='http://localhost:3500/home/profile/update'
    const response=await axios.post(apiUrl,formData ,{
        headers:{
            "Authorization":"Bearer "+access_token
        }
    })
    console.log(response.data)
    console.log("Profile edit save button action called")
    const user=jwt(access_token);
    const userRole=user.userInfo.roles
    if(userRole=="3011"){
        return redirect('/delivery/profile')
    }
    else if (userRole=="3030"){
        return redirect('/admin/profile')
    }
    else{
        return redirect('../')
    }
}
export default function ProfileEdit(){
    const response=useLoaderData()
    const navigate=useNavigate()
    return (
        <div className="form-box" style={{margin:"20px 0 20px 50px"}}>
            <Form method="post"  encType="multipart/form-data" >
                <TextField margin="normal"
                id="firstname"
                label="firstname"
                name="firstname"
                variant="outlined"/><br />
                <TextField margin="normal"
                    id="middlename"
                    label="lastname"
                    name="lastname"
                    variant="outlined"/><br />
                <TextField margin="normal"
                    id="city"
                    label="city"
                    name="city"
                    variant="outlined"/><br />
                <TextField margin="normal"
                    id="subcity"
                    label="subcity"
                    name="subcity"
                    variant="outlined"/><br />
                <TextField margin="normal"
                    id="phone"
                    label="phone no"
                    name="phone"
                    type="number"
                    variant="outlined"/><br />
                <TextField margin="normal"
                    id="email"
                    label="email"
                    name="email"
                    type="email"
                    variant="outlined"/><br />
                <TextField margin="normal"
                    id="password"
                    label="password"
                    name="password"
                    type="password"
                    variant="outlined"/><br />
                <TextField margin="normal"
                    id="profileImg"
                    name="profileImg"
                    type="file"
                    style={{width:"250px"}}
                    variant="outlined"/><br />
                <Button variant="outlined" style={{color:"var(--bl)",marginRight:"10px",borderColor:"var(--bl)"}} onClick={()=>navigate(-1)}>cancel</Button>   
                <Button type="submit" variant="contained" style={{backgroundColor:"var(--bl)"}}>apply</Button>
            </Form>
        </div> 
    )
}