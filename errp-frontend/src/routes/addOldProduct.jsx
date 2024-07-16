import { Form,redirect } from "react-router-dom"
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select  from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
export async function action({request}){
    const formData = await request.formData();
    const updates = Object.fromEntries(formData)
    const access_token=window.localStorage.getItem('access_token')
    const apiUrl='http://localhost:3500/home/products/addOld'
    const response=await axios.post(apiUrl,updates,{
        headers:{
            "Authorization":"Bearer "+ access_token
        }
    })
    return redirect("/home/products");
}
//to add already existing product into inventory
export default function AddOldProduct(){
    const barcode=window.localStorage.getItem('barcode');
    return(
        <div style={{margin:"20px 0 20px 50px"}}>
            <Form method="post">
                <TextField margin="normal"
                required
                type="hidden"
                id="barcode"
                label="barcode"
                name="barcode"
                variant="outlined"
                defaultValue={barcode}/> <br />
                <FormControl>
                    <InputLabel id="demo-simple-select-label">used or new</InputLabel>
                    <Select name="usedornew" id="usedornew" required style={{width:"210px"}} label="usedornew">
                        <MenuItem value="">none</MenuItem>
                            <MenuItem value="new">New</MenuItem>
                        <MenuItem value="used">Used</MenuItem>
                    </Select> 
               </FormControl><br />
               <TextField
                margin="normal"
                required
                id="price"
                label="price"
                name="price"
                type="number"
                /> <br />
                <TextField
                margin="normal"
                required
                id="amount"
                label="amount available"
                name="amount"
                type="number"
                /> <br />
                <Button type="submit" variant="contained" style={{backgroundColor:"var(--bl)"}}>Add To Products List</Button>
            </Form>
        </div>
    )
}
