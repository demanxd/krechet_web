import React from "react"
import Task from "./task"



class Tasks extends React.Component {
    render() {
        console.log(this.props);
        if (this.props.tasks.cards.length > 0)
            return (
                <div>
                    {
                        this.props.tasks.cards.map( (element) => ( 
                                <div>
                                    <Task key = {element.id} task = {element} />
                                </div>
                            )
                        ) 
                    }
                </div>
            )
    }
}

  export default Tasks