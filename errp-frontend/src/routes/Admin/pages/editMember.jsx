import { Form,redirect,useLoaderData,useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const access_token=window.localStorage.getItem('access_token')
export async function loader({params}){
    const apiUrl=`http://localhost:3500/admin/getUser/${params.id}`
    const response=await axios.get(apiUrl,{
        headers:{
            "Authorization":"Bearer "+access_token
        }
    })
    var isRetailer,role=response.data.roles;
    if(response.data.roles==5508){
        isRetailer=true
    }else{
        isRetailer=false
    }
    return {isRetailer,role};
}
export async function action({request,params}){
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const apiUrl=`http://localhost:3500/admin/editMember/edit/${params.id}`
    const response=await axios.put(apiUrl,updates ,{
        headers:{
            "Authorization":"Bearer "+access_token
        }
    })
    console.log(response.data)
    return redirect("/admin/")
}
export default function EditMember(){
    const navigate=useNavigate()
    const {isRetailer,role}=useLoaderData();
    return (
        <div className="form-box" style={{margin:"20px 0 20px 50px"}}>
            <Form method="put" >
            <TextField margin="normal"
                type="hidden"
                id="role"
                label="role"
                name="role"
                value={role}
               /> <br />
            <TextField margin="normal"
               
                id="lat"
                label="latitude"
                name="lat"
                variant="outlined"/> <br />
                <TextField margin="normal"
                id="lon"
                label="longitude"
                name="lon"
                variant="outlined"/> <br />
                {isRetailer && <>
                <TextField margin="normal"
                id="sellerCode"
                label="seller code"
                name="sellerCode"
                variant="outlined"/> <br />
                <TextField margin="normal"
                id="pdtToken"
                label="pdt token"
                name="pdtToken"
                variant="outlined"/> <br /></>}
                <Button variant="outlined" style={{color:"var(--bl)",marginRight:"10px",borderColor:"var(--bl)"}} onClick={()=>navigate(-1)}>cancel</Button>   
                <Button type="submit" variant="contained" style={{backgroundColor:"var(--bl)"}}>apply</Button>
            </Form>
        </div> 
    )
}