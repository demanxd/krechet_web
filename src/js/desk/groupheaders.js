import React from "react"

class Groupheaders extends React.Component {
    name = this.props.tasks.group
    render() {
        console.log("props ", this.props);
        console.log("name ", this.name.group);
        
        return (
            <div className="group_headers">
                <h3>{this.name}</h3>
            </div>
        ) 
    }
}

  export default Groupheaders