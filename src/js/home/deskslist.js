import React from "react"
import Desks from "./desks"

const DesksList = ({desk}) => {

    console.log("DesksList desk", desk);
    return (
        <div className="tasks_small">
            <Desks desk={desk} />
        </div>
    );
}

  export default DesksList