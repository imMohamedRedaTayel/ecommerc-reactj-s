import React from 'react'
import { Outlet } from 'react-router-dom'
import LodingScreen from '../LodingScreen/LodingScreen'
import Navbar from '../Navbar/Navbar'

    export default function Layout( { crrUser , clearUserData } ) {
    return <> 
    
    <Navbar clearUserData={ clearUserData } crrUser={ crrUser } />

        <Outlet />
    
    <footer className='py-3' > 
    <h2> Fresh Cart Footer </h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>

    <div className="container mb-3 d-flex justify-content-between">
        <input type="text" className='form-control w-75' placeholder='Email..' />
        <button className='btn btn-success ms-3 w-25 '> Share App Link </button>
    </div>

    <div className='container d-flex justify-content-between align-items-center border-top border-bottom border-2 border-dark py-4'>  
    <div className='leftpart' >
        <ul className='list-unstyled d-flex'>
            <li className='me-3'> <h6> payment parteners </h6> </li>
            <li className='me-2 text-primary'> <i class="fa-brands fa-paypal"></i> </li>
            <li className='me-2 text-primary'> <i class="fa-brands fa-amazon-pay"></i> </li>
            <li className='me-2 text-primary'> <i class="fa-brands fa-cc-mastercard"></i> </li>
        </ul>
    </div>
    <div className='rightpart d-flex align-items-center' >

        <h6> Lorem ipsum dolor sit amet. </h6>
        <button className='btn btn-dark btn-lg mx-3' >
            <i className="fa-brands fa-app-store me-2"></i>
            Avilabe on app store</button>
        <button className='btn btn-dark btn-lg' >
            <i class="fa-brands fa-google-play me-2"></i>
            Get it form googleplay </button>

    </div>
    </div>

    </footer>

    </>
    }
