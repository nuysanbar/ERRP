import { Outlet,NavLink} from "react-router-dom";
import { useState } from "react";
import {AiOutlineSetting} from "react-icons/ai"

import {BiLogOut} from "react-icons/bi"
import {BsCaretDown} from "react-icons/bs"

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
          <span>- - - - - ERRP LOGO - - - - - - </span> 
          <NavLink to={"/delivery/orders"} className="combineSymbolText">
           <AiOutlineSetting/> <br />
                orders
            </NavLink>
            <NavLink to={"/delivery/myselection"} className="combineSymbolText">
            <AiOutlineSetting/> <br />
                selection
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
        <div className="company"><h1>Company Services</h1></div>
      </>
    );
  }