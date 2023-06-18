import React from "react";
import ReactDOM  from "react-dom/client";
import ErrorPage from "./error-page";
import './index.css'
import './index2.css'
import Root from "./routes/root.jsx"
import Home from './routes/home.jsx'
// import SignInOld, {action as signInAction} from './routes/signIn.jsx'
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
import PaymentSuccessfull, { paymentSuccessLoader } from "./routes/paymentSuccess";
import LandingPageProducts, {loader as landingPageProductsLoader} from "./routes/landingPageProducts";
import Favorite,{loader as favoriteLoader} from "./routes/favorite";
import Brands,{loader as typeLoader } from "./routes/brands/brands";
import Brand,{loader as brandLoader,singleTypeLoader} from "./routes/brands/brand";
import Search,{searchLoader,recommendationLoader} from "./routes/search"
import Purchases , {loader as purchasesLoader} from "./routes/purchases";
import SpecificBrand, {loader as SpecificLoader} from "./routes/brands/specificBrands";
import SpecificStore, {loader as specificStoreLoader} from "./routes/brands/specificStores";
import Notification,{loader as notificationLoader} from "./routes/notification"
import Saved, {loader as savedLoader} from "./routes/saved";
import Dashboard, {loader as dashboardLoader} from "./routes/dashboard";
import Admin  from "./routes/Admin/adminHome"
// import App from "./routes/Admin/App"
import Delivery from "./routes/Delivery/deliveryHome"
import SignIn, {action as signInAction} from "./routes/newSignIn"
import { createBrowserRouter,RouterProvider} from "react-router-dom";
import Retailers, {loader as searchRetailerLoader} from "./routes/retailers";
import UserPage from './routes/Admin/pages/UserPage';
import ProductsPage from './routes/Admin/pages/ProductsPage';
import DashboardAppPage from './routes/Admin/pages/DashboardAppPage';
import { usersLoader,productsAdminLoader,memberAddAction,editProductAction } from "./routes/Admin/adminLA";
import AddMember from "./routes/Admin/pages/addMember";
import EditMember from "./routes/Admin/pages/editMember";
import EditProduct from "./routes/Admin/pages/editProduct";
const router=createBrowserRouter([
    {
        path:'/',
        element:<Root />,
        errorElement:<ErrorPage />,
        children:[
            {
                index:true,
                element: <SignIn/>,
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
        path:"/admin",
        element:<Admin />,
        errorElement:<ErrorPage />,
        children:[
            {
                index:true,
                path:"/admin/app",
                element:<DashboardAppPage />
            },
            {
                path:'/admin/users',
                element:<UserPage />,
                loader:usersLoader
            },
            {
                path:'/admin/users/addMember',
                element: <AddMember />
            },
            {
                path:'/admin/users/edit/:id',
                element:<EditMember />
            },
            {
                path:"/admin/products",
                element:<ProductsPage/>,
                loader:productsAdminLoader
            },
            {
                path:"/admin/products/edit/:id",
                element:<EditProduct/>,
                loader:brandsLoader
            },
            {
                path:"/admin/profile",
                element:<Profile role={3030} />,
                loader:profileLoader,
                children:[
                    {
                        path:"/admin/profile/edit",
                        element:<ProfileEdit/>,
                        loader:profileLoader,
                        action:profileEditAction
                    }
                ]
            },
            {
                
            },
            {
                path:"/admin/logout",
                loader:logoutLoader
            }
        ]
    },
    {
        path:"/delivery",
        element:<Delivery />,
        errorElement:<ErrorPage />,
        children:[
            {
                path:"/delivery/profile",
                element:<Profile role={3011} />,
                loader:profileLoader,
                children:[
                    {
                        path:"/delivery/profile/edit",
                        element:<ProfileEdit/>,
                        loader:profileLoader,
                        action:profileEditAction
                    }
                ]
            },
            {
                path:"/delivery/logout",
                loader:logoutLoader
            }
        ]
        
    },
    {
        path:"/home",
        element: <Home />,
        // loader: homeLoader,
        errorElement:<ErrorPage />,
        children:[
            {
                index:true,
                element: <Search />,
                loader:recommendationLoader,
            },
         
            {
                path:"/home/search",
                element:<Search/>,
                loader:searchLoader,
            },
            {
                path:'/home/search/:barcode',
                element:<SpecificStore />,
                loader:specificStoreLoader
            },
            {
                path:"/home/PaymentSuccessReturnUrl",
                element:<PaymentSuccessfull />,
                loader:paymentSuccessLoader
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
                    },
                    {
                        path:"/home/favorites/search",
                        element:<Retailers/>,
                        loader:searchRetailerLoader,
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
                        element: <SpecificBrand isSearch={false} />,
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
                element:<Profile user={2001}/>,
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
                path:"/home/purchases",
                element:<Purchases />,
                loader:purchasesLoader,
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
      <RouterProvider router={router} />
  );
