import { useRef, useState, useEffect } from 'react';
import React from "react";
import DesksList from "./deskslist"
import useAuth from '../context/UseAuth';

import axios from '../api/axios';
import { fetchUserDesks, handleCreateDesk } from '../common/api_funks';

import {DESKS_URL} from '../common/api_links'



const Home = () => {
    const [desks, setDesks] = useState([]);
    console.log("Home");
    const {auth} = useAuth();
    console.log("Home");
    console.log("Home auth = ", auth);
    useEffect(() => {
        fetchUserDesks(setDesks, auth);
    },[]);
    const [deskname, setDeskname] = useState('');
    
    
    console.log("Home data = ", desks);
    console.log("Home auth = ", auth);

    return (
        <div>
            { <div className="home">
                <div className="desks_body">
                    {
                        desks.map( (element) => ( 
                                <div key = {element.id} >
                                    <DesksList desk={element} setDesks={setDesks} />
                                </div>
                            )
                        )
                    }
                    <form onSubmit={(e) => handleCreateDesk(e, deskname, auth, setDesks)} className="desks_body" name="dsfa">
                        <input className="desks_body"
                            type="text"
                            onChange={(e) => setDeskname(e.target.value)}
                            value = {deskname}
                            required
                        />
                        <button className="desks_body">Add desk</button>
                    </form>
                </div>
                <div className="top_panel">
                    <h3>top panel</h3>
                </div>
                <aside>
                    <h3>aside panel</h3>
                </aside>
            </div> }
        </div>
    );
}

export default Home