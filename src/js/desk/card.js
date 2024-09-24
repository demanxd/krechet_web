import React from "react"

class Card extends React.Component { 
    constructor(props) {
        super(props)
        this.state = {
            editForm: false
        }
    }
    task = this.props.task
    render() {
        return (
            <div>
            <div className="task_small">
                <div className="task_small_name">
                <h3>{this.task.name}</h3>
                </div>
                <div className="task_small_desc">
                <p>{this.task.description}</p>
                </div>
            </div>
            </div>
        ) 
    }
}

  export default Card