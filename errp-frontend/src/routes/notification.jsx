import axios from "axios"
export async function loader(){
    const access_token=window.localStorage.getItem("access_token")
    const apiUrl='http://localhost:3500/home/notifications'
    const res=await axios.get(apiUrl,{
        headers:{
            "Authorization":"Bearer "+access_token
        }
    })
    console.log(res.data)
    return 0;
}
export default function Notification(){
    return (
        <div>Notifications Here</div>
    )
}