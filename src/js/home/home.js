import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider";
import React from "react";
import DesksList from "./deskslist"
import useAuth from '../context/UseAuth';
import {useNavigate} from 'react-router-dom';

import axios from '../api/axios';
import Button from '../common/button'

const DESKS_URL = '/board/all';
const DESK_CREATE_URL = '/board/create'
const DESK_REMOVE_URL = '/board/delete'
const DESK_UPDATE_URL = '/board/update'


//add KNOPA4KI

const Home = () => {
    const [errMsg, setErrMsg] = useState('');
    const [desks, setDesks] = useState([]);
    const componentIsMounted = useRef(true);
    const errRef = useRef();
    let err;
    console.log("Home");
    const {auth} = useAuth();
    console.log("Home");
    console.log("Home auth = ", auth);
    const navigate = useNavigate();
    useEffect(() => {

        async function fetchDesks() {
    
            try {
                const response = await axios.get(DESKS_URL,
                    {
                        timeout: 3000,
                        headers: {
                            'Authorization': 'Bearer ' + auth.accessToken,
                            'Host' : 'Krechet UI'
                        }
                    }
                );
                console.log("GetDescs");
    
                if (componentIsMounted.current) {
                    setDesks(response?.data);
                }
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 400) {
                    setErrMsg('Missing Username or Password');
                } else if (err.response?.status === 401) {
                    setErrMsg('Unauthorized');
                } else {
                    setErrMsg('Login Failed');
                }
            }
        }

        fetchDesks();
    },[]);
    const [deskname, setDeskname] = useState('');

    const handleCreateDesk = async (e) => {
        e.preventDefault();
        console.log("deskname ", deskname)

        try {
            const response = await axios.post(DESK_CREATE_URL,
                {
                    'boardname': deskname,
                },
                {
                    timeout: 3000,
                    headers: {
                        'Authorization': 'Bearer ' + auth.accessToken,
                        'Host' : 'Krechet UI'
                    }
                }
            );
            console.log(JSON.stringify(response?.data));
            // navigate('/home');
        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response');
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                console.log('Missing Username or Password');
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                console.log('Unauthorized');
                setErrMsg('Unauthorized');
            } else {
                console.log('Login Failed');
                setErrMsg('Login Failed');
            }
        }
    }
    
    console.log("Home componentIsMounted = ", componentIsMounted);
    
    console.log("Home data = ", desks);
    console.log("Home auth = ", auth);

    return (
        <div>
            { <div className="home">
                <div className="desks_body">
                    {
                        desks.map( (element) => ( 
                                <div key = {element.id} >
                                    <DesksList desk={element} />
                                </div>
                            )
                        )
                    }
                    <form onSubmit={(e) => handleCreateDesk(e)} className="desks_body" name="dsfa">
                        <input className="desks_body"
                            type="text"
                            onChange={(e) => setDeskname(e.target.value)}
                            value = {deskname}
                            required
                        />
                        <button className="desks_body">Add desk</button>
                    </form>
                </div>
                <div className="top_panel">
                    <h3>top panel</h3>
                </div>
                <aside>
                    <h3>aside panel</h3>
                </aside>
            </div> }
        </div>
    );
}

export default Home