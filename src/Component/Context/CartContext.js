import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import $ from "jquery";
import { useNavigate } from 'react-router-dom';

export const cartContext = createContext()


export default function CartContextProvider( { children } ) {

    const nav = useNavigate()

    const[ numOfCartItem , setnumOfCartItem ] = useState(0);
    const[ totalCartPrice , settotalCartPrice ] = useState(0);
    const[ cartProducts , setcartProducts ] = useState(null);
    const[ cardId , setcardId ] = useState(null);

    // const[ cartProducts , setcartProducts ] = useState(null);



    async function addProductToCart( proId )
    {
        try 
        {
            const { data } = await axios.post( `https://route-ecommerce.onrender.com/api/v1/cart` , {
                "productId": proId
            } ,{
                headers: { 'token': localStorage.getItem( 'tkn' ) }
            } )
    
            // console.log( data );

            if ( data.status === 'success' ) 
            {
                return true;
                // $( '.successMsg' ).fadeIn( 500 )
            }
            else
            {
                return false;
            }

        } catch (error) 
        {
            console.log( "Error:" , error );
        }
    }

    async function getCartProducts()
    {
        try 
        {
            const { data } = await axios.get( 'https://route-ecommerce.onrender.com/api/v1/cart' , {
                headers : { 'token' : localStorage.getItem( 'tkn' ) }
            } )
    
            // console.log( data );

            if ( data.status === 'success' ) 
            {
                setnumOfCartItem( data.numOfCartItems );
                settotalCartPrice(data.data.totalCartPrice);
                setcartProducts(data.data.products );
                return true;
            }
            else
            {
                return false;
            }

            // return data;

        } catch (error) 
        {
            console.log( " Error :" ,  error );
        }
    }

    async function removeCartItem( id )
    {
        try 
        {
            const { data } = await axios.delete( `https://route-ecommerce.onrender.com/api/v1/cart/${ id }` , {
                headers : { 'token' : localStorage.getItem( 'tkn' ) }
            } );
            // console.log( data );

            if ( data.status === 'success' ) 
            {
                setnumOfCartItem( data.numOfCartItems );
                settotalCartPrice(data.data.totalCartPrice);
                setcartProducts(data.data.products );
                return true;
            }

        } catch (error) 
        {
            console.log( " Error " , error );
        }
    }

    async function updateCount( id , countElgded )
    {
        try 
        {
            const { data } = await axios.put( `https://route-ecommerce.onrender.com/api/v1/cart/${ id }` , {
                "count": countElgded
            } , { headers : { 'token' : localStorage.getItem( 'tkn' ) }
        } );

            // console.log( data );

            if ( data.status === 'success' ) 
            {
                setnumOfCartItem( data.numOfCartItems );
                settotalCartPrice(data.data.totalCartPrice);
                setcartProducts(data.data.products );
                setcardId(data.data._id );


                // return true;
            }

        } catch (error) 
        {
            if ( error.response.status == 404  ) 
            {
                $('.errorCart').fadeIn( 500 , function(){
                    setTimeout(() => {
                        $('.errorCart').fadeOut( 500 ) 
                        nav( '/home' )
                    }, 1500);
                } )
            }
        }
    }


    useEffect( function(){
        getCartProducts();
    } , [] )


    return < cartContext.Provider value={ { addProductToCart , numOfCartItem , totalCartPrice , cartProducts , removeCartItem , updateCount , cardId } } >
    
    <div style={ { 'display' : 'none' } } className='alert alert-danger errorCart text-center ' >
        No Cart Exist
    </div>
    { children }
    
    </ cartContext.Provider >
}
