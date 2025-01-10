import React from "react"
import useAuth from '../context/UseAuth';
import { deleteList } from "../common/api_funks";

const Groupheaders = ({group, setDesk, params}) => {
    console.log("Groupheaders group ", group);
    const {auth} = useAuth();
    
    return (
        <div className="group_headers">
            <h3>{group.group}
            <button className="delete-button" onClick={(e) => deleteList(e, group, auth, setDesk, params)} >
                <img src="{DELETE_ICON_PATH}" alt="Удалить" width="30" height="30" />
            </button>
            </h3>
        </div>
    );
}

  export default Groupheaders