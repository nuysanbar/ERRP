import { Form,redirect,useLoaderData,useNavigate } from "react-router-dom";
import axios from "axios";
export async function action({request}){
    const formData = await request.formData();
    const access_token=window.localStorage.getItem('access_token')
    const apiUrl='http://localhost:3500/home/profile/update'
    const response=await axios.post(apiUrl,formData ,{
        headers:{
            "Authorization":"Bearer "+access_token
        }
    })
    console.log(response.data)
    console.log("Profile edit save button action called")
    return redirect('/home/profile')
}
export default function ProfileEdit(){
    const response=useLoaderData()
    const navigate=useNavigate()
    return (
        <div>
            <Form method="post"  encType="multipart/form-data" >
                <label htmlFor="full name">full-name</label> 
                <input type="text" name="fullname" id="full-name" placeholder={response.username} /><br />
                <label htmlFor="profileImg">profile pic : </label>
                <input type="file" name="profileImg" /><br />
                <label htmlFor="password">password : </label>
                <input type="text" name="password" id="password" placeholder="password" /><br />
                <input type="button" onClick={()=>navigate(-1)} value="cancel"/>
                <button type="submit">Save</button>
            </Form>
        </div> 
    )
}