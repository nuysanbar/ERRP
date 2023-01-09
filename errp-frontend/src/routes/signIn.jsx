import { Form,redirect } from "react-router-dom"
import axios from 'axios'
export async function action({request}){
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const apiUrl='http://localhost:3500/auth/'
    const response = await axios.post(apiUrl,updates)
    console.log(response)
    if(response.statusText==="OK"){
        window.localStorage.setItem('access_token',response.data.access_token)
        return redirect('/home/')
    }
    return 0;
}
export default function SignIn(){
    return(
        <div>
            <Form method="post">
                <label htmlFor="username"></label>
                <input type="text" name="username" id="username" placeholder="username"/><br />
                <label htmlFor="password"></label>
                <input type="text" name="password" id="password" placeholder="password" /><br />
                <button type="submit">Sign In</button>
            </Form>
        </div>
    )
}