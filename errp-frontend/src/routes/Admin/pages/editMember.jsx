import { Form,redirect,useLoaderData,useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export async function action({request,params}){
    const formData = await request.formData();
    const access_token=window.localStorage.getItem('access_token')
    const apiUrl='http://localhost:3500/admin/editMember'
    const response=await axios.post(apiUrl,formData ,{
        headers:{
            "Authorization":"Bearer "+access_token
        }
    })
    return redirect("./admin/users")
}
export default function EditMember(){
    const navigate=useNavigate()
    const [toggleRetailer,setToggleRetailer]=useState(false)
    return (
        <div className="form-box" style={{margin:"20px 0 20px 50px"}}>
            <Form method="post" >
            <TextField margin="normal"
                required
                id="lat"
                label="latitude"
                name="lat"
                variant="outlined"/> <br />
                <TextField margin="normal"
                required
                id="lon"
                label="longitude"
                name="lon"
                variant="outlined"/> <br />
                {toggleRetailer && <>
                <TextField margin="normal"
                required
                id="sellerCode"
                label="seller code"
                name="sellerCode"
                variant="outlined"/> <br />
                <TextField margin="normal"
                required
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