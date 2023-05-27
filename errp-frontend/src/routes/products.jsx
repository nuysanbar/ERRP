
import { Form,redirect,Outlet } from "react-router-dom";
import axios from "axios";
const access_token=window.localStorage.getItem('access_token')
export async function loader(){
  const apiUrl='http://localhost:3500/home/products'
  const response=await axios.get(apiUrl,{
    headers:{
      "Authorization":"Bearer " + access_token
    }
  })
  console.log(response)
  return response
}

export async function action({request}){
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
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
    return (
        <>
        <Form method="post">
          <input type="text" name="barcode" placeholder="barcode"/>
          <button type="submit">add</button>
        </Form>
        <Outlet />
        </>
    )
}