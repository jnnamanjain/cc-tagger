import React, { useState, useEffect } from 'react';
import Utils from "../Utils";
import {Redirect} from "react-router";

class Login extends React.Component{
    constructor(props)
    {
        super(props);
        //console.log(" ***************** ");
    }
    //backendURL = "http://localhost/Codechef Backend/public/index.php";

    //redirectURL = "http://" + window.location.hostname + ':' + window.location.port + '/oauth';
    
    async componentDidMount() {
        //console.log(typeof window.location.href);
        if(window.location.search.includes('code'))
        {
            let query = window.location.search.substring(1);
      
            let authcode = query.split("&")[0].split("=")[1];
            
            //data  =
            fetch(Utils.backendURL+'/authorize',{
                method : 'GET',
                headers : {
                    'AuthCode' : authcode,
                }
            }).then((res) => res.json())
            .then((data) => {
                localStorage.setItem(Utils.ACCESS_TOKEN, data.access_token);
                localStorage.setItem(Utils.REFRESH_TOKEN, data.refresh_token);
            });
            


        }
            
      }
      

    handleLogin() {
        console.log(this.state);
        window.location.assign(Utils.backendURL+'/login');
        
    }

    

    render() {
        if(Utils.isLoggedIn())
        return (
            <div>
                <button onClick = {
                    this.handleLogin.bind(this)
                }>LogOut</button>
            </div>
            )

        return (
        <div>
            <button onClick = {
                this.handleLogin.bind(this)
            }>
                    Login With CodeChef</button>
        </div>
        )
    };
}

export default Login;