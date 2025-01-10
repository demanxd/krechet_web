import React from "react";
import { useRef, useState, useEffect } from 'react';
import TasksList from "./taskslist"
import { useParams } from "react-router-dom";
import useAuth from '../context/UseAuth';

import axios from '../api/axios';
import {CARDS_URL, LIST_CREATE} from '../common/api_links'
import { fetchDeskData, handleCreateList } from '../common/api_funks';


const DeskView = () => {
    const [desks, setDesk] = useState([]);
    console.log("Desk");
    const {auth} = useAuth();
    console.log("Desk");
    console.log("Desk auth = ", auth);
    const params = useParams();
    console.log('desk param = ', params);
    const [listCreate, setListCreate] = useState('');

    useEffect(() => {
        fetchDeskData(setDesk, params, auth);
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
                                    <TasksList tasks={element} setDesk={setDesk} params={params} />
                                </div>
                            )
                        )
                    }
                    <form onSubmit={(e) => handleCreateList(e, listCreate, params, auth, setDesk)} className="tasks_small" name="dsfa">
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
                    <form onSubmit={(e) => handleCreateList(e, listCreate, params, auth, setDesk)} className="tasks_small" name="dsfa">
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

export default DeskView