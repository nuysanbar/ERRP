import { useLoaderData,NavLink,Outlet} from "react-router-dom";
import axios from "axios"

export default function ProductDetail(){
    const response=useLoaderData()
    return (
        <div>
        <div className="favoriteContainer">
            <div className="favorites">
                    <NavLink to={`/admin/products/${response.barcode}/status`} className={({ isActive, isPending }) =>
                            isActive
                            ? "singleFavorites active"
                            : isPending
                            ? "singleFavorites pending"
                            : "singleFavorites"
                        }>
                                <img style={{width:"30px",height:"30px",paddingTop:"15px",borderRadius:"30px"}} src={`data:image/png;base64,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`} alt="license" />
                        <p >status</p>
                     </NavLink>
                     <NavLink to={`/admin/products/${response.barcode}/retailers`} className={({ isActive, isPending }) =>
                    isActive
                      ? "singleFavorites active"
                      : isPending
                      ? "singleFavorites pending"
                      : "singleFavorites"
                  }>
                        <img style={{width:"30px",height:"30px",paddingTop:"15px",borderRadius:"30px"}} src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAAB6CAMAAABdu1dYAAABfVBMVEX///9SkcTz07wREiQAAABST3pJYngAAA5UlcmQkZZUUX3418D72sJLZXwAABZPjL1If6z5+flDd6EAABukQUJMhrXT09Py8vLjxbCul4ZOS3TIyMi9vb2gi3zszbbcv6qKiori4uImRFwKEhg+PFz1RzkvU3EeNUg4NlM3YIOvRUZ1Li+QOTpbW1tMTEyPfG/MsZ54aF0WJjM+bZMzAABbJCU3FhYeDA0QEBB9fX0tLS1sbG08Ojm+ixdoWku7o5FCOTBSRz0fHi4tLEOsrKsoNUE5TF2enp5NTVUdISFXKyyOWluXeXpQDxF/LS2gNTZBAAAmAABNPj6KKyxlVFRFERI5LSCMfGRlUzN1ZU2UcjDpqxaRZwBnUSceFw55PTvXmw9+WQBZPQC1hnn/wCGweQCAbElFNBAsIAVvUxHqw5afglrvuWAiIEEOCzEAHzYANVNoJWtCCEW4VL06FzqeSKIkACe0Mid7HhZqPjzUOy5hAACUJB0AHyBmHxlbMRJpAAAQv0lEQVRogcWaiWPaWHrAwf5sy0iYyyBuBMJgDOIQi40Q5jKHyTaeZGbj7o5d1nEnzaRbj7PdtplmdvK393s6QIDkiEzTvsRc0nu/953vew8cjo1bbCJM4dnv/2EScqTjwzi7+Qhf0CY8PL86PCxeffPNi2efXr54/lz++mD229+9Kh2WisWTw8OTw5PSyWGx+N23X5ub/vabEwQWS4f4gNxDnMFh4zv5q0JjwukVclDFZ42Tw9Kzw9Jh47DUQIHTX5E6BHhVLF2Vrk6vSnBaKhVPUezTk7NisRTjBOkrodMAZ88aV6VG8aTRaJyeNorkPzRKZ40//+ElAIS+CnYfCScEWmqcIK50Bqf4D9tZo3RFnptfxbOEV0gtHRahgWiUsgHzVrpqnOGT9L/CYUPxeCyEIvh85G35VfEUPfgE7XqG4p2eLrDFkoJtKeKSu9kY6fsl0ofkdq933e/0JaHdlkOOOLxsYLw2iihvC1BUo7SlIsES64b+8Y/9P1W+vzm/fXP7T8LG5p7MCLLT6dTwr9+7jpXhDC06bU2bfz7r9JHxe+hhSyUqiWr36qWCjzvit7fnN3c3N/h3fnf++n6yETS936/Vaoit9QkXJ4CgJjQT4WQ4Ve12k51mf6ua3NqiaYZhaPqfi4q4ccftm7vzO8Te/nCD/Jsf7rgN4mofZgjqdXrTTmfW6fQ614p8AAlmi6DoLSZMb9Fb85b8pkh0zoXe3N3fvD6/u7+7u3939/r2/PweOLtUzAu9PsL6vdk1UeSs1Z/1CLWX3DJvycMrxbj/cvv2zbu3r1+/vr1/e3t7d4t6BhjaxArXqOBeH1UL/RlRLv51pvjYscLS4ReE+vb8HO+HH2fNH9/AG1Tz6/Mfbl6XbWLLBFnrNae1abOnOes1eVGzoKK43ynYN6+VvAHw7se3N/dv73+4Q4+2iY3BNRq232k2m9dwrWE7Cpaxkrb6nITx/d332u3v9t7dN3+8e3P75vwdepotHUNr2kc3rvVrAJVOrRZJdVPJiu5RptiIApud/yve2q3V/vAXnGPnL51y7du378CeuG0cIMKgn4a3Il10WgwQjJMuKi9lpWM68eoUQ/f232jlXuzRjWyFk1tKN2jZxbb04eZBQlfRkS1NS0een2IEfb/QxrwnGqdtCysB9Om1kVOmn+otDEWio/Ub6A6AveIjjoB1I4bxU0vqFtMEc9szHbuBG0NHWuvPJKbQCltj0eOaLZPZkgv2PDkEUF3VFl2tJFtNayzdbUK1a4IlPmFvHQqZuCxdqdYSYOnJaINZpdJdVxK5YBObNsUy3UhnTQlGbUSq4YrJ9XAL7C1Ck966khnEhqvWSsbhu+GUCRaV3LO16KYr3Wl3zbYVuhpJWQcQYhNhM2nparNbsaPleCpSSaxjt1KVJ0yLd9SqtIlt6Uilm7LjyrEq6mu9dziVsFr2lMYkukmznB3uJqsxO9hw1aR7KpKMrKl+afhKOGWSpXA61bAdbDrVNfFYpkYnO08JWwszFTOXIz5hK4ISyYhJ70g1UqlaY+laJWwWtrg4hSM+O9hh0nT8Gp16QsvhCFOJmGFTtaS9qjUdqZqMjyuoqctoV6vVasLsMt2tdm3WrMOU2bwZrK+ssd2+3E2YXGAiKbuVo2PSMRtfiMvW2EQId90mEcbUNtgYcCYj46xly+zIdHCfNTRxCYazT3VM1gegu3GHZLkWMFPsFTKJ2/D+Bti0yTpfYx1xK+PSVVK4sOuXGVv5eN6EtZFTuGlmWxbSMh0lEXHr5YHdLYHaQqsTZ/pkkzwxzQhbdEqtSdnVIo+pbbjDnSzHEFNRxPG1wqby9kOms2Ui3GZU3Ah1GWN/UD9Ng5mKa3O/AeNsmaq9CtnYZFhwmQRoWEe8Z1ZUzntNDUUrUwVhc2yvUlFLeyZZq4Z1rIPvrNovYij7IVWtJRUwTScq/c2x5SpT7SeSDBOudFI009NXkSl0jPt4RRMLbI+hw7VKimGSWPAxYXu7H2PDbRCdjNSwdRHD1AzYTmquSHqrUqn2FljMqrjtIr0iSZzcbFMq2yMi0Tg+2fsZIgE3ualOQldktd9lmO7ctqonk16Kfej+hgeRbHu2ZEKmv6dxIYUjVnqVVDIZ7vZ7YYaUwjqVX3Y4ujfd7EisnC8by1M62R6PlJmzM2UW4USn1+tXqgolqaWi9MVxe6lXSngY2aos1OaTxmJari4smGz5RrttMvOYlojIeRTDqK+TyhUHW45e+PphQwAJ7E9Z2SY3PSnviW4x5BBq2rAYIqxDdI+hzcVaJpvc5KzsCHFtOHY9+NipnjDoStmX/sn1AOXJ5zIkG+MA8rvirlvEZCjPyNTprU6LdbCiGz/OP27P1qh0CjJ7B8fRwY7rAW9s94m/MeFrlDP0kws/fjgAzvwLFB8big2ldnNPHO+6x6LbPSKnwxPMOUx3RvRUHrnd45Ho6ZWrq2mK6cgZ77br4tjlOm4TC2F+QwVhVcFOL1yui6zLFX0INNvSMBZijSqX260pAEHuuvE/QY/KJMOEWp1Kk9RCHMHuQoGa+YTuMpdOyOwjlTlGYV3HZXKmHG/WOjxRrFC+cO1EBy68shM9RqFh2mrPjR06gPGYIJFJGurTnec4UgT52sruNCbE8yir6KQAtVgzpCkm3BEc7HvKA/xFdic7FMhKFYIWGXvCTR4QOYjukEbQ0Wx2scvmxvxYI2Jzj/GNe1x2kNNg9jGnLO/DMoh1sU5R4ENub56mSLr3OdLvKaqQr4t72xJLvFr6679jtIVwiCxisyiy3lxZPqsfsl/ujsGA5Ymmd8GRLrMOKUjtxZEJeT9VFyknwWKkaOsbjQmZVDOh95TTyXupeh5mbZlNw9/+Jjt8QtoxjUajrui2ActnXZeqlkPoQaJBXHE8QjLGTEwOBQoZABALHopy8n6CVdTHQUc53e0ppzBptLkTxaUoKlgQ8f7/+Ot//ldIijtYcEX5i6imZUXYgcv1oGp5mEEkv8DCSERTg1Amh6og5upOZDoVYRGrnjKFAN01AVMlc7UJ1ulBcfEGylPP8cpRoCBJkI1GBxewwOIMXFm1chaIN4m7izYei0o/MZPz4zg4GDYKLUuwk6lS5bMCTLWvQjiBI1gql9HuRLQ/l1HHuHBlszsLHaNX70SVXOprqX60wI5286IYDHqcTg1Jmpf3kCEfJyHtCETQaocYpGUyI+0Op452eoJeXhR3dgwelc2S1yNWNS3hjhZaHo3rfvAviMo4BUUWKiM7Jsps06cfFMP6pnFHWcE6xfpKnzp4C1nXxULHx4TqeiBBNlSxBmlF0UtlxJUhyJjEcTAPCaRikz4c/fwrTluWHGzTr1zTtaw3D5+j/AMDdierYolx5cxCTrVNERlcFRc8lCdXp/zo4Wwz5ki/ODo6ernvGKJnpyFI1XMeys8vdaEKgOgBJuV5i6ruTKzTGq9g3aPM+tTRcDkQnTidEDGno/UzYhvAEkMPwYOSNQtBg3EVpZO4Ei8MttXgWOv4YEXWXfeU2MgDxjHQTHxBVKSeKHE7SX/68N+spJhX2sPhg3yBB6+RqghP5RbhM8eixkJr2F2e9KZyBaO43gKVV+JSjVsOfQot61Pq8rIS0f4cVQgaZ5pRwso/WBV2ZwfId3er1LGoyOld1jJaT3Flsa2tnHE9p6dBvaJMy+BQeXUYfl3avbhjuDdeprrHeUqd7ZKlqIyiQVSaVg3u6+fEMSVJ6fNa6Ed7K2ZXqK5sYOLg+NGyS7lF9X6qvmQpStUBGlk7ixD0r9E4zem9eSOWqvvV5/yqS7mOtyWHvIYFLeq9SyGkYZ1e/ei/pe9wyrxq0hVsQb2fyi2MG41qWAE7adi5rkG30QpW8xde/XY43Xze9qkv1MxC+VewWob2w84qdq+Nk1axYy18sUDUxqeWsZm6ZnLVlUIvPp6lVdfSjLLs+vNJe+cR5FJTsusCmrin0bCa0O6RuBz0OlYTBo2r2DT+4uPvQqqNVe14RGP4OOeDBJtZl25UNScf47a1qWLdc6yYN6MSLWueo27wJr8cvSSuzE41XyusZOQ5X9R9ihSXC2x+GQsW3bFkUcXNK1rmfjl6PlR0rN3Pe837OcVtU6wmrb7QW2GdzrwiLmZ4omXh56NflGfQPrXqRuWbum0HJlhey1GQC1r096suG1S+K2z//ehnDCUWNFcAi15OT2buUwbsVMc2x5ojF/xW886o6ShP8tOvH47+XiYbBzUzZnJWnbw50HwqyuvYJtZfmieDjs3VrbTsaSqFTZ0kCvhw9AGlbiqrDuUFiy6oo4yOzao+jdgp2kbzJRip8QMZK2nRgIqaPTykffDx6MOvmI8Vv6fAyp8wfjNwrGK1EhLjtu2Q51hejR8Ddi2AqXxOXUOlNBwdffzVJyiZVP3YWlo1gqKDOVbGhUR1YTevaBmf8vP84l0fRfHbIG5ksKj52IoBLJSwQtPn7M+DkpVduP1xaVgO407DikDSoxvLYw2La8j6aF6iTkyQ5U9Y1DwrE4ei6vx6Xlss+X5Rwx4Dr2OHDh9H9pWKUUcqltexBRPfQoaXwvQOpJb6BFj5UP6miWGpjI71goa9UJRNdp4cWUPS0iiDm8wxiCpWrxlXc7suBuHmNWyOTMHMBSlRt9AcO0CPdu1kB7J+apTmpqjp5nR3GWsei5ilvERc9GQUFl+Zxhul64w4Aq9ho9GHwdJve3zDNu5ZUNlL2LypfyLXj+J+OnqOwtZNZSUhpc8myBOsyxUFCLSGa+c26UkbcL9pxK47qHqhDjknWhd49C2LgPUsY13ZB2hPLM7k2KHUsoEl/izm8Ubc1XksbvEasQAtafj0eZwRaxIYGjeobmF5p9XE/EZs6/NHgEZs02pVQa6CtU6jOSPWxiG6MYDAb4UlfgVg7nKkeRZGDzbt/JbHgC1A3SQ96gPzTwhL8r8hXdg4RG8tsP4n1kCy6orWuqgvYW38qEYA0CtcL2TM8pRT14W1jqlcfu6OiOU+j5UAcvP8kn9i5Do8sdrlxbkqMKHZ+FJzssB6RB6eWEfhCVU054UgyaM2fgARW2CdIljWKk9jPbDA1m39loctz4fD1AfWrvwElkhYWGDt/UxreJkLUlpFbL68fE5a0lEJW4ryvr+086sL0nyT1nsvOfHxwpMSWboUJhpy8kE5649te7/R0iWePRYwy/NPDP2UJ4sYXFQwt9fbCEpaTIBHDHr+CazlrgU9Kld4BOmLfo3OknNkTFmU6eiW6QLvz5Hz1fgG3wCtkicCHOT8HhM0uvl6ciQnynWEyp9ZXW2Q43IbtnN1L2Eb6JQIfNDIoyiPt54JQFn6oh+drzdfOi6VW9uPmYLfH/R4NAxPoosccTo9waC/nnv/KLbKUjz95bo1a2w6NpHL7fZIzGPLZJTD/EyGvBFb7XZZmsTSG0i5b79NJhNOEi5be0uNb1/KEofXNhhp37G3UTs4CAS2V1ogEDg42GyYPcfaGKujfpVGsKPtAZlyi0xbvmwH9gIH2+2Dy6+MDVy2EXY5ki6xDfEfdykJE+Fy8FvGRQkCB4NBgGiPiLO9PcCG8pFHVdqBLHCyDNJlizsQJvucMJQGbOs3aDsgC8KlfCnIKIksDy7JG1mQJI48CPKBij2QyvJIHgnYBhzHyRN5X5ak32JkJGKTLiXyhGRUH3JlicxGGGnSbqsEoo7tADorNlTRb6ASFaujaI84XEB5F9AGXvXk/6P2/4T9H1uym7CIi8XUAAAAAElFTkSuQmCC`} alt="license" />
                        <p >retailers</p>
                     </NavLink>
            </div>
            <div className="favoritesDetail">
                <Outlet/>
            </div>
        </div>
</div>)
}
export async function loader({params}){
    const access_token=window.localStorage.getItem("access_token")
    const apiUrl=`http://localhost:3500/admin2/products/${params.id}`
    const res=await axios.get(apiUrl,{
        headers:{
            'Authorization':"Bearer "+access_token
        }
    })
    const response=res.data
    console.log(response)
    return response;
}
export async function PendingProductLoader({params}){
    const access_token=window.localStorage.getItem("access_token")
    const apiUrl=`http://localhost:3500/admin2/pendingProducts/${params.id}`
    const res=await axios.get(apiUrl,{
        headers:{
            'Authorization':"Bearer "+access_token
        }
    })
    const response=res.data
    console.log(response)
    return response;
}
export async function ProductRetailerLoader({params}){
    const access_token=window.localStorage.getItem("access_token")
    const apiUrl=`http://localhost:3500/admin2/products/${params.id}/retailers`
    const res=await axios.get(apiUrl,{
        headers:{
            'Authorization':"Bearer "+access_token
        }
    })
    const response=res.data
    console.log(response)
    return response;
}
