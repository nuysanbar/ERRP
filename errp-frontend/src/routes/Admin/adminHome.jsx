import { Outlet,NavLink,Link} from "react-router-dom";
import { useState } from "react";
import {AiOutlineSetting} from "react-icons/ai"
import {BiLogOut} from "react-icons/bi"
import {BsCaretDown} from "react-icons/bs"
import { BiCategory } from "react-icons/bi";
import Footer from "../footer"
export default function Admin() {
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
                <span style={{fontStyle:"italic",fontSize:"small"}}>E<span >R<sup>2</sup></span>P</span>
          </Link>
          <NavLink to={"/admin"} className="combineSymbolText">
              <span><BiCategory /></span> <br />
                users
            </NavLink>
            <NavLink to={"/admin/products"} className="combineSymbolText">
              <span><BiCategory /></span> <br />
                products
            </NavLink>
            <div className="menu">
              <div onClick={changeClassName} className="toggle">
                  <img src={`http://localhost:3500/${basicData.image}`} alt="profileImg" /> <br />
                  <span>me<BsCaretDown className="drop"/></span>
              </div>
              <div className={`hiddenOptions ${classValue}`} onClick={changeClassName}>
                  <NavLink to={"/admin/profile"}>
                     <AiOutlineSetting/> Settings
                  </NavLink>
                  <NavLink to={"/admin/logout"}>
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