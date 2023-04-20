import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import LodingScreen from '../LodingScreen/LodingScreen';
import { Link } from 'react-router-dom';
import MySlider from '../Slider/Slider';
import { cartContext } from '../Context/CartContext';
import $ from "jquery";

// import 'skitter-slider/dist/skitter.css'
// import 'jquery'
// import 'skitter-slider/examples/js/jquery.easing.1.3'
// import 'skitter-slider/dist/jquery.skitter'

    export default function Home() {

        const [ allProducts , setAllProducts ] = useState( null )

        const { addProductToCart } = useContext( cartContext )

        async function getAllProducts()
        {
            try 
            {
                const { data } =  await axios.get( 'https://route-ecommerce.onrender.com/api/v1/products' , { 
                    params: { 'sort' : 'price' }
                } );
                // console.log( data.data );
                // allProducts = data.data

                setAllProducts( data.data )

            } 
            catch (error) 
            {
                console.log( "Error: " , error );
            }
        }

        async function addMyProduct( id , idx )
        {
            if ( await addProductToCart( id ) == true ) 
            {
                $('.successMsg').fadeIn( 500 , function(){
                    setTimeout(() => {
                        $('.successMsg').fadeOut( 500 )
                    }, 2000);
                } )

                $( `#addBtn${ idx }` ).fadeOut( 500 );
                $( `#removeBtn${ idx }` ).fadeIn( 500 );

            }
        }

        useEffect(  function(){
            getAllProducts()
        } , []  )


    return <>
    

    { allProducts?     <div className="container">

        <MySlider />

        <div style={ { 'zIndex' : '99999' , 'left' : '0' , 'display' : 'none' } } className=" successMsg position-fixed bottom-0 start-0 end-0 alert bg-dark text-white text-center ">
            product Added Successfully
        </div>

        <div className="row gy-4  mt-5 ">
            { allProducts.map( function( pro , idx  )
            { return <div key={ idx } className="col-lg-2">

                <div className="item bg-primary text-white rounded-3 position-relative ">
                <Link to={`/prodetiles/${  pro.id  }`} >

                <div className="upper">

                <img src={ pro.imageCover } className="w-100" alt={ pro.title } />
                    <h5 className='text-center' >{pro.title.slice( 0 , pro.title.indexOf( '' , 20 ) ) }</h5>
                    <h6>{ pro.category.name}</h6>
                    <h6>price: { pro.priceAfterDiscount? <>

                        <span className='text-decoration-line-through' > {pro.price} </span>
                        <span className='ms-3' > { pro.priceAfterDiscount } </span>

                    </> 
                    : <span> {pro.price} </span> }   </h6>
                    {/* <h6> { pro.id } </h6> */}


                    <div className='position-absolute top-0 end-0 bg-info p-1' >
                        { pro.ratingsAverage }
                    </div>


                </div>

                </Link>

                <div className="lower">
                <button id={ `addBtn${ idx }` } onClick={ function(){ addMyProduct( pro.id , idx ) } } className='btn btn-success' > + </button>
                <button id={ `removeBtn${ idx }` } style={ { 'display' : 'none' } } className='btn btn-danger' > - </button>


                </div>

                </div>




            </div>  
            } ) }
        </div>
        </div> : <LodingScreen />
    }




    </>
    }

