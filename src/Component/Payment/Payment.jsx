import axios from 'axios';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { cartContext } from '../Context/CartContext';

export default function Payment() {

    const { cardId } = useContext( cartContext )

    const nav = useNavigate()

    async function confirmCashOrder()
    {
        try 
        {
            const { data } = await axios.post( `https://route-ecommerce.onrender.com/api/v1/orders/${cardId}` , {
                "shippingAddress":{
                    "details": document.querySelector('#detailes').value,
                    "phone": document.querySelector('#phone').value,
                    "city": document.querySelector('#City').value
                    }
            } , {
                headers : { 'token' : localStorage.getItem( 'tkn' ) }
            } );

            // console.log( data );
            if ( data.status === 'success' ) {
                nav( '/allOrders' )
            }


        } 
        catch (error) 
        {
            console.log( 'Error' , error );
        }
    }

    async function confirmCreidtOrder()
    {
        try 
        {
            const { data } = await axios.post( `https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cardId}` , {
                "shippingAddress":{
                    "details": document.querySelector('#detailes').value,
                    "phone": document.querySelector('#phone').value,
                    "city": document.querySelector('#City').value
                    }
            } , {
                headers : { 'token' : localStorage.getItem( 'tkn' ) },
                params: { 'url' : 'http://localhost:3000' }
            } );

            // console.log( data );
            if ( data.status === 'success' ) {
                window.open( data.session.url )
            }


        } 
        catch (error) 
        {
            console.log( 'Error' , error );
        }
    }

    return <>
    <div className="container ">
        <h2 className='tetx-center' > Hello User </h2>

        <div className="w-50 m-auto">
            <form>
                <label className='mt-3' htmlFor="detailes"> Address Detailes </label>
                <input type="text" id='detailes' className='form-control' placeholder='Address Detailes' />

                <label className='mt-3' htmlFor="Phone"> Phone </label>
                <input type="text" id='Phone' className='form-control' placeholder='Phone' />

                <label className='mt-3' htmlFor="City"> City </label>
                <input type="text" id='City' className='form-control' placeholder='City' />

                <button onClick={ confirmCashOrder } type='button' className='btn btn-primary' > Confirm Cash </button>
                <button onClick={ confirmCreidtOrder } type='button' className='btn btn-primary' > Confirm Creidt </button>

            </form>
        </div>

    </div>
    </>
}
