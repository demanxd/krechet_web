import React from "react"
import { Link } from "react-router-dom";
import { useRef, useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import useAuth from '../context/UseAuth';

const BOARD_DELETE = "/board/delete"



const Desks = ({desk}) => {
    const {auth} = useAuth();
    const [errMsg, setErrMsg] = useState('');
    
    const deleteItem = async (e) => {
        e.preventDefault();
        console.log("deleting");
        console.log("deleting desk = ", desk);

        try {
            const response = await axios.post(BOARD_DELETE,
                {
                    "boardID": desk.id,
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
            alert('Доска удалена!');
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
            alert(err.response?.data);
        }

    }
    
    console.log("Desks, desk", desk);
    return (
        <div>
        <div className="desk_small">
            <div className="desk_small_name">
                <Link key={desk.id} to = {`/desk/${desk.id}`}>
                    <h3>{desk.name}</h3>
                </Link>
                <button className="delete-button" onClick={(e) => deleteItem(e)} >
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