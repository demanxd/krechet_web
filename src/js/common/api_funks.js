import axios from '../api/axios';
import {DESKS_URL, DESK_CREATE_URL, BOARD_DELETE, 
        CARDS_URL, LIST_CREATE, CARD_DELETE, 
        CARD_UPDATE, LIST_DELETE, CARD_CREATE_URL} from '../common/api_links'


export async function fetchUserDesks(setDesks, auth) {

    try {
        const response = await axios.get(DESKS_URL,
            {
                timeout: 3000,
                headers: {
                    'Authorization': 'Bearer ' + auth.accessToken,
                    'Host' : 'Krechet UI'
                }
            }
        );
        console.log("GetDescs");

        setDesks(response?.data);
    } catch (err) {
        if (!err?.response) {
            console.log('No Server Response');
        } else if (err.response?.status === 400) {
            console.log('Missing Username or Password');
        } else if (err.response?.status === 401) {
            console.log('Unauthorized');
        } else {
            console.log('Login Failed');
        }
        alert(err.response?.data);
    }
}

export const handleCreateDesk = async (e, deskname, auth, setDesks) => {
    e.preventDefault();
    console.log("deskname ", deskname)

    try {
        const response = await axios.post(DESK_CREATE_URL,
            {
                'boardname': deskname,
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
        fetchUserDesks(setDesks, auth);
    } catch (err) {
        if (!err?.response) {
            console.log('No Server Response');
        } else if (err.response?.status === 400) {
            console.log('Missing Username or Password');
        } else if (err.response?.status === 401) {
            console.log('Unauthorized');
        } else {
            console.log('Login Failed');
        }
    }
};
    
export const deleteDesk = async (e, desk, auth, setDesks) => {
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
        fetchUserDesks(setDesks, auth);
        alert('Доска удалена!');
    } catch (err) {
        if (!err?.response) {
            console.log('No Server Response');
        } else if (err.response?.status === 400) {
            console.log('Missing Username or Password');
        } else if (err.response?.status === 401) {
            console.log('Unauthorized');
        } else {
            console.log('Login Failed');
        }
        alert(err.response?.data);
    }
};


export async function fetchDeskData(setDesk, params, auth) {
    console.log("boardID ", params.deskID)
    
    try {
        console.log("on request");
        const response = await axios.post(CARDS_URL,
            {
                'boardID': params.deskID
            },
            {
                timeout: 3000,
                headers: {
                    'Authorization': 'Bearer ' + auth.accessToken,
                    'Host' : 'Krechet UI'
                }
            }
        );
        console.log("GetDescs");
        console.log("response = ", response);

        setDesk(response?.data);
    } catch (err) {
        if (!err?.response) {
            console.log('No Server Response');
        } else if (err.response?.status === 400) {
            console.log('Missing Username or Password');
        } else if (err.response?.status === 401) {
            console.log('Unauthorized');
        } else {
            console.log('Login Failed');
        }
        alert(err.response?.data);
    }
}

export const handleCreateList = async (e, listCreate, params, auth, setDesk) => {
    e.preventDefault();
    console.log("listCreate ", listCreate);

    try {
        const response = await axios.post(LIST_CREATE,
            {
                "boardID": params.deskID,
                "listName": listCreate
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
        fetchDeskData(setDesk, params, auth);
    } catch (err) {
        if (!err?.response) {
            console.log('No Server Response');
        } else if (err.response?.status === 400) {
            console.log('Missing Username or Password');
        } else if (err.response?.status === 401) {
            console.log('Unauthorized');
        } else {
            console.log('Login Failed');
        }
    }
};

export const deleteTask = async (e, task, auth, setDesk, params) => {
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
        fetchDeskData(setDesk, params, auth);
        alert('Задача удалена!');
    } catch (err) {
        if (!err?.response) {
            console.log('No Server Response');
        } else if (err.response?.status === 400) {
            console.log('Missing Username or Password');
        } else if (err.response?.status === 401) {
            console.log('Unauthorized');
        } else {
            console.log('Login Failed');
        }
    }
}
    
export const upTask = async (e, task, auth, setDesk, params) => {
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
        fetchDeskData(setDesk, params, auth);
        alert('Задача поднята!');
    } catch (err) {
        if (!err?.response) {
            console.log('No Server Response');
        } else if (err.response?.status === 400) {
            console.log('Missing Username or Password');
        } else if (err.response?.status === 401) {
            console.log('Unauthorized');
        } else {
            console.log('Login Failed');
        }
    }
}

export const downTask = async (e, task, auth, setDesk, params) => {
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
        fetchDeskData(setDesk, params, auth);
        alert('Задача опущена!');
    } catch (err) {
        if (!err?.response) {
            console.log('No Server Response');
        } else if (err.response?.status === 400) {
            console.log('Missing Username or Password');
        } else if (err.response?.status === 401) {
            console.log('Unauthorized');
        } else {
            console.log('Login Failed');
        }
    }
}

export const handleMoveRight = async (e, task, auth, setDesk, params) => {
    e.preventDefault();
    console.log("upping");
    console.log("upping task = ", task);
    let list = Number(task.list) + 1;
    let position = Number(task.position);
    console.log("upping task = ", task);
    console.log("upping list = ", list);

    try {
        const response = await axios.post(CARD_UPDATE,
            {
                "id": task.id,
                "listIDNew": list,
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
        fetchDeskData(setDesk, params, auth);
        alert('Задача перемещена вправо!');
    } catch (err) {
        if (!err?.response) {
            console.log('No Server Response');
        } else if (err.response?.status === 400) {
            console.log('Missing Username or Password');
        } else if (err.response?.status === 401) {
            console.log('Unauthorized');
        } else {
            console.log('Login Failed');
        }
    }
}

export const handleMoveLeft = async (e, task, auth, setDesk, params) => {
    e.preventDefault();
    console.log("upping");
    console.log("upping task = ", task);
    let list = Number(task.list) - 1;
    let position = Number(task.position);
    console.log("upping task = ", task);
    console.log("upping list = ", list);

    try {
        const response = await axios.post(CARD_UPDATE,
            {
                "id": task.id,
                "listIDNew": list,
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
        fetchDeskData(setDesk, params, auth);
        alert('Задача перемещена влево!');
    } catch (err) {
        if (!err?.response) {
            console.log('No Server Response');
        } else if (err.response?.status === 400) {
            console.log('Missing Username or Password');
        } else if (err.response?.status === 401) {
            console.log('Unauthorized');
        } else {
            console.log('Login Failed');
        }
    }
}
    
export const deleteList = async (e, group, auth, setDesk, params) => {
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
        console.log("response = ", response);
        fetchDeskData(setDesk, params, auth);
        alert('Лист удалён!');
    } catch (err) {
        console.log("err = ", err)
        if (!err?.response) {
            console.log('No Server Response');
        } else if (err.response?.status === 400) {
            console.log('Missing Username or Password');
        } else if (err.response?.status === 401) {
            console.log('Unauthorized');
        } else {
            console.log('Login Failed');
        }
        alert(err.response?.data);
    }
}

export const handleCreateCard = async (e, id, addCards, auth, setDesk, params) => {
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
        fetchDeskData(setDesk, params, auth);
    } catch (err) {
        if (!err?.response) {
            console.log('No Server Response');
        } else if (err.response?.status === 400) {
            console.log('Missing Username or Password');
        } else if (err.response?.status === 401) {
            console.log('Unauthorized');
        } else {
            console.log('Login Failed');
        }
    }
}