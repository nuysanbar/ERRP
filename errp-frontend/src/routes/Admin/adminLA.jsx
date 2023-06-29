import axios from "axios";
import { redirect } from "react-router-dom";
const access_token=window.localStorage.getItem('access_token');
export async function dashboardDataLoader(){
  const apiUrl=`http://localhost:3500/admin2/dashbaord`
  const res = await axios.get(apiUrl,{
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
    })
  console.log(res.data)
  return res.data
}
export async function usersLoader(){
    const apiUrl=`http://localhost:3500/admin/getCustomers`
    const res = await axios.get(apiUrl,{
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      })
    console.log(res.data)
    return res.data
}
export async function retailersLoader(){
  const apiUrl=`http://localhost:3500/admin/getRetailers`
  const res = await axios.get(apiUrl,{
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
    })
  console.log(res.data)
  return res.data
}
export async function deliverersLoader(){
  const apiUrl=`http://localhost:3500/admin/getDeliverers`
  const res = await axios.get(apiUrl,{
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
    })
  console.log(res.data)
  return res.data
}
export async function productsAdminLoader(){
    const apiUrl=`http://localhost:3500/admin/getProducts`
    const res = await axios.get(apiUrl,{
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      })
    console.log(res.data)
    return res.data
}
export async function editProductAction({request}){
    const formData = await request.formData();
    const apiUrl='http://localhost:3500/admin/editProduct'
    const res=await axios.put(apiUrl,formData,{
        headers:{
            "Authorization":"Bearer "+access_token
        }
    })
    const response=res.data
    console.log(response)
    return redirect('../');
}