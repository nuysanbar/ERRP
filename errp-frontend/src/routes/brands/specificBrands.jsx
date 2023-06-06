import { useLoaderData, Outlet,NavLink} from "react-router-dom"
import axios from "axios"
import {TiTick} from 'react-icons/ti'
const access_token=window.localStorage.getItem("access_token")
export async function loader({params}){
    const apiUrl=`http://localhost:3500/home/products/brands/${params.type}/${params.brand}`
    const res= await axios.get(apiUrl,{
        headers:{
            "Authorization":"Bearer "+ access_token
        }
    })
    const response=res.data
    console.log(response)
    console.log("brands loader is being called")
    return response
}
export default function SpecificBrand({isSearch}){
    const response=useLoaderData()
    return (
        <div className="specificBrands">
            <div className="specificBrandTitleContainer">
            {response && response.map((item)=>{
                return (<div key={item._id} style={{display:"inline-block", verticalAlign:"top"}}>{isSearch===false?<CategoriesComponent item={item}/>:<SearchComponent item={item}/>}</div>)
            })}
            </div>
            <Outlet />
        </div>
    )
}
function SearchComponent({item}){
    const details=item.details.split(",")
    return(
    <NavLink to={`/home/search/${item.barcode}`} key={item.barcode} className="searchComponent">
            <img src={`http://localhost:3500/products/${item.imgUrl[0]}`} alt="product image" />
            {details.map((detail)=>{
            return <span key={detail} className='detail'><br /><span><TiTick/></span>{detail} </span>
          })}
            <h3>{item.brandName}</h3>
    </NavLink>)
}
function CategoriesComponent({item}){
    return (
        <NavLink to={`/home/brands/${item.type}/${item.brand}/${item.barcode}`} key={item.barcode} className={({ isActive, isPending }) =>
                            isActive
                            ? "specificBrandTitle active"
                            : isPending
                            ? "specificBrandTitle pending"
                            : "specificBrandTitle"
                        }>
            <img src={`http://localhost:3500/products/${item.imgUrl[0]}`} alt="product image" />
            <p>{item.brandName}</p>
         </NavLink>
    )
}