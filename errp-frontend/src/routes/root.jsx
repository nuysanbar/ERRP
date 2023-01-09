import { Outlet,useLoaderData,Form,redirect,NavLink} from "react-router-dom";

export default function Root() {
    return (
      <>
        <div className="root">
            <NavLink to={"/signIn"}>
                signIn
            </NavLink>
            <NavLink to={"/signUp"}>
                signUp
            </NavLink>
        </div>
        <div id="detail"><Outlet /></div>
      </>
    );
  }