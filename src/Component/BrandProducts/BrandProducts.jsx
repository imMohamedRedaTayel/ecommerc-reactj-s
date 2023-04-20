import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import LodingScreen from './../LodingScreen/LodingScreen';

export default function BrandProducts() {


    const { id } =  useParams()

    const[ allProducts , setAllProducts ] = useState( null )

    async function getBrandProducts()
    {

        try 
        {
            let { data } = await axios.get( 'https://route-ecommerce.onrender.com/api/v1/products' , {
                params: { 'brand' : id }
            } )
            // console.log( data.data  );
            setAllProducts( data.data )
        } 
        catch (error) 
        {
            console.log( "Error: " , error );
        } 

    }

    useEffect( function(){

        getBrandProducts()

    } , [] )


    return <>

    { allProducts?  <div className="container">
        <div className="row">

            { allProducts.length == 0? <h2 className=' py-5 text-center' >
                No Product Avilable Right now...
            </h2> :    allProducts.map( function( pro , idx ){ return <div key={ idx } className="col-md-4">
    

                <Link to={`/prodetiles/${  pro.id  }`} >
                <div className="item bg-primary text-white rounded-3 position-relative ">
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
                
            </div> })}



        </div>
    </div> : <LodingScreen/> 
    }
    


    </>
}
