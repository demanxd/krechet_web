import React from "react"
import { Link } from "react-router-dom";
import useAuth from '../context/UseAuth';
import { deleteDesk } from "../common/api_funks";



const Desks = ({desk, setDesks}) => {
    const {auth} = useAuth();
    
    console.log("Desks, desk", desk);
    return (
        <div>
        <div className="desk_small">
            <div className="desk_small_name">
                <Link key={desk.id} to = {`/desk/${desk.id}`}>
                    <h3>{desk.name}</h3>
                </Link>
                <button className="delete-button" onClick={(e) => deleteDesk(e, desk, auth, setDesks)} >
                    <img src="{DELETE_ICON_PATH}" alt="Удалить" width="30" height="30" />
                </button>
            </div>
            <div className="desk_small_desc">
            <p>{desk.description}</p>
            </div>
        </div>
        </div>
    );
}

  export default Desks