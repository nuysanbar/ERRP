import { Form,redirect } from "react-router-dom"
import axios from 'axios'
export async function action({request}){
    const formData = await request.formData();
    const access_token=window.localStorage.getItem('access_token')
    const apiUrl='http://localhost:3500/home/products/addNew'
    const response=await axios.post(apiUrl,formData,{
        headers:{
            "Authorization":"Bearer "+access_token
        }
    })
    return redirect('../products');
}
export default function AddNewProduct(){
    const barcode=window.localStorage.getItem('barcode');
    return(
        <div>
            <Form method="post"  encType="multipart/form-data">
                <label htmlFor="barcode"></label>
                <input type="text" name="barcode" id="username" readOnly defaultValue={barcode} placeholder={barcode}/><br />
                <label htmlFor="brandName"></label>
                <input type="text" name="brandname" id="brandname" placeholder="brand name"/> <br />
                <label htmlFor="model"></label>
                <input type="text" name="model" id="model" placeholder="model" /> <br />
                <label htmlFor="price"></label>
                <input type="text" name="price" id="price" placeholder="price"/> <br />
                <label htmlFor="amount"></label>
                <input type="number" name="amount" id="amount" placeholder="available amount" /> <br />
                <label htmlFor="productImg"></label>
                <input type="file" name="productImg" /><br />
                <button type="submit">Add To Products List</button>
            </Form>
        </div>
    )
}