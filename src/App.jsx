import React, { useEffect, useState } from 'react'
import { createBrowserRouter, createHashRouter, Navigate, RouterProvider, useNavigate } from 'react-router-dom'
import Home from './Component/Home/Home'
import Layout from './Component/Layout/Layout'
import Login from './Component/Login/Login';
import Rigster from './Component/Rigster/Rigster';


// 
import errImage from './images/error.svg'
import Brands from './Component/Brands/Brands';
import BroDetailes from './Component/BroDetails/BroDetailes';
import BrandProducts from './Component/BrandProducts/BrandProducts';
import Profile from './Component/Profile/Profile';
import jwtDecode from 'jwt-decode';
import Cart from './Component/Cart/Cart';
import CartContext from './Component/Context/CartContext';
import CartContextProvider from './Component/Context/CartContext';
import Payment from './Component/Payment/Payment';
import AllOrders from './Component/AllOrders/AllOrders';



export default function App() {



  function protectedRoute( children )
  { 
    {/* { crrUser? children : <h1> Etla3 barra yalla </h1> } */}

    if ( crrUser ==  null ) 
    {
      return <Navigate to='/login' />
    }
    else
    {
      return <> { children } </>
    }

  }

  // crrUser Data


  const [ crrUser, setCrrUser ] = useState( null )

  function getUserData()
  {

    // decode User Token
    const userData =  jwtDecode( localStorage.getItem( 'tkn' ) );
    console.log( userData );
    setCrrUser( userData )
  }

  function clearUserData()
  {
      localStorage.removeItem( 'tkn' );
      setCrrUser( null )
  }

  const router = createHashRouter( [
    { path: '' , element: <Layout clearUserData={ clearUserData } crrUser={ crrUser } /> , children: [

      { path: '' , element: < CartContextProvider> <Home /> </CartContextProvider>   },
      { path: 'home' , element: < CartContextProvider> <Home /> </CartContextProvider>   },
      { path: 'brands' , element: <Brands />  },
      { path: 'allOrders' , element: <protectedRoute> <AllOrders  crrUser={ crrUser } />  </protectedRoute> },
      { path: 'Payment' , element: <protectedRoute> <CartContextProvider> <Payment /> </CartContextProvider> </protectedRoute>  },
      { path: 'cart' , element: <CartContextProvider> <protectedRoute > <Cart/> </protectedRoute> </CartContextProvider>   },
      { path: 'prodetiles/:id', element: <CartContextProvider> <BroDetailes /> </CartContextProvider>  },
      { path: 'brandprouducts/:id', element: <protectedRoute > <CartContextProvider> <BrandProducts/> </CartContextProvider>  </protectedRoute>  },
      { path: 'login' , element: <Login getUserData={ getUserData } />  },
      { path: 'profile' , element: <protectedRoute> <Profile crrUser={ crrUser } /> </protectedRoute>  },
      { path: 'register' , element: <Rigster />  },
      { path: '*' , element: <div className=' text-center py-5' >
        <img src={errImage} alt="" />
      </div>  },
      


    ] }
  ] )

  useEffect( function(){

    if ( localStorage.getItem( 'tkn' ) != null && crrUser == null  ) 
    {
      // lma yb2a mafesh data
      getUserData();
    }

  } , [] )


  return <>
  
  <RouterProvider  router={ router } />

  </>
}
