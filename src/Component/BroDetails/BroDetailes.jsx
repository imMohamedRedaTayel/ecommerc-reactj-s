import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { cartContext } from '../Context/CartContext';
import LodingScreen from '../LodingScreen/LodingScreen';
import $ from 'jquery'

export default function BroDetailes() {

    const { addProductToCart , removeCartItem } = useContext( cartContext )

    async function addMyProduct( id )
    { 
        if ( await addProductToCart( id ) == true ) 
        {
            $( '.successMsg' ).fadeIn( 1000 , function(){

                setTimeout(() => {
                    $( '.successMsg' ).fadeOut( 1000 )
                }, 2000);

            } )

            $('#delBtn').fadeIn( 500 )
            $('#addBtn').fadeOut( 500 )

        }
    }

    async function removeMyProduct( id )
    { 
        if ( await removeCartItem( id ) == true ) 
        {
            $( '.removeMsg' ).fadeIn( 500 , function(){

                setTimeout(() => {
                    $( '.removeMsg' ).fadeOut( 500  )
                }, 2000);

            } )

            $('#addBtn').fadeIn( 500 )
            $('#delBtn').fadeOut( 500 )

        }
    }

    const { id } =  useParams()
    // console.log( data );

    const [ ProductDetails , setProductDetails ] = useState( null )

    async function getProductDetails()
    {
        // const { data } = await axios.get( 'https://route-ecommerce.onrender.com/api/v1/products/6428ebc6dc1175abc65ca0b9' )
        try 
        {
            const { data } = await axios.get( `https://route-ecommerce.onrender.com/api/v1/products/${ id }` );
            // console.log( data.data );
            setProductDetails( data.data )
        } 
        catch (error) 
        {
            console.log( 'Error: ',  error );
        }
    }

    useEffect( function(){

        getProductDetails()

    } , [] )

    return <>

<h2> Product Details </h2>

    
    { ProductDetails?     <div className="container">
        <div className="row">
            <div className="col-lg-3">
                <img src={ ProductDetails.imageCover } className='w-100' alt={ProductDetails.title} />
            </div>
            <div className="col-lg-9">
                <h2> {ProductDetails.title} </h2>
                <p>{ProductDetails.description} </p>
                <h5> price: {ProductDetails.price} </h5>
                <h5> Quantity: {ProductDetails.quantity} </h5>

            <button id='addBtn' onClick={ function(){ addMyProduct( BroDetailes.id ) }  } className='btn btn-success w-100 mt-3' > Add Product To Cart + </button>
            <button onClick={ function(){ removeMyProduct( ProductDetails.id ) } } style={ { 'display' : 'none' } } id='delBtn' className='btn btn-danger w-100 mt-3 delBtn ' > Remove From Cart  </button>

            <div style={ { 'display' : 'none' } } className="alart alert-success text-center removeMsg mt-3 ">
            product Removed Successfully...
            </div>
            
            <div style={ { 'display' : 'none' } } className="alart alert-success text-center successMsg mt-3 ">
            product Added Successfully...
            </div>


            </div>
        </div>
    </div> : <LodingScreen /> 
    }




    </>
}
