import { NavLink ,useLoaderData} from "react-router-dom"

export async function loader({params}){
    return params.id
}

export default function RetailerIsBanned(){
    const username=useLoaderData()
    return (
        <div style={{width:"700px",height:"400px",margin:"40px auto"}}>
        <img src={`https://en.pimg.jp/067/011/817/1/67011817.jpg`} alt="product image" style={{width:"100px",height:"100px",borderRadius:"100px",display:"block",margin:"0 auto"}} />
        <h4 style={{textAlign:"center",color:"var(--tbl)"}}>We are sorry to inform you that this <NavLink to={`/home/${username}`}>store</NavLink> is temporarily unavailable. We are working to resolve the issue and will provide an update as soon as possible.</h4>
        </div>
    )
}
