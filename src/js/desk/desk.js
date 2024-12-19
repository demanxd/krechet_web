import React from "react";
import { useRef, useState, useEffect, useContext } from 'react';
import TasksList from "./taskslist"
import { useParams } from "react-router-dom";
import useAuth from '../context/UseAuth';

import axios from '../api/axios';
const CARDS_URL = "/card/all"

const Desk = () => {
    const [errMsg, setErrMsg] = useState('');
    const [desks, setDesks] = useState([]);
    const componentIsMounted = useRef(true);
    let err;
    console.log("Desk");
    const {auth} = useAuth();
    console.log("Desk");
    console.log("Desk auth = ", auth);
    const params = useParams();
    console.log('desk param = ', params);

    useEffect(() => {

        async function fetchDesks() {
    
            try {
                console.log("on request");
                const response = await axios.post(CARDS_URL,
                    {
                        'boardID': params.deskID
                    },
                    {
                        timeout: 3000,
                        headers: {
                            'Authorization': 'Bearer ' + auth.accessToken,
                            'Host' : 'Krechet UI'
                        }
                    }
                );
                console.log("GetDescs");
                console.log("response = ", response);
    
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
    console.log("Desk auth = ", auth);
    console.log("Desk data = ", desks);

    if (desks.length !== 0)
    {
        return (
        <div>
            { <main>
                <div className="tasks_body">
                {
                    desks.map( (element) => ( 
                            <div key = {element.id} >
                                <TasksList tasks={element} />
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
            </main> }
        </div>
        )
    }
    else
    {
        return (
        <div>
            { <main>
                <div className="tasks_body">
                </div>
                <div className="top_panel">
                    <h3>top panel</h3>
                </div>
                <aside>
                    <h3>aside panel</h3>
                </aside>
            </main> }
        </div>
        )
    }
}

export default Desk