import { Form,redirect ,NavLink} from "react-router-dom"
import axios from 'axios'
import jwt from 'jwt-decode'
export async function action({request}){
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const apiUrl='http://localhost:3500/auth/'
    const response = await axios.post(apiUrl,updates)
    console.log(response)
    const basicData={
        image:response.data.foundUser.imgUrl,
        firstName:response.data.foundUser.firstname
    }
    if(response.statusText==="OK"){
        window.localStorage.setItem('access_token',response.data.access_token)
        window.localStorage.setItem('basic_data',JSON.stringify(basicData))
        const user=jwt(response.data.access_token);
        const userRole=user.userInfo.roles
        if(userRole=="3011"){
            return redirect('/delivery/')
        }
        else if (userRole=="3030"){
            return redirect('/admin/')
        }
        else{
            return redirect('/home/')
        }
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
                <input type="pasword" name="password" id="password" placeholder="password" /><br />
                <button type="submit">Sign In</button>
            </Form>
            <p>Don't have an account </p><div className="root">
            <NavLink to={"/signUp"}>
                signUp
            </NavLink>
        </div>
        </div>
    )
}