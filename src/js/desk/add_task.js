import React from "react"

class AddUser extends React.Component {
    userAdd = {}
    constructor(props) {
        super(props)
        this.state = [
                        {
                            name: 'Создание первой версии кречета',
                            description: 'Создание первой самостоятельной версии кречета, которая послужит намёком на полноценную замену забугорного сервиса трелло'
                        }
                    ]
    }
    render() {
        return (
            <form ref={(el) => this.addUserForm = el}>
                <input placeholder="firstname" onChange={(e) => this.setState({firstname: e.target.value})}/>
                <input placeholder="lastname" onChange={(e) => this.setState({lastname: e.target.value})}/>
                <textarea placeholder="bio" onChange={(e) => this.setState({bio: e.target.value})}></textarea>
                <input placeholder="age" onChange={(e) => this.setState({age: e.target.value})}/>
                <label htmlFor="isHappy">Happy?</label>
                <input type="checkbox" id="isHappy" onChange={(e) => this.setState({isHappy: e.target.checked})}/>
                <button type="button" onClick={() =>{
                    this.addUserForm.reset()
                    this.userAdd = {
                        firstname: this.state.firstname,
                        lastname: this.state.lastname,
                        bio: this.state.bio,
                        age: this.state.age,
                        isHappy: this.state.isHappy,
                    }
                    if (this.props.user)
                        this.userAdd.id = this.props.user.id
                    this.props.onAdd(this.userAdd)}
                }>Add</button>
            </form>
        )
    }
}

export default AddUser