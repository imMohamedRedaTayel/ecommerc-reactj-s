import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { cartContext } from '../Context/CartContext'
import LodingScreen from '../LodingScreen/LodingScreen'

export default function Cart() {

    const { cartProducts , totalCartPrice  , removeCartItem , updateCount } = useContext( cartContext )

    return <>
        { cartProducts?     <div className="container py-5 ">
        <h2 className='text-center' > Welcome User </h2>

        <div className="d-flex justify-content-between ">
        <h3> Totle Price: <span className='text-primary' > { totalCartPrice   } </span> </h3>
        <Link to="/Payment" > <button className='btn btn-primary' >Confirm </button> </Link>
        </div>

        <div className="row">

            <div className="col-md-4 ">
            { cartProducts.map( function( pro , idx ){ return  <div key={ idx } className="col-lg-4 d-flex ">
                <div className="product bg-info ">
                    <img src={ pro.product.imageCover  } className='w-100'  alt={pro.product.title} />
                    <h2> {pro.product.title.slice( 0 , 10 ) } </h2>
                    <h5> Count: {pro.count} </h5>
                    <h5> Price: {pro.price} </h5>

                    <input type="number" min={1} onChange={ function(e){ updateCount( pro.product.id , e.target.value ) } } 
                    value={ pro.count } className='form-control' placeholder='Count...' />

                    <button onClick={ function(){ removeCartItem( pro.product.id ) } } className='btn btn-danger' > Remove  </button>

                </div>
            </div> } ) }
            </div>
        </div>

    </div> : <LodingScreen /> }
    </>
    }
