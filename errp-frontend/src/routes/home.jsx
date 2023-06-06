import { Outlet,useLoaderData,Form,NavLink,Link} from "react-router-dom";
import { useState } from "react";
import TemporaryDrawer from "./drawer";
import {AiOutlineShoppingCart,AiOutlineStar,AiOutlineSearch,AiOutlineSetting} from "react-icons/ai"
import {IoIosNotificationsOutline} from "react-icons/io"
import {BiCategory,BiLogOut,BiPackage,BiPurchaseTag} from "react-icons/bi"
import {BsCaretDown,BsGraphUp} from "react-icons/bs"
import {FaStore} from "react-icons/fa"
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
   const [classValue,setClassValue]=useState(null)
   const basicData=JSON.parse(window.localStorage.getItem('basic_data'));
   function changeClassName(){
    if(classValue=="options"){
      return setClassValue(null)
    }else{
      return setClassValue("options")
    }
   }
    return (
      <>
      <div className="rootContainer">
        <div className="root" >
          <Link to="/home">
                <span>- - - - - ERRP LOGO - - - - - - </span>
          </Link>
          <Form method="get" action="search">
            <input type="search" placeholder="search" id="search" name="search"/>
            <button className="searchIcon"><AiOutlineSearch/></button>
          </Form>
          <NavLink to={"/home/favorites"}  className={({ isActive, isPending }) =>
                      isActive
                        ? "combineSymbolText active"
                        : isPending
                        ? "combineSymbolText pending"
                        : "combineSymbolText"
                    }>
            <span ><AiOutlineStar /></span> <br />
            <div>favorites</div>
            </NavLink>
            <NavLink to={"/home/brands"} className="combineSymbolText">
              <span><BiCategory /></span> <br />
                categories
            </NavLink>
            {userRole===5508 &&  
                  <>
                    <NavLink to={"/home/products"} className="combineSymbolText">
                      <span> <FaStore/> </span> <br />
                     my store
                    </NavLink>
                    <NavLink to={"/home/dashboard"} className="combineSymbolText">
                      <span><BsGraphUp/></span> <br />
                        dashboard
                    </NavLink>
                    </>
                }
              <NavLink to={"/home/purchases"} className="combineSymbolText">
                <span><BiPurchaseTag/></span><br />
                purchases
              </NavLink>
            <div className="rightIcons">
              <NavLink to={"/home/saved"}>
                  <AiOutlineShoppingCart/>
              </NavLink>
              <NavLink to={"/home/notifications"}>
                  <IoIosNotificationsOutline />
              </NavLink>
            </div>
            <div className="menu">
              <div onClick={changeClassName} className="toggle">
                  <img src={`http://localhost:3500/${basicData.image}`} alt="profileImg" /> <br />
                  <span>me<BsCaretDown className="drop"/></span>
              </div>
              <div className={`hiddenOptions ${classValue}`} onClick={changeClassName}>
                  <NavLink to={"/home/profile"}>
                     <AiOutlineSetting/> settings
                  </NavLink>
                  <NavLink to={"/home/logout"}>
                      <BiLogOut/> Logout
                  </NavLink>
              </div>
            </div>
        </div>
        <div className="drawer" >
          <TemporaryDrawer basicData={basicData} userRole={userRole} />
        </div>
        <div id="detail"><Outlet /></div>
        </div>
        <div className="company"><h1>Company Services</h1></div>
      </>
    );
  }