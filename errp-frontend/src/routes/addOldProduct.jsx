import { Form,redirect } from "react-router-dom"
import axios from 'axios'
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
    return redirect('../products');
}
export default function AddOldProduct(){
    const barcode=window.localStorage.getItem('barcode');
    return(
        <div>
            <Form method="post">
                <label htmlFor="barcode"></label>
                <input type="text" name="barcode" id="barcode" readOnly defaultValue={barcode} placeholder={barcode}/><br />
                <label htmlFor="price"></label>
                <input type="text" name="price" id="price" placeholder="price"/> <br />
                <label htmlFor="amount"></label>
                <input type="number" name="amount" id="amount" placeholder="available amount" /> <br />
                <button type="submit">Add To Products List</button>
            </Form>
        </div>
    )
}