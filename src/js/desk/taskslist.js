import React from "react"
import Tasks from "./tasks"
import Groupheaders from "./groupheaders";

class TasksList extends React.Component {
    
    
    render() {
        console.log("Tasks ", this.props);
        if (this.props.tasks.length > 0)
            return (
                <div className="tasks_small">
                    <Groupheaders tasks={this.props.tasks[0]} />
                    <Tasks tasks={this.props.tasks[1]} /* onEdit={this.editUser} onDelete={this.deleteUser}*/ />
                </div>
            )
        else
            return (
                <div className="tasks_small">
                    <h3>No tasks</h3>
                </div>
            )
    }
}

  export default TasksList