import { Outlet,NavLink,Link} from "react-router-dom";
import { useState } from "react";
import {AiOutlineSetting} from "react-icons/ai"
import {BiLogOut} from "react-icons/bi"
import {BsCaretDown,BsList,BsListCheck} from "react-icons/bs"
import {FaHistory} from "react-icons/fa"
import Footer from "../footer"
export default function Delivery() {
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
        <div className="root">
         <Link to="/home">
                <span style={{fontStyle:"italic"}}>E<span >R<sup>2</sup></span>P</span>
          </Link>
          <NavLink to={"/delivery/orders"} className="combineSymbolText">
           <BsList/> <br />
                Orders
            </NavLink>
            <NavLink to={"/delivery/myselection"} className="combineSymbolText">
            <BsListCheck/> <br />
                InProgress
            </NavLink>
            <NavLink to={"/delivery/history"} className="combineSymbolText">
            <FaHistory/> <br />
                history
            </NavLink>
            <div className="menu">
              <div onClick={changeClassName} className="toggle">
                  <img src={`http://localhost:3500/${basicData.image}`} alt="profileImg" /> <br />
                  <span>me<BsCaretDown className="drop"/></span>
              </div>
              <div className={`hiddenOptions ${classValue}`} onClick={changeClassName}>
                  <NavLink to={"/delivery/profile"}>
                     <AiOutlineSetting/> Settings
                  </NavLink>
                  <NavLink to={"/delivery/logout"}>
                      <BiLogOut/> Logout
                  </NavLink>
              </div>
            </div>
        </div>
        <div id="detail"><Outlet /></div>
        </div>
        <div style={{marginTop:"50px"}}><Footer /></div>
      </>
    );
  }