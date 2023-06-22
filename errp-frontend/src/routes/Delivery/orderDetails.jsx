import axios from 'axios'
const access_token=window.localStorage.getItem('access_token')
export async function loader({params}){
    const apiUrl=`http://localhost:3500/delivery/getOrderDetail/${params.id}`
    const res = await axios.get(apiUrl,{
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      })
    console.log(res.data)
    return res.data
}
export async function action(request,params){
    return 0;
}
export default function OrderDetails({value}){
    return(
        <div>order detail of {value}</div>
    )
}