import React from "react"
import useAuth from '../context/UseAuth';
import { deleteTask, upTask, downTask, handleMoveLeft, handleMoveRight } from "../common/api_funks";


const Card = ({task, setDesk, params}) => { 
    const {auth} = useAuth();

    console.log("Card task", task);
    return (
        <div>
        <div className="task_small">
            <div className="task_small_name">
            <h3>{task.name}</h3>
            </div>
            <div className="task_small_desc">
            <p>{task.description}</p>
            <button className="delete-button" onClick={(e) => deleteTask(e, task, auth, setDesk, params)} >
                <img src="{DELETE_ICON_PATH}" alt="Удалить" width="30" height="30" />
            </button>
            <button className="delete-button" onClick={(e) => upTask(e, task, auth, setDesk, params)} >
                <img src="{DELETE_ICON_PATH}" alt="Вверх" width="30" height="30" />
            </button>
            <button className="delete-button" onClick={(e) => downTask(e, task, auth, setDesk, params)} >
                <img src="{DELETE_ICON_PATH}" alt="Вниз" width="30" height="30" />
            </button>
            <button className="delete-button" onClick={(e) => handleMoveLeft(e, task, auth, setDesk, params)} >
                <img src="{DELETE_ICON_PATH}" alt="Влево" width="30" height="30" />
            </button>
            <button className="delete-button" onClick={(e) => handleMoveRight(e, task, auth, setDesk, params)} >
                <img src="{DELETE_ICON_PATH}" alt="Вправо" width="30" height="30" />
            </button>
            </div>
        </div>
        </div>
    );
}

  export default Card