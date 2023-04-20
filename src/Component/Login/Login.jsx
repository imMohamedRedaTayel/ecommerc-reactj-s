import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';

    export default function Login( { getUserData } ) {

        // x.getUserData

    let user = 
    { 
        email: '',
        password: '',
    }

    const navigate = useNavigate()

    async function loginUser( obj ){

        // let { dataObj } =  await axios.post( 'https://route-ecommerce.onrender.com/api/v1/auth/signup' , obj )
        // console.log( dataObj.response.data.message );

        try 
        {
            let { data } =  await axios.post( 'https://route-ecommerce.onrender.com/api/v1/auth/signin' , obj )
            // console.log( dataObj.response.data.message );
            console.log( data );
            if (data.message == 'success' ) {

                // console.log( dataObj.token );
                localStorage.setItem( 'tkn' , data.token ); 
                getUserData();

                $('.sucMsg').fadeIn( 1000 , function() {
                    navigate( '/home' )
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
            // console.log('submit..' , values );

            // call API
            // Send object to backend
            loginUser( values );

        },

        validate: function( x ){
            // console.log( x );
            let errors = {}



            if (  x.email.includes( '@' ) == false || x.email.includes( '.com' ) == false ) 
            {
                errors.email = 'Email must be vaild'
            }

            if ( x.password.length < 6 || x.password.length > 12 ) 
            {
                errors.password = 'password Must br from 6 to 12 character only.';
            }
            return errors
        }

    } );

    return <>
    
    <div className="container py-5">

        <h2> Login Form </h2>

        <div style={ { 'display': 'none' } } className=' errMsg alert alert-danger text-center' >
            Email or password unCorrect
        </div>

        <div style={ { 'display': 'none' } } className=' sucMsg alert alert-success text-center' >
            welcome 
        </div>

        <form onSubmit={ formik.handleSubmit  } >

            <label className='mt-3' htmlFor="email">email</label>
            <input onBlur={ formik.handleBlur } onChange={ formik.handleChange } value={ formik.values.email } type="email" id='email' placeholder='email' className='form-control'  />
            { formik.errors.email && formik.touched.email ?   <div className='alert alert-danger text-center' > { formik.errors.email } </div> : ''  }

            <label className='mt-3' htmlFor="password">password</label>
            <input onBlur={ formik.handleBlur } onChange={ formik.handleChange } value={ formik.values.password } type="password" id='password' placeholder='password' className='form-control'  />
            { formik.errors.password && formik.touched.password ?   <div className='alert alert-danger text-center' > { formik.errors.password } </div> : ''  }

            <button type='submit' className='btn btn-outline-primary mt-3' >Login</button>

        </form>

    </div>

    </>
    }
