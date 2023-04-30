import React from "react";
import ReactDOM  from "react-dom/client";
import ErrorPage from "./error-page";
import './index.css';
import Root from "./routes/root.jsx";
import Home, {loader as homeLoader} from './routes/home.jsx'
import SignIn, {action as signInAction} from './routes/signIn.jsx'
import SignUp, {action as signUpAction} from './routes/signup.jsx'
import LandingPage, {loader as landingPageLoader} from './routes/landingPage.jsx'
import {loader as logoutLoader} from './routes/logout.jsx'
import Profile, {loader as profileLoader}from "./routes/profile";
import ProfileEdit, {action as profileEditAction} from "./routes/profileEdit";
import Products, {action as productsAction,loader as productsLoader} from "./routes/products";
import ProductsList, {loader as productsListLoader} from './routes/productsList';
import ProductsListSingle, {loader as productsListSingleLoader,priceAction,amountAction} from "./routes/productsListSingle";
import AddNewProduct ,{action as newProductAction,loader as brandsLoader} from "./routes/addNewProduct";
import AddOldProduct ,{action as oldProductAction} from "./routes/addOldProduct";
import LandingPageSingle, {loader as landingPageSingleLoader,reviewAction} from "./routes/landingPageSingle.jsx";
import ExpressCheckout, {loader as checkoutLoader, action as checkoutAction} from "./routes/expressCheckout";
import LandingPageProducts, {loader as landingPageProductsLoader} from "./routes/landingPageProducts";
import Favorite,{loader as favoriteLoader} from "./routes/favorite";
import Brands,{loader as typeLoader } from "./routes/brands/brands";
import Brand,{loader as brandLoader,singleTypeLoader} from "./routes/brands/brand";
import SpecificBrand, {loader as SpecificLoader} from "./routes/brands/specificBrands";
import SpecificStore, {loader as specificStoreLoader} from "./routes/brands/specificStores";
import Notification,{loader as notificationLoader} from "./routes/notification"
import Saved, {loader as savedLoader} from "./routes/saved";
import Dashboard, {loader as dashboardLoader} from "./routes/dashboard";
import { createBrowserRouter,RouterProvider} from "react-router-dom";
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
                index:true,
                element: <h2>Reccommended products</h2>
            },
            {
                path:"/home/:username",
                element:<LandingPage customPath={""}/>,
                loader:landingPageLoader,
                errorElement:<ErrorPage />,
                children:[
                    {
                        index:true,
                        element:<LandingPageProducts customPath={""}/>,
                        loader:landingPageProductsLoader
                    },
                    {
                        path:"/home/:username/:barcode",
                        element:<LandingPageSingle/>,
                        loader:landingPageSingleLoader,
                        action:reviewAction
                    },
                    {
                        path:"/home/:username/:barcode/checkout",
                        element:<ExpressCheckout/>,
                        loader:checkoutLoader,
                        action:checkoutAction
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
                        loader:brandsLoader,
                        action:newProductAction,
                    },
                    {
                        path:"/home/products/addOld",
                        element:<AddOldProduct/>,
                        action:oldProductAction
                    },
                    {
                        path:"/home/products/:barcode/updatePrice",
                        action:priceAction
                    },
                    {
                        path:"/home/products/:barcode/updateAmount",
                        action:amountAction
                    }
                ]
            },
            {
                path:"/home/favorites",
                element:<Favorite />,
                loader:favoriteLoader,
                children:[
                    {
                        path:"/home/favorites/:username",
                        element:<LandingPage customPath={"favorites/"}/>,
                        loader:landingPageLoader,
                        children:[
                            {
                                index:true,
                                element:<LandingPageProducts customPath={"favorites/"}/>,
                                loader:landingPageProductsLoader
                            },
                            {
                                path:"/home/favorites/:username/:barcode",
                                element:<LandingPageSingle />,
                                loader:landingPageSingleLoader,
                                action:reviewAction
                            }

                        ]

                    }
                ]
            },
            {
                path:"/home/brands",
                element:<Brands/>,
                loader:typeLoader
            },
            {
                path:"/home/brands/:type",
                element: <Brand/>,
                loader:brandLoader,
                children:[
                    {
                        path:"/home/brands/:type/:brand",
                        element: <SpecificBrand/>,
                        loader:SpecificLoader,
                        children:[
                            {
                                path:"/home/brands/:type/:brand/:barcode",
                                element: <SpecificStore/>,
                                loader:specificStoreLoader
                            }
                        ]
                    }
                ]
            },
            {
                path:"/home/notifications",
                element:<Notification />,
                loader:notificationLoader
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
