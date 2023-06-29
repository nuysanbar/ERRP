import { Form,redirect ,useLoaderData,useNavigate} from "react-router-dom"
import axios from 'axios'
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import Select  from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
const access_token=window.localStorage.getItem('access_token')

export async function action({request,params}){
    const formData = await request.formData();
    const apiUrl=`http://localhost:3500/admin/editProduct/${params.id}`
    const res=await axios.put(apiUrl,formData,{
        headers:{
            "Authorization":"Bearer "+access_token
        }
    })
    const response=res.data
    console.log(response)
    return redirect('../status');
}
function EmptyTextarea() {
    const blue = {
      100: '#DAECFF',
      200: '#b6daff',
      400: '#3399FF',
      500: '#007FFF',
      600: '#0072E5',
      900: '#003A75',
    };
  
    const grey = {
      50: '#f6f8fa',
      100: '#eaeef2',
      200: '#d0d7de',
      300: '#afb8c1',
      400: '#8c959f',
      500: '#6e7781',
      600: '#57606a',
      700: '#424a53',
      800: '#32383f',
      900: '#24292f',
    };
     const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );

  return (
    <StyledTextarea
      maxRows={4}
      style={{width:"220px"}}
      aria-label="maximum height"
      placeholder="Details with comma example resolution 4k, screen size 5'8"
      name="details"
    />
  );
}
export default function EditProduct(){
    const [electronics]=useState(useLoaderData())
    const [selectedType,setSelectedType]=useState("")
    const [newValue,setNewValue]=useState(electronics[0])
    const [brand,setBrand]=useState("")
    const navigate=useNavigate()
    const handleChange=(e)=>{
      setSelectedType(e.target.value)
      setNewValue(electronics.find((item)=>item.type==e.target.value))
    }
    return(
        <div style={{margin:"20px 0 20px 50px"}}>
            <Form method="put" encType="multipart/form-data">
            <TextField margin="normal"
              autoFocus
              id="brandName"
              label="brand name"
              name="brandname"
             variant="outlined"/> <br />
             <FormControl>
                <InputLabel id="demo-simple-select-label">select categories</InputLabel>
             <Select
                name="type"
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                label="select categories"
                style={{width:"210px"}}
                value={selectedType}
                onChange={handleChange} 
                className="select"> 
            {electronics.map((item)=>{
                return (
                    <MenuItem value={item.type} key={item.type}>{item.type}</MenuItem>
                )
            })}
            </Select><br />
             </FormControl>
             <br />
             <FormControl>
               <InputLabel id="demo-simple-select-label">select type</InputLabel>
                <Select
                    name="brand"
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    label="select type"
                    style={{width:"210px"}}
                    value={brand}
                    onChange={(e)=>setBrand(e.target.value)} 
                    className="select">
                {newValue.brand.map((item)=>{
                    return (
                        <MenuItem value={item} key={item}>{item}</MenuItem>
                    )
                })}
                </Select><br />
             </FormControl>
             <br />
               <EmptyTextarea /> <br /> <br />
                <label htmlFor="productImg"></label>
                <input type="file" accept="image/*" name="productImg" multiple /><br />
                <Button variant="outlined" style={{color:"var(--bl)",marginRight:"10px",borderColor:"var(--bl)"}} onClick={()=>navigate(-1)}>cancel</Button> 
                <Button type="submit" variant="contained" style={{backgroundColor:"var(--bl)"}}>apply</Button>
            </Form>
        </div>
    )
}