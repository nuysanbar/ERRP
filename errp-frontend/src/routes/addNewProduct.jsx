import { Form,redirect ,useLoaderData} from "react-router-dom"
import axios from 'axios'
import { useState } from "react";
const access_token=window.localStorage.getItem('access_token')

export async function loader(){
    const apiUrl='http://localhost:3500/home/products/brands'
    const res= await axios.get(apiUrl,{
        headers:{
            "Authorization":"Bearer "+ access_token
        }
    })
    const response=res.data
    console.log(response)
    console.log("brands loader is being called")
    return response
}

export async function action({request}){
    const formData = await request.formData();
    // const updates=Object.fromEntries(formData)
    const apiUrl='http://localhost:3500/home/products/addNew'
    const res=await axios.post(apiUrl,formData,{
        headers:{
            "Authorization":"Bearer "+access_token
        }
    })
    const response=res.data
    console.log(response)
    return redirect('../products');
}
export default function AddNewProduct(){
    const barcode=window.localStorage.getItem('barcode');
    const [electronics]=useState(useLoaderData()[0])
    const [selectedType,setSelectedType]=useState(electronics[0].type)
    const newValue=electronics.find((item)=>item.type===selectedType)
    return(
        <div>
            <Form method="post"  encType="multipart/form-data">
                <label htmlFor="barcode"></label>
                <input type="text" name="barcode"  id="username" readOnly defaultValue={barcode} placeholder={barcode}/><br />
                <label htmlFor="brandName"></label>
                <input type="text" name="brandname" id="brandname" placeholder="brand name"/> <br />
                <select name="type" id="type" onChange={(e)=>setSelectedType(e.currentTarget.value)} >
                   <option value="">Select category</option>
                    {electronics.map((item)=>{
                        return (<option value={item.type} key={item.type}>{item.type}</option>)
                    })}
                </select> <br /><br />
                <select name="brand" id="brand">
                    <option value="">Select type </option>
                    {newValue.brand.map((item)=>{
                       return (<option value={item} key={item}>{item}</option>)
                    })}
                </select> <br />  <br />
                <textarea name="details" id="details" cols="30" rows="7" placeholder="Details with comma eg resolution 4k, screen size 5'8"></textarea> <br />
                <select name="usedornew" id="usedornew">
                    <option value="new">New</option>
                    <option value="used">Used</option>
                </select> <br />
                <label htmlFor="price"></label>
                <input type="number" name="price" id="price" placeholder="price"/> <br />
                <label htmlFor="amount"></label>
                <input type="number" name="amount" id="amount" placeholder="available amount" /> <br />
                <label htmlFor="productImg"></label>
                <input type="file" accept="image/*" name="productImg" multiple/><br />
                <button type="submit">Add To Products List</button>
            </Form>
        </div>
    )
}