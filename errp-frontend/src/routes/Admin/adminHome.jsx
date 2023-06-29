import { Outlet,NavLink,Link} from "react-router-dom";
import { useState } from "react";
import {AiOutlineSetting,AiOutlineUsergroupAdd} from "react-icons/ai"
import {BiLogOut} from "react-icons/bi"
import {BsCaretDown,BsCashCoin} from "react-icons/bs"
import { BiCategory } from "react-icons/bi";
import {FcBusinessman,FcElectronics} from 'react-icons/fc'
import {TbTruckDelivery} from "react-icons/tb"
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
          <Link >
                <span style={{fontStyle:"italic",fontSize:"small"}}>E<span >R<sup>2</sup></span>P</span>
          </Link>
          <NavLink to={"/admin/customers"} className="combineSymbolText" style={{borderColor:"pink"}}>
              <span style={{color:"pink"}}><AiOutlineUsergroupAdd /></span> <br />
                customers
            </NavLink>
            <NavLink to={"/admin/retailers"} className="combineSymbolText" style={{borderColor:"yellow"}}>
              <span><FcBusinessman /></span> <br />
                retailers
            </NavLink>
            <NavLink to={"/admin/deliverers"} className="combineSymbolText" style={{borderColor:"red"}}>
              <span style={{color:"red"}}><TbTruckDelivery /></span> <br />
                deliverers
            </NavLink>
            <NavLink to={"/admin/products"} className="combineSymbolText" style={{borderColor:"green"}}>
              <span><FcElectronics /></span> <br />
                products
            </NavLink>
            <NavLink to={"/admin/orders"} className="combineSymbolText" style={{borderColor:"aqua"}}>
              <span style={{color:"aqua"}}><BsCashCoin /></span> <br />
                orders
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