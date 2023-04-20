import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import logo from '../../images/freshcart-logo.svg'

    export default function Navbar( { crrUser , clearUserData } ) {

    const navigate = useNavigate()

    function logoutUser()
    {
        clearUserData();
        navigate( '/login' );
    }

    return <>
    <nav className="navbar navbar-expand-lg ">
    <div className="container-fluid">
        <Link className="navbar-brand" to="/home">

        <img src={ logo }  alt="logo" />

        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/brands">Brands</Link>
            </li>

            <li className="nav-item">
            <Link className="nav-link" to="/cart">Cart</Link>
            </li>

            <li className="nav-item">
            <Link className="nav-link" to="/allOrders">all Orders</Link>
            </li>

        </ul>

        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            { crrUser?  <> <li className="nav-item">
            <Link className="nav-link " aria-current="page" to="/profile">Profile</Link>
            </li>

            <li className="nav-item">
            <span onClick={ logoutUser } className="nav-link " aria-current="page" >Logout</span>
            </li> 
            
            </> : <> <li className="nav-item">
            <Link className="nav-link " aria-current="page" to="/login">Login</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/register">Rigster</Link>
            </li> 
            </> }





        </ul>

        </div>
    </div>
</nav>
    </>
    }
