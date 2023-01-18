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
import ProfileEdit, {action as profileEditAction} from "./routes/profileEdit";
import Products, {action as productsAction,loader as productsLoader} from "./routes/products";
import ProductsList, {loader as productsListLoader} from './routes/productsList';
import ProductsListSingle, {loader as productsListSingleLoader} from "./routes/productsListSingle";
import AddNewProduct ,{action as newProductAction} from "./routes/addNewProduct";
import AddOldProduct ,{action as oldProductAction} from "./routes/addOldProduct";
import LandingPageSingle, {loader as landingPageSingleLoader,reviewAction} from "./routes/landingPageSingle.jsx";
import LandingPageProducts, {loader as landingPageProductsLoader} from "./routes/landingPageProducts";
import Favorite,{loader as favoriteLoader} from "./routes/favorites/favorite";
import FavoritePage from "./routes/favorites/favoritePage";
import FavoritePageProducts from "./routes/favorites/favoritePageProducts";
import FavoritePageSingle from "./routes/favorites/favoritePageSingle";
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
                children:[
                    {
                        index:true,
                        element:<LandingPageProducts />,
                        loader:landingPageProductsLoader
                    },
                    {
                        path:"/home/:username/:barcode",
                        element:<LandingPageSingle />,
                        loader:landingPageSingleLoader,
                        action:reviewAction
                    }
                ]
            },
            
            {
                path:"/home/products",
                element:<Products/>,
                errorElement:<ErrorPage />,
                action:productsAction,
                loader:productsLoader,
                children:[
                    {
                        index:true,
                        element:<ProductsList/>,
                        loader:productsListLoader
                    },
                    {
                        path:"/home/products/:barcode",
                        element:<ProductsListSingle />,
                        loader:productsListSingleLoader,
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
                ]
            },
            {
                path:"/home/favorites",
                element:<Favorite />,
                loader:favoriteLoader,
                children:[
                    {
                        path:"/home/favorites/:username",
                        element:<FavoritePage/>,
                        loader:landingPageLoader,
                        children:[
                            {
                                index:true,
                                element:<FavoritePageProducts />,
                                loader:landingPageProductsLoader
                            },
                            {
                                path:"/home/favorites/:username/:barcode",
                                element:<FavoritePageSingle/>,
                                loader:landingPageSingleLoader,
                                action:reviewAction
                            }

                        ]

                    }
                ]
            },
            {
                path:"/home/lookingFor",
                element:<div>look for</div>,
            },
            {
                path:"/home/dashboard",
                element:<Dashboard />,
                loader:dashboardLoader,
            },
            {
                path:"/home/profile",
                element:<Profile />,
                loader:profileLoader,
                children:[
                    {
                        path:"/home/profile/edit",
                        element:<ProfileEdit/>,
                        loader:profileLoader,
                        action:profileEditAction
                    }
                ]
            },
            {
                path:"/home/saved",
                element:<Saved />,
                loader:savedLoader
            },
            {
              path:"/home/logout",
              loader:logoutLoader
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
