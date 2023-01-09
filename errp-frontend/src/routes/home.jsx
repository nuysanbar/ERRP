import { Outlet,useLoaderData,Form,NavLink} from "react-router-dom";
import axios  from "axios";
import jwt from 'jwt-decode'

export async function loader(){
    const access_token=window.localStorage.getItem('access_token');
    const apiUrl=`http://localhost:3500/home/`
    const res = await axios.get(apiUrl,{
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      })
    const user=jwt(access_token);
    const userRole=user.userInfo.roles
    return {userRole}
}
export default function Home() {
   const {userRole}=useLoaderData()
    return (
      <>
        <div className="root">
          <Form >
            <input type="search" placeholder="search" />
          </Form>
          {userRole===5508 &&  
          <>
            <NavLink to={"/home/products"}>
                products
            </NavLink>
            <NavLink to={"/home/dashboard"}>
                dashboard
            </NavLink>
            </>
           }
            <NavLink to={"/home/profile"}>
                profile
            </NavLink>
            <NavLink to={"/home/saved"}>
                saved
            </NavLink>
            <NavLink to={"/home/logout"}>
                logout
            </NavLink>
        </div>
        <div id="detail"><Outlet /></div>
      </>
    );
  }