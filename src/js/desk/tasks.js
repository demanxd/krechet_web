import React from "react"
import Card from "./card"


const Tasks = ({tasks}) => {
    console.log("Tasks ", tasks);
    const arr = tasks.slice(1);
    console.log("Tasks slice ", arr);
    if (arr.length > 0)
    {
        return (
            <div>
            {
                arr.map( (element) => ( 
                        <div key = {element.id}>
                            <Card task = {element}/>
                        </div>
                    )
                ) 
            }
            </div>
        )
    }
}

  export default Tasks