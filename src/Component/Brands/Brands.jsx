import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LodingScreen from '../LodingScreen/LodingScreen';
import { Link } from 'react-router-dom';

export default function Brands() {

    const [ allBrands , setAllProducts ] = useState( null )

    async function getAllBrands()
    {
        try 
        {
            const { data } =  await axios.get( 'https://route-ecommerce.onrender.com/api/v1/brands' );
            // console.log( data.data );
            // allProducts = data.data

            setAllProducts( data.data )

        } 
        catch (error) 
        {
            console.log( "Error: " , error );
        }
    }


    useEffect(  function(){
        getAllBrands()
    } , []  )

    return <>

        { allBrands?  <div className="container">
            <div className="row align-items-center">

                <div className="col-lg-3 ">
                    <div className="title text-center ">
                        <h3> Our Brands </h3>
                        <p> Lorem ipsum, dolor sit amet consectetur adipisicing elit rerum perferendis. </p>
                    </div>
                </div>

                { allBrands.map( function( pro , idx ){ return <div key={ idx } className="col-lg-3">

                    <Link to={ `/brandprouducts/${ pro._id }` } > 
                    <div className="brand">
                        <img src={ pro.image } className='w-100' alt={ pro.name } />
                        <h5 className='text-center text-secondary' > { pro.name } </h5>
                        {/* <h6> { pro._id } </h6> */}
                    </div>
                    </Link>

                </div> } ) }

            </div>
        </div> : <LodingScreen /> 
        }



    </>
}
