import { Outlet,NavLink,Link, useLoaderData} from "react-router-dom";
import { useState } from "react";
import {AiOutlineSetting,AiOutlineUsergroupAdd} from "react-icons/ai"
import {BiLogOut} from "react-icons/bi"
import {BsCaretDown,BsCashCoin} from "react-icons/bs"
import {FcBusinessman,FcElectronics} from 'react-icons/fc'
import {TbTruckDelivery} from "react-icons/tb"
import {MdPendingActions} from "react-icons/md"
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
          <Link to={'/admin'}>
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
            <NavLink to={"/admin/pendingProducts"} className="combineSymbolText" style={{borderColor:"orange"}}>
              <span style={{color:"orange"}}><MdPendingActions /></span> <br />
                pending
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
  export function DataHolder(){
    const response=useLoaderData()
    return(
      <div style={{display:"inline-block",textAlign:"center"}}>
        <RectangleComponent background={"rgba(4, 24, 66,0.5)"} color={"white"} name={"Total Orders"} dataValue={response[0].totalOrders} imgUrl={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8erehh1z-cwW_T-dTa6ebFWv9DnOrcYO4YFuUruw&s"}/>
        <RectangleComponent background={"rgba(4, 24, 66,0.6)"} color={"lightgreen"} name={"Total Orders Delivered"} dataValue={response[1].totalOrdersDelivered} imgUrl={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB2V5m6YgXZvwnK-VYgmGgdbxngNPQ0Ao8PjcraAE&s"}/>
        <RectangleComponent background={"rgba(4, 24, 66,0.7)"} color={"yellow"} name={"Revenue"} dataValue={Math.round(response[5].revenue)} imgUrl={"https://cdn-icons-png.flaticon.com/512/4577/4577278.png"}/>
        <RectangleComponent background={"rgba(4, 24, 66,0.8)"} color={"red"} name={"delivery man"} dataValue={response[2].deliverers} imgUrl={"https://png.pngtree.com/png-vector/20210525/ourlarge/pngtree-the-delivery-man-icon-rides-a-motorbike-png-image_3343631.jpg"}/>
        <RectangleComponent background={"rgba(4, 24, 66,0.9)"} color={"aqua"} name={"customers"} dataValue={response[3].consumers} imgUrl={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkwx72sYi5sNeQzrKLGW8grJ1PhtZyf2zZZPULZE0&s"}/>
        <RectangleComponent background={"rgba(4, 24, 66)"} color={"orange"} name={"retailers"} dataValue={response[4].retailers} imgUrl={"https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/businessman.png"}/>
      </div>
    )
  }
  const RectangleComponent=({name,dataValue,imgUrl,background,color})=>{
    return(
      <div style={{backgroundColor:`${background}`,color:`${color}`,width:"300px",height:"170px",padding:"20px",margin:"20px",display:"inline-block",borderRadius:"20px"}}>
        <img src={imgUrl} alt="dataimg" style={{display:"block",width:"40px",height:"40px",borderRadius:"40px",margin:"0 auto"}} />
        <h3 style={{textAlign:"center"}}>{name}</h3>
        <h4 style={{textAlign:"center"}}>{dataValue}</h4>
      </div>
    )
  }