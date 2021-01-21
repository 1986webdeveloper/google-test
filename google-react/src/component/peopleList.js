import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Redirect, useHistory } from 'react-router-dom';
import { config } from '../config'
import axios from "axios";


function PeopleList() {
    let history = useHistory();

    const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('userDetails')));
    const [userContactList, setUserContactList] = useState([]); 
    

    useEffect(() => {

        getPeopleList();

    }, [])
    const getPeopleList = () => {
        axios.post(`${config.apiURL}user/getUserPeoples`, {
            googleDetails: userDetails,
        })
            .then(function (response) {
                setUserContactList(response.data.data.connections)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const logout = () =>{
        localStorage.removeItem('userDetails')
        history.push('/')
    }
    const mangeEvent = (email) =>{
        axios.post(`${config.apiURL}user/addEventInvitation`, {
            googleDetails: userDetails,
            email: email,
        })
            .then(function (response) {
                // setUserContactList(response.data.data.connections)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <>
            <GoogleLogout
                clientId={config.googleClientId}
                buttonText="Logout"
                onLogoutSuccess={logout}
                scope='https://www.googleapis.com/auth/contacts'
            ></GoogleLogout>
            {userContactList && userContactList.length > 0 ? <table>
                <thead>
                <tr>
                    <th>User Name</th>
                    <th>EMail Address</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {userContactList.map((value, index) => {
                    JSON.stringify(value)
                    return( 
                        
                    <tr>
                       
                        <td>{value.names ? value.names[0].displayName : ''}</td>
                        <td>{value.emailAddresses ? value.emailAddresses[0].value : ''}</td>
                        <td><button disabled={value.emailAddresses ? false : true} onClick={()=>mangeEvent(value.emailAddresses[0].value)}>Send Invitation</button></td>
                    </tr>
                    )
                })}
                </tbody>
            </table> : '<h2> No contact Found </h2>' }
        </>
    )

}
export default PeopleList;