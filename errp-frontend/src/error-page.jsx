import { useRouteError } from "react-router-dom";
import Alert from '@mui/material/Alert';
export default function ErrorPage({children}) {
  const error = useRouteError();
  console.error(error);


  return (
    <div id="error-page">
      {error.response.data.message && (<div style={{color:"red", textAlign:"center",width:"70%",margin:"10px auto 0"}}>
        <Alert severity="error">{error.response.data.message}</Alert>
      </div>)}
      {children}
    </div>
  );
}