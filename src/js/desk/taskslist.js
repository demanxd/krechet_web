import React from "react"
import { useRef, useState, useEffect, useContext } from 'react';
import Tasks from "./tasks"
import Groupheaders from "./groupheaders";
import axios from '../api/axios';
import useAuth from '../context/UseAuth';

const CARD_CREATE_URL = '/card/create';


const TasksList = ({tasks}) => {
    console.log("TasksList tasks", tasks);
    console.log("TasksList ", tasks[0]);
    console.log("TasksList ", tasks.length);
    const {auth} = useAuth();
    const [errMsg, setErrMsg] = useState('');
    const [addCards, setAddCards] = useState(new Map());

    const handleChange = (e, id, value) => {
        console.log("id = " + id + "value = " + value);
        console.log("e = ", e);
        setAddCards((prev) => new Map(prev).set(id, value));
    };

    const handleCreateCard = async (e, id) => {
        e.preventDefault();
        console.log("addCards ", addCards.get(id));

        try {
            const response = await axios.post(CARD_CREATE_URL,
                {
                    'titleNew': addCards.get(id),
                    'listIDNew' : id
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
    
    if (tasks.length > 0)
        return (
            <div className="tasks_small">
                <Groupheaders group={tasks[0]} />
                <Tasks tasks={tasks}  /> 
                <form onSubmit={(e) => handleCreateCard(e, tasks[0].id)} className="task_small" name="dsfa">
                    <input className="task_small"
                        type="text"
                        onChange={(e) => handleChange(tasks, tasks[0].id, e.target.value)}
                        value={addCards.get(tasks[0].id) || ''}
                        required
                    />
                    <button className="group_headers">Add card</button>
                </form>
            </div>
        )
    else
        return (
            <div className="tasks_small">
                <h3>No tasks</h3>
            </div>
        )
}

  export default TasksList