import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider";
import React from "react";
import DesksList from "./deskslist"
import useAuth from '../context/UseAuth';

import axios from '../api/axios';
const DESKS_URL = '/board/all';


const Home = () => {
    const [errMsg, setErrMsg] = useState('');
    const [desks, setDesks] = useState([]);
    const componentIsMounted = useRef(true);
    let err;
    console.log("Home");
    const {auth} = useAuth();
    console.log("Home");
    console.log("Home auth = ", auth);
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
    
    console.log("Home componentIsMounted = ", componentIsMounted);
    
    console.log("Home data = ", desks);
    console.log("Home auth = ", auth);

    return (
        <div>
            { <div className="home">
                <div className="tasks_body">
                {
                    desks.map( (element) => ( 
                            <div key = {element.id} >
                                <DesksList desk={element} />
                            </div>
                        )
                    )
                }
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