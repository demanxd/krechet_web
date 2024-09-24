import React from "react";
import TasksList from "./taskslist"
// import Header from "./header";
// import Users from "./users";
// import AddUser from "./AddUser";

//axios for rest

class Desk extends React.Component {
    constructor(props) {
        super(props)
        this.state = [
            [
                {
                    group: 'ToDo'
                },
                {
                    cards: [
                        {
                            id: 1,
                            name: 'Создание первой версии кречета',
                            description: 'Создание первой самостоятельной версии кречета, которая послужит намёком на полноценную замену забугорного сервиса трелло'
                        },
                        {
                            id: 2,
                            name: 'Улучшение первой версии кречета',
                            description: 'Улучшение первой самостоятельной версии кречета, которая послужит намёком на полноценную замену забугорного сервиса трелло'
                        }
                    ]
                }
            ],
            [
                {
                    group: 'InProgress'
                },
                {
                    cards: [
                        {
                            id: 3,
                            name: 'Создание первой версии кречета',
                            description: 'Создание первой самостоятельной версии кречета, которая послужит намёком на полноценную замену забугорного сервиса трелло'
                        },
                        {
                            id: 4,
                            name: 'Улучшение первой версии кречета',
                            description: 'Улучшение первой самостоятельной версии кречета, которая послужит намёком на полноценную замену забугорного сервиса трелло'
                        }
                    ]
                }
            ]
        ]
    }

    render() {
        console.log("main", this.state);
        return (<div>
            { <main>
                <tasks_body>
                {
                    this.state.map( (element) => ( 
                            <div>
                                <TasksList tasks={element} key = {element.id} />
                            </div>
                        )
                    )
                }
                </tasks_body>
                <top_panel>
                    <h3>top panel</h3>
                </top_panel>
                <aside>
                    <h3>aside panel</h3>
                </aside>
            </main> }
        </div>)
    }
}

export default Desk