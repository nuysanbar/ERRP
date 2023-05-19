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
        <div className="form-box">
            <Form method="post"  encType="multipart/form-data" >
                <div className="input-box">
                    <input type="text" name="firstname" />
                    <label htmlFor="firstname">{response.firstname}</label>
                </div>
                <div className="input-box">
                    <input type="text" name="lastname" id="lastname" />
                    <label htmlFor="lastname">{response.lastname}</label>
                </div>
                <div className="input-box">
                    <input type="text" name="city" id="city" />
                    <label htmlFor="city">{response.city}</label>
                </div>
                <div className="input-box">
                    <input type="text" name="subcity" id="subcity" />
                    <label htmlFor="subcity">{response.subcity}</label>
                </div>
                <div className="input-box">
                    <input type="number" name="phone" id="phone" />
                    <label htmlFor="phone">{response.phoneNum}</label>
                </div>
                <div className="input-box">
                    <input type="email" name="email" id="email" />
                    <label htmlFor="email">{response.email}</label>
                </div>
                <div className="input-box">
                    <input type="password" name="password" id="password" />
                    <label htmlFor="password">password</label>
                </div>
                <label htmlFor="profileImg">change picture</label>
                <input type="file" name="profileImg" /> <br />
                <input type="button" onClick={()=>navigate(-1)} value="cancel"/>
                <button type="submit" className="submitBtn">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                    apply
                </button>
            </Form>
        </div> 
    )
}