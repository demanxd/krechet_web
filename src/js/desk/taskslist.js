import React from "react"
import Tasks from "./tasks"
import Groupheaders from "./groupheaders";

const TasksList = ({tasks}) => {
    console.log("TasksList tasks", tasks);
    console.log("TasksList ", tasks[0]);
    console.log("TasksList ", tasks.length);
    
    if (tasks.length > 0)
        return (
            <div className="tasks_small">
                <Groupheaders group={tasks[0]} />
                { <Tasks tasks={tasks}  /> }
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