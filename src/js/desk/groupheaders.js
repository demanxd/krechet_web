import React from "react"

const Groupheaders = ({group}) => {
    console.log("Groupheaders group ", group);
    
    return (
        <div className="group_headers">
            <h3>{group.group}</h3>
        </div>
    );
}

  export default Groupheaders