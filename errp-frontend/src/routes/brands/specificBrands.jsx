import { useLoaderData, Outlet,NavLink} from "react-router-dom"
import axios from "axios"
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
                const path=isSearch===false?`/brands/${item.type}/${item.brand}`:"/search";
                return (
                    <NavLink to={`/home${path}/${item.barcode}`} key={item.barcode} className={({ isActive, isPending }) =>
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
            })}
            </div>
            <Outlet />
        </div>
    )
}