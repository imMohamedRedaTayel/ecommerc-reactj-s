import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LodingScreen from '../LodingScreen/LodingScreen';

export default function AllOrders( {crrUser } ) {

    const [ allOrders , setallOrders ] = useState(null)

    async function getAllOrders()
    {
        try 
        {
            const { data } = await axios.get( `https://route-ecommerce.onrender.com/api/v1/orders/user/${crrUser.id}`);
            setallOrders( data )

        } catch (error) 
        {
            console.log( " Error :" ,  error );
        }
    }

    useEffect( function(){
        getAllOrders();



    } , [] )

    return <>
        { allOrders? <div className="container text-center py-4">
        <h2> Hello User </h2>

        <div className="row">

            { allOrders.map( function( order , idx ){ return  <div key={ idx } className="col-md-3">
                <div className="order bg-primary text-white rounded-2 ">


                    <div className="container">
                        <div className="row">

                            { order.cartItems.map( function( item , index ){ return <div key={index} className="col-sm-6">
                                <div className="item">
                                    <img src={ item.product.imageCover } className='w-100' alt={item.product.title} />
                                    <h4> {item.product.title.slice( 0 , 10 ) } </h4>
                                    <h5> Count: {item.count} </h5>
                                    <h5> Price: {item.price} </h5>
                                </div>
                            </div> } ) }

                        </div>
                    </div>

                    <h5> Price: {order.totalOrderPrice} </h5>
                    <h5> Order Type: {order.paymentMethodType} </h5>
                    <p> This order was delivered to ( {order.shippingAddress.detalis} ) in ( {order.shippingAddress.city} ) 
                        whit this number: {order.shippingAddress.phone}  </p>
                </div>
            </div> } ) }

        </div>

    </div> : <LodingScreen /> }
    </>
}
