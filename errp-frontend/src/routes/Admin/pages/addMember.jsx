import {redirect, Form,useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
import {useState} from 'react'
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select  from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
const access_token=window.localStorage.getItem("access_token")
export async function action({request}){
    const formData = await request.formData();
    const apiUrl="http://localhost:3500/admin/addMember"
        const res=await axios.post(apiUrl,formData,{
            headers:{
                "Authorization":"Bearer " + access_token
            }
        })
    console.log(res.data)
    return redirect('/admin')
}
export default function AddMember(){
    const navigate=useNavigate()
    const [toggleRetailer,setToggleRetailer]=useState(false)
    const [values,setValues]=useState({username:"",firstname:"",lastname:"",password:"",role:"",subcity:"",city:"",phoneNum:"",email:"",profileImg:"",lat:"",lon:"",sellerCode:"",pdtToken:"",license:""})
    const handleRole=(e)=>{
        setValues({...values,"role":e.target.value})
        if(e.target.value==5508){
        setToggleRetailer(true)
        }else{
            setToggleRetailer(false)
        }
        return 0;
    }
    function getFormData(object) {
        const formData = new FormData();
        Object.keys(object).forEach(key => formData.append(key, object[key]));
        return formData;
    }
    const handleSubmit=async()=>{
        const formValues={...values}
        const formData=getFormData(formValues)
        const apiUrl="http://localhost:3500/admin/addMember"
        const res=await axios.post(apiUrl,formData,{
            headers:{
                "Authorization":"Bearer " + access_token
            }
        })
        console.log("before redirect ")
        return redirect('../');
    }
    return(
        <div style={{marginLeft:"30px",width:"100%"}}>
        <div >
            <Form   method="post" encType="multipart/form-data" style={{width:"100%"}} >
            <div style={{width:"30%",display:"inline-block"}}>
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
              label="First Name"
              name="firstname"
              variant="outlined"
              value={values.firstname}
              onChange={(e)=>setValues({...values,"firstname":e.currentTarget.value})}/> <br />
              <TextField margin="normal"
              required
              id="lastname"
              label="Last Name"
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
              <FormControl>
                    <InputLabel id="demo-simple-select-label">role</InputLabel>
                    <Select name="role" id="role" required style={{width:"210px"}} label="role" value={values.role} 
                    onChange={(e)=>handleRole(e)}>
                        <MenuItem value={3011}>delivery ppl</MenuItem>
                        <MenuItem value={5508}>retailer</MenuItem>
                    </Select> 
               </FormControl><br />
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
                </div>
                <div style={{width:"30%",display:"inline-block",verticalAlign:"top"}}>
              <TextField margin="normal"
                required
                id="lat"
                label="latitude"
                name="lat"
                variant="outlined"
                value={values.lat}
                onChange={(e)=>setValues({...values,"lat":e.currentTarget.value})}/> <br />
                <TextField margin="normal"
                required
                id="lon"
                label="longitude"
                name="lon"
                variant="outlined"
                value={values.lon}
                onChange={(e)=>setValues({...values,"lon":e.currentTarget.value})}/> <br />
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
                {toggleRetailer && <>
                <TextField margin="normal"
                required
                id="sellerCode"
                label="seller code"
                name="sellerCode"
                variant="outlined"
                value={values.sellerCode}
                onChange={(e)=>setValues({...values,"sellerCode":e.currentTarget.value})}/> <br />
                <TextField margin="normal"
                required
                id="pdtToken"
                label="pdt token"
                name="pdtToken"
                variant="outlined"
                value={values.pdtToken}
                onChange={(e)=>setValues({...values,"pdtToken":e.currentTarget.value})}/> <br /></>}
               <label htmlFor="profileImg" >Profile</label><br />
                <input type="file" name="profileImg"  onChange={(e)=>setValues({...values,"profileImg":e.currentTarget.files[0]})} required/><br />
                <Button variant="outlined" style={{color:"var(--bl)",marginRight:"10px",borderColor:"var(--bl)"}} onClick={()=>navigate(-1)}>cancel</Button>   
                <Button type="submit" variant="contained" style={{backgroundColor:"var(--bl)",width:"100px",textAlign:"center",margin:"10px"}}>submit</Button>
                </div>
            </Form>
            <br />
        </div>
        </div>
    )
}