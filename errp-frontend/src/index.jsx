import React from "react";
import ReactDOM  from "react-dom/client";
import ErrorPage from "./error-page";
import './index.css'
import './index2.css'
import Root from "./routes/root.jsx"
import Home, {loader as homeLoader} from './routes/home.jsx'
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
import Saved, {loader as savedLoader} from "./routes/saved";
import Dashboard, {loader as dashboardLoader} from "./routes/dashboard";
import Admin, {DataHolder}  from "./routes/Admin/adminHome"
import Delivery from "./routes/Delivery/deliveryHome"
import SignIn, {action as signInAction} from "./routes/newSignIn"
import { createBrowserRouter,RouterProvider} from "react-router-dom";
import UserPage from './routes/Admin/pages/UserPage';
import ProductsPage from './routes/Admin/pages/ProductsPage';
import PendingProducts from "./routes/Admin/pages/PendingProductsPage";
import {PendingProductsStatus} from "./routes/Admin/pages/PendingProductsComponent"
import { usersLoader,productsAdminLoader,memberAddAction,editProductAction,retailersLoader,deliverersLoader,dashboardDataLoader,PendingProductsLoader } from "./routes/Admin/adminLA";
import AddMember, {action as addMemberAction} from "./routes/Admin/pages/addMember";
import EditMember,{loader as editMemberLoader,action as editMemberAction} from "./routes/Admin/pages/editMember";
import EditProduct, {action as productsEditAction} from "./routes/Admin/pages/editProduct";
import Orders, {loader as ordersLoader} from "./routes/Delivery/orders";
import Selections, {loader as selectionsLoader} from "./routes/Delivery/selected"
import OrderDetails, {loader as orderDetailLoader,action as orderDetailAction} from "./routes/Delivery/orderDetails";
import Delivered, {loader as deliveredLoader} from "./routes/Delivery/delivered";
import ForgotPassword, {action as forgotPasswordAction} from "./routes/forgotPassword";
import ResetPassword, {action as resetPasswordAction} from "./routes/resetPassword";
import RetailersPage from "./routes/Admin/pages/retailersPage"
import DeliverersPage from "./routes/Admin/pages/deliverers";
import RetailerDetail, {loader as RetailerDetailLoader,RetailerProductsLoader} from "./routes/Admin/pages/retailerDetail"
import DelivererDetail, {loader as delivererDetailLoader} from "./routes/Admin/pages/delivererDetail";
import ProductDetail, {loader as ProductDetailLoader,ProductRetailerLoader, PendingProductLoader} from "./routes/Admin/pages/productDetail";
import PendingProductsDetail from "./routes/Admin/pages/PendingProductsDetail";
import { License,RetailersProduct,UpdateStatus,addLicenseAction,profileEditAction2 } from "./routes/Admin/pages/RetailerDetailerComponent";
import { ProductStatus,ProductRetailers } from "./routes/Admin/pages/productDetailComponent";
import OrdersPage from "./routes/Admin/pages/ordersPage";
import OrdersDetail, {specificOrdersLoader,loader as ordersDetailLoader} from "./routes/Admin/pages/ordersDetail";
import CustomerDetail from "./routes/Admin/pages/customerDetail";
const router=createBrowserRouter([
    {
        path:'/',
        element:<Root />,
        errorElement:<ErrorPage><p>page not available</p></ErrorPage>,
        children:[
            {
                index:true,
                errorElement:<ErrorPage> <SignIn/> </ErrorPage>,
                element: <SignIn/>,
                action:signInAction
            },
            {
                path: "/signUp/",
                element: <SignUp />,
                errorElement:<ErrorPage> <SignUp/> </ErrorPage>,
                action:signUpAction
            },
            {
                path: "/forgotPassword",
                element: <ForgotPassword />,
                errorElement:<ErrorPage> <ForgotPassword/> </ErrorPage>,
                action:forgotPasswordAction
            },
            {
                path: "/resetPassword",
                element: <ResetPassword />,
                errorElement:<ErrorPage> <ResetPassword/> </ErrorPage>,
                action:resetPasswordAction
            },
        ]
    },
    {
        path:"/admin",
        element:<Admin />,
        errorElement:<ErrorPage><p>page not available</p></ErrorPage>,
        children:[
            {
                index:true,
                element: <DataHolder/>,
                loader:dashboardDataLoader
            },
            {
                path:"/admin/pendingProducts",
                element:<PendingProducts />,
                loader:PendingProductsLoader
            },
            {
                path:"/admin/pendingProducts/:id",
                element: <PendingProductsDetail />,
                loader:PendingProductLoader,
                children:[
                    {
                        index:true,
                        element: <PendingProductsStatus />,
                        loader:PendingProductLoader,
                    },
                ]
            },
            {
                path:"/admin/customers",
                element:<UserPage />,
                loader:usersLoader
            },
            {
                path:"/admin/customers/:id",
                element:<CustomerDetail />,
                loader:delivererDetailLoader,
                children:[
                    {
                        index:true,
                        element:<UpdateStatus />,
                        loader:RetailerDetailLoader
                    },
                    {
                        path:"/admin/customers/:id/edit",
                        element:<ProfileEdit/>,
                        action:profileEditAction2
                    }
                ]
            },
            {
                path:"/admin/deliverers",
                element:<DeliverersPage/>,
                loader:deliverersLoader
            },
            {
                path:"/admin/deliverers/:id",
                element:<DelivererDetail/>,
                loader:delivererDetailLoader,
                children:[
                    {
                        index:true,
                        element:<UpdateStatus/>,
                        loader:RetailerDetailLoader
                    },
                    {
                        path:"/admin/deliverers/:id/edit",
                        element:<ProfileEdit/>,
                        action:profileEditAction2
                    }
                ]
            },
            {
                path:'/admin/users/addMember',
                element: <AddMember />,
                action:addMemberAction
            },
            {
                path:'/admin/users/edit/:id',
                element:<EditMember />,
                loader:editMemberLoader,
                action:editMemberAction
            },
            {
                path:"/admin/orders",
                element:<OrdersPage />,
                loader:ordersDetailLoader
            },
            {
                path:"/admin/orders/:id",
                element:<OrdersDetail />,
                loader:specificOrdersLoader
            },
            {
                path:"/admin/products",
                element:<ProductsPage/>,
                loader:productsAdminLoader,
            },
            {
                path:"/admin/products/:id",
                element:<ProductDetail/>,
                loader:ProductDetailLoader,
                children:[
                    {
                        path:"/admin/products/:id/status",
                        element:<ProductStatus/>,
                        loader:ProductDetailLoader,
                    },
                    {
                        path:"/admin/products/:id/retailers",
                        element: <ProductRetailers/>,
                        loader:ProductRetailerLoader,
                    },
                    {
                        path:"/admin/products/:id/edit",
                        element:<EditProduct/>,
                        loader:brandsLoader,
                        action:productsEditAction
                    },
                ]
            },
            {
                path:"/admin/retailers",
                element:<RetailersPage/>,
                loader:retailersLoader
            },
            {
                path:"/admin/retailers/:id",
                element:<RetailerDetail/>,
                loader:RetailerDetailLoader,
                children:[
                    {
                        path:"/admin/retailers/:id/license",
                        element:<License/>,
                        loader:RetailerDetailLoader,
                        action:addLicenseAction
                    },
                    {
                        path:"/admin/retailers/:id/products",
                        element:<RetailersProduct/>,
                        loader:RetailerProductsLoader
                    },
                    {
                        path:"/admin/retailers/:id/status",
                        element:<UpdateStatus/>,
                        loader:RetailerDetailLoader
                    },
                    {
                        path:"/admin/retailers/:id/edit",
                        element:<ProfileEdit/>,
                        action:profileEditAction2
                    }
                ]
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
                path:"/admin/logout",
                loader:logoutLoader
            }
        ]
    },
    {
        path:"/delivery",
        element:<Delivery />,
        errorElement:<ErrorPage><p>page not available</p></ErrorPage>,
        children:[
            
            {
                path:"/delivery/orders",
                element:<Orders/>,
                loader:ordersLoader
            },
            {
                path:"/delivery/orders/:id",
                element:<OrderDetails  value={"order"}/>,
                loader:orderDetailLoader,
                action:orderDetailAction
            },
            {
                path:"/delivery/myselection",
                element:<Selections/>,
                loader:selectionsLoader
            },
            {
                path:"/delivery/myselection/:id",
                element:<OrderDetails  value={"selected"}/>,
                loader:orderDetailLoader,
                action:orderDetailAction
            },
            {
                path:"/delivery/history",
                element:<Delivered />,
                loader:deliveredLoader
            },
            {
                path:"/delivery/history/:id",
                element:<OrderDetails value={"delivered"}/>,
                loader:orderDetailLoader,
                action:orderDetailAction
            },
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
        loader: homeLoader,
        errorElement:<ErrorPage><p>page is not available</p></ErrorPage>,
        children:[
            {
                index:true,
                element: <Search />,
                errorElement:<ErrorPage><p>page is not available</p></ErrorPage>,
                loader:recommendationLoader,
            },
         
            {
                path:"/home/search",
                element:<Search/>,
                errorElement:<ErrorPage><p>page not available</p></ErrorPage>,
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
                errorElement:<ErrorPage><p>page is not available</p></ErrorPage>,
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
                errorElement:<ErrorPage><p>page not available</p></ErrorPage>,
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
                errorElement:<ErrorPage><p>page not available</p></ErrorPage>,
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
                        element: <SpecificBrand isSearch={false} />,
                        errorElement:<ErrorPage><p>page not available</p></ErrorPage>,
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
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
  );
  