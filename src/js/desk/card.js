import React from "react"
import { useRef, useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import useAuth from '../context/UseAuth';

const CARD_DELETE = "/card/delete"
const CARD_UPDATE = "/card/update"

const Card = ({task}) => { 
    const {auth} = useAuth();
    const [errMsg, setErrMsg] = useState('');
    
    const deleteItem = async (e) => {
        e.preventDefault();
        console.log("deleting");
        console.log("deleting task = ", task);

        try {
            const response = await axios.post(CARD_DELETE,
                {
                    "id": task.id,
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
            alert('Задача удалена!');
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
    
    const upItem = async (e) => {
        e.preventDefault();
        console.log("upping");
        console.log("upping task = ", task);
        if (task.position == 0)
        {
            alert('Задача в самом верху!');
            return;
        }
        let position = Number(task.position) - 1;
        console.log("upping task = ", task);
        console.log("upping positionNew = ", position);

        try {
            const response = await axios.post(CARD_UPDATE,
                {
                    "id": task.id,
                    "positionNew": position,
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
            alert('Задача поднята!');
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
    
    const downItem = async (e) => {
        e.preventDefault();
        console.log("upping");
        console.log("upping task = ", task);
        let position = Number(task.position) + 1;
        console.log("upping task = ", task);
        console.log("upping positionNew = ", position);

        try {
            const response = await axios.post(CARD_UPDATE,
                {
                    "id": task.id,
                    "positionNew": position,
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
            alert('Задача опущена!');
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

    console.log("Card task", task);
    return (
        <div>
        <div className="task_small">
            <div className="task_small_name">
            <h3>{task.name}</h3>
            </div>
            <div className="task_small_desc">
            <p>{task.description}</p>
            <button className="delete-button" onClick={(e) => deleteItem(e)} >
                <img src="{DELETE_ICON_PATH}" alt="Удалить" width="30" height="30" />
            </button>
            <button className="delete-button" onClick={(e) => upItem(e)} >
                <img src="{DELETE_ICON_PATH}" alt="Вверх" width="30" height="30" />
            </button>
            <button className="delete-button" onClick={(e) => downItem(e)} >
                <img src="{DELETE_ICON_PATH}" alt="Вниз" width="30" height="30" />
            </button>
            </div>
        </div>
        </div>
    );
}

  export default Card