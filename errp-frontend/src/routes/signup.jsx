import { Form,redirect } from "react-router-dom"
import axios from 'axios'
export async function action({request}){
    const formData = await request.formData();
    const apiUrl='http://localhost:3500/register/'
    const response=await axios.post(apiUrl,formData)
    return redirect('../signIn');
}
export default function SignUp(){
    return(
        <div>
            <Form method="post"  encType="multipart/form-data">
                <label htmlFor="username"></label>
                <input type="text" name="username" id="username" placeholder="username"/><br />
                <label htmlFor="profileImg"></label>
                <input type="file" name="profileImg" /><br />
                <label htmlFor="role"></label>
                <input type="radio" name="role" value={2001} id="costumer"/>Consumer <br />
                <input type="radio" name="role" value={5508} id="retailer"/>Retailer <br />
                <label htmlFor="password"></label>
                <input type="text" name="password" id="password" placeholder="password" /><br />
                <button type="submit">Sign Up</button>
            </Form>
        </div>
    )
}