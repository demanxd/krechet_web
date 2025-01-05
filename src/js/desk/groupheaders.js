import React from "react"
import { useRef, useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import useAuth from '../context/UseAuth';
const LIST_DELETE = "/list/delete"

const Groupheaders = ({group}) => {
    console.log("Groupheaders group ", group);
    const {auth} = useAuth();
    const [errMsg, setErrMsg] = useState('');
    
    const deleteItem = async (e) => {
        e.preventDefault();
        console.log("deleting");
        console.log("deleting group = ", group);

        try {
            const response = await axios.post(LIST_DELETE,
                {
                    "listID": group.id,
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
            console.log("response = ", response)
            alert('Лист удалён!');
        } catch (err) {
            console.log("err = ", err)
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
            alert(err.response?.data);
        }
    }
    
    return (
        <div className="group_headers">
            <h3>{group.group}
            <button className="delete-button" onClick={(e) => deleteItem(e)} >
                <img src="{DELETE_ICON_PATH}" alt="Удалить" width="30" height="30" />
            </button>
            </h3>
        </div>
    );
}

  export default Groupheaders