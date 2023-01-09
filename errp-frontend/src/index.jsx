import React from "react";
import ReactDOM  from "react-dom/client";
import ErrorPage from "./error-page";
import './index.css';
import Root, { loader as rootLoader,action as rootAction} from "./routes/root.jsx";
import Home, {loader as homeLoader} from './routes/home.jsx'
import SignIn, {action as signInAction} from './routes/signIn.jsx'
import SignUp, {action as signUpAction} from './routes/signup.jsx'
import LandingPage, {loader as landingPageLoader} from './routes/landingPage.jsx'
import {loader as logoutLoader} from './routes/logout.jsx'
import Profile, {loader as profileLoader}from "./routes/profile";
import Products, {loader as productsLoader, action as productsAction} from "./routes/products";
import AddNewProduct ,{action as newProductAction} from "./routes/addNewProduct";
import AddOldProduct ,{action as oldProductAction} from "./routes/addOldProduct";
import Saved, {loader as savedLoader} from "./routes/saved";
import Dashboard, {loader as dashboardLoader} from "./routes/dashboard";
import { createBrowserRouter,RouterProvider,Route } from "react-router-dom";
const router=createBrowserRouter([
    {
        path:'/',
        element:<Root />,
        errorElement:<ErrorPage />,
        children:[
            {
                // path: "signIn/",
                index:true,
                element: <SignIn />,
                action:signInAction
            },
            {
                path: "signUp/",
                element: <SignUp />,
                action:signUpAction
            }
        ]
    },
    {
        path:"/home",
        element: <Home />,
        loader: homeLoader,
        errorElement:<ErrorPage />,
        children:[
            {
                path:"/home/:username",
                element:<LandingPage />,
                loader:landingPageLoader,
                errorElement:<ErrorPage />,
            },
            {
                path:"/home/profile",
                element:<Profile />,
                loader:profileLoader
            },
            {
              path:"/home/logout",
              loader:logoutLoader
            },
            {
                path:"/home/saved",
                element:<Saved />,
                loader:savedLoader
            },
            {
                path:"/home/products",
                element:<Products/>,
                loader:productsLoader,
                action:productsAction
            },
            {
                path:"/home/products/addNew",
                element:<AddNewProduct/>,
                action:newProductAction,
            },
            {
                path:"/home/products/addOld",
                element:<AddOldProduct/>,
                action:oldProductAction
            },
            {
                path:"/home/dashboard",
                element:<Dashboard />,
                loader:dashboardLoader,
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );