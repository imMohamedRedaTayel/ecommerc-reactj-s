import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';

    export default function Rigster() {

    let user = 
    { 
        name: '',
        email: '',
        phone: '',
        password: '',
        rePassword: '',
    }

    const navigate = useNavigate()

    async function registerNewUser( obj ){

        // let { dataObj } =  await axios.post( 'https://route-ecommerce.onrender.com/api/v1/auth/signup' , obj )
        // console.log( dataObj.response.data.message );

        try 
        {
            let { data } =  await axios.post( 'https://route-ecommerce.onrender.com/api/v1/auth/signup' , obj )
            // console.log( dataObj.response.data.message );
            console.log( data );
            if (data.message == 'success' ) {
                $('.sucMsg').fadeIn( 1000 , function() {
                    navigate( '/login' );
                } )
            }

        } 
        catch (error) 
        {
            // console.log( error.response.data.message );
            $('.errMsg').fadeIn( 1000 , function() {
                setTimeout(() => {
                    $( '.errMsg' ).fadeOut( 1000 )
                }, 3000);
            } )
        }

    }

    let formik = useFormik( {

        initialValues: user,

        onSubmit: function( values ){
            console.log({values} );
            // call API
            // Send object to backend
            registerNewUser( values );

        },

        validate: function( x ){
            // console.log( x );
            let errors = {}

            if ( x.name.length < 3 || x.name.length > 15 ) 
            {
                errors.name = "name must be more than 3 characters and less than 10"
            }

            if (  x.email.includes( '@' ) == false || x.email.includes( '.com' ) == false ) 
            {
                errors.email = 'Email must be vaild'
            }

            if ( ! x.phone.match( /^(02)?01[0125][0-9]{8}$/ )  ) 
            {
                errors.phone = "Phone must be egyptian number"
            }

            if ( x.password.length < 6 || x.password.length > 12 ) 
            {
                errors.password = 'password Must br from 6 to 12 character only.';
            }

            if ( x.password !== x.rePassword ) 
            {
                errors.rePassword = 'password and Repassword not matched.';
            }

            return errors
        }

    } );

    return <>
    
    <div className="container py-5">

        <h2> Rigisteration Form </h2>

        <div style={ { 'display': 'none' } } className=' errMsg alert alert-danger text-center' >
            Email already in use
        </div>

        <div style={ { 'display': 'none' } } className=' sucMsg alert alert-success text-center' >
            welcome 
        </div>

        <form onSubmit={ formik.handleSubmit  } >
            <label className='mt-3' htmlFor="name">name</label>
            <input onBlur={ formik.handleBlur }  onChange={ formik.handleChange } value={ formik.values.name } type="text" id='name' placeholder='name' className='form-control'  />
            { formik.errors.name && formik.touched.name ?   <div className='alert alert-danger text-center' > { formik.errors.name } </div> : ''  }


            <label className='mt-3' htmlFor="email">email</label>
            <input onBlur={ formik.handleBlur } onChange={ formik.handleChange } value={ formik.values.email } type="email" id='email' placeholder='email' className='form-control'  />
            { formik.errors.email && formik.touched.email ?   <div className='alert alert-danger text-center' > { formik.errors.email } </div> : ''  }


            <label className='mt-3' htmlFor="phone">phone</label>
            <input onBlur={ formik.handleBlur } onChange={ formik.handleChange } value={ formik.values.phone } type="text" id='phone' placeholder='phone' className='form-control'  />
            { formik.errors.phone && formik.touched.phone ?   <div className='alert alert-danger text-center' > { formik.errors.phone } </div> : ''  }


            <label className='mt-3' htmlFor="password">password</label>
            <input onBlur={ formik.handleBlur } onChange={ formik.handleChange } value={ formik.values.password } type="password" id='password' placeholder='password' className='form-control'  />
            { formik.errors.password && formik.touched.password ?   <div className='alert alert-danger text-center' > { formik.errors.password } </div> : ''  }


            <label className='mt-3' htmlFor="rePassword">rePassword</label>
            <input onBlur={ formik.handleBlur } onChange={ formik.handleChange } value={ formik.values.rePassword  } type="password" id='rePassword' placeholder='repassword' className='form-control'  />
            { formik.errors.rePassword && formik.touched.rePassword ?   <div className='alert alert-danger text-center' > { formik.errors.rePassword } </div> : ''  }


            <button type='submit' className='btn btn-outline-primary mt-3' >Register</button>

        </form>

    </div>

    </>
    }
