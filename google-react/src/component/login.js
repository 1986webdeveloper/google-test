import React, { useState,useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect,useHistory } from 'react-router-dom';
import {config} from '../config' 
function Login(props) {
    let history = useHistory();
    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem('userDetails'));
        if(userData){
            history.push('/PeoplesList')
        }
    })
 
  // handle button click of login form
  const handleLogin = (response) => {
    if(response.error){
        console.log('error')
    }else{
        localStorage.setItem('userDetails',JSON.stringify(response))
        history.push('/PeoplesList')

    }
  }
  return (
    <div>
      <GoogleLogin
                clientId={config.googleClientId}
                buttonText="Login with Google"
                onSuccess={handleLogin}
                onFailure={handleLogin}
                scope='https://www.googleapis.com/auth/calendar ' ></GoogleLogin>
    </div>
  );
}
 

 
export default Login;