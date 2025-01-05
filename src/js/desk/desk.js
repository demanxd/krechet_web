import React from "react";
import { useRef, useState, useEffect, useContext } from 'react';
import TasksList from "./taskslist"
import { useParams } from "react-router-dom";
import useAuth from '../context/UseAuth';

import axios from '../api/axios';
const CARDS_URL = "/card/all"
const LIST_CREATE = "/list/create"

const Desk = () => {
    const [desks, setDesks] = useState([]);
    const componentIsMounted = useRef(true);
    let err;
    console.log("Desk");
    const {auth} = useAuth();
    console.log("Desk");
    console.log("Desk auth = ", auth);
    const params = useParams();
    console.log('desk param = ', params);
    const [errMsg, setErrMsg] = useState('');
    const [listCreate, setListCreate] = useState('');

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

    const handleCreateList = async (e) => {
        e.preventDefault();
        console.log("listCreate ", listCreate);

        try {
            const response = await axios.post(LIST_CREATE,
                {
                    "boardID": params.deskID,
                    "listName": listCreate
                },
                {
                    timeout: 3000,
                    headers: {
                        'Authorization': 'Bearer ' + auth.accessToken,
                        'Host' : 'Krechet UI'
                    }
                }
            );
            console.log("console return", JSON.stringify(response?.data));
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
                    <form onSubmit={(e) => handleCreateList(e)} className="tasks_small" name="dsfa">
                        <input className="group_headers"
                            type="text"
                            onChange={(e) => setListCreate(e.target.value)}
                            value = {listCreate}
                            required
                        />
                        <button className="task_small">Add list</button>
                    </form>
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
                    <form onSubmit={(e) => handleCreateList(e)} className="tasks_small" name="dsfa">
                        <input className="group_headers"
                            type="text"
                            onChange={(e) => setListCreate(e.target.value)}
                            value = {listCreate}
                            required
                        />
                        <button className="task_small">Add list</button>
                    </form>
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