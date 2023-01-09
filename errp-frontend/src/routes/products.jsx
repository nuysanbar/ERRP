import { useLoaderData,Form,redirect } from "react-router-dom";
import axios from "axios";
export async function loader(){
    const access_token=window.localStorage.getItem('access_token');
    const apiUrl=`http://localhost:3500/home/products`
    const res = await axios.get(apiUrl,{
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      })
    const response=res.data
    return response;
}

export async function action({request}){
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const access_token=window.localStorage.getItem('access_token')
    const apiUrl='http://localhost:3500/home/products'
    const response = await axios.post(apiUrl,updates,
      {
        headers:{
          "Authorization":"Bearer " + access_token
        }
      }
    )
    console.log(response.data)
    if(response.statusText==="OK" && response.data){
        window.localStorage.setItem('barcode',updates.barcode)
        if(response.data.message===true){
          return redirect('/home/products/addOld')
        }else{
          return redirect('/home/products/addNew')
        }
    }
    return 0;
}

export default function Products(){
    const response=useLoaderData()
    return (
        <>
        <Form method="post">
          <input type="text" name="barcode" placeholder="barcode"/>
          <button type="submit">add</button>
        </Form>
        <h1>Products section  {response.products}</h1>
        </>
    )
}