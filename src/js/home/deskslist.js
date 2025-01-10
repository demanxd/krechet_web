import React from "react"
import Desks from "./desks"

const DesksList = ({desk, setDesks}) => {

    console.log("DesksList desk", desk);
    return (
        <div className="tasks_small">
            <Desks desk={desk} setDesks={setDesks} />
        </div>
    );
}

  export default DesksList