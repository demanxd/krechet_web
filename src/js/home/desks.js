import React from "react"
import { Link } from "react-router-dom";



const Desks = ({desk}) => {
    
    console.log("Desks, desk", desk);
    return (
        <div>
        <div className="desk_small">
            <div className="desk_small_name">
            <Link key={desk.id} to = {`/desk/${desk.id}`}>
                <h3>{desk.name}</h3>
            </Link>
            </div>
            <div className="desk_small_desc">
            <p>{desk.description}</p>
            </div>
        </div>
        </div>
    );
}

  export default Desks