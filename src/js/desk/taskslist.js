import React from "react"
import { useState } from 'react';
import Tasks from "./tasks"
import Groupheaders from "./groupheaders";
import useAuth from '../context/UseAuth';
import { handleCreateCard } from "../common/api_funks";


const TasksList = ({tasks, setDesk, params}) => {
    console.log("TasksList tasks", tasks);
    console.log("TasksList ", tasks[0]);
    console.log("TasksList ", tasks.length);
    const {auth} = useAuth();
    const [addCards, setAddCards] = useState(new Map());

    const handleChange = (e, id, value) => {
        console.log("id = " + id + "value = " + value);
        console.log("e = ", e);
        setAddCards((prev) => new Map(prev).set(id, value));
    };
    
    if (tasks.length > 0)
        return (
            <div className="tasks_small">
                <Groupheaders group={tasks[0]} setDesk={setDesk} params={params}/>
                <Tasks tasks={tasks} setDesk={setDesk} params={params}  /> 
                <form onSubmit={(e) => handleCreateCard(e, tasks[0].id, addCards, auth, setDesk, params)} className="task_small" name="dsfa">
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