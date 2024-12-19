import React from "react"

const Card = ({task}) => { 
    console.log("Card task", task);
    return (
        <div>
        <div className="task_small">
            <div className="task_small_name">
            <h3>{task.name}</h3>
            </div>
            <div className="task_small_desc">
            <p>{task.description}</p>
            </div>
        </div>
        </div>
    );
}

  export default Card