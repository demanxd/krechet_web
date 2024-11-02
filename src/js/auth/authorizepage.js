import React from "react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from "react-auth-kit";

// import 
axios.defaults.baseURL = '';

class Authorizepage extends React.Component {
    credentials ={}
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            authorized: false
        }
    }

    isAuthorized() {
        console.log("this.props.authorized == ", this.props.authorized);
        if (this.props.authorized == true)
            window.location.reload();
    }

    storeToken(token) {
        if (token)
            return;
        else
            this.setState({authorized: true});
        window.sessionStorage.setItem('token', token);
        console.log("data get", window.sessionStorage.getItem('token'));
    }


    render() {
        return (
            <main>
                <form ref={(el) => this.credentials = el}>
                    <div className="authorize_window">
                        <h3>Enter your login and password:</h3>
                        <textarea placeholder="login" onChange={(e) => this.setState({username: e.target.value})}></textarea>
                        <p></p>
                        <textarea placeholder="password" onChange={(e) => this.setState({password: e.target.value})}></textarea>
                        <p></p>
                        <button type="button" onClick={() =>{
                            console.log("login = ", this.state.username);
                            console.log("password = ", this.state.password);
                            console.log("authPage = ", this.props.authPage);

                            axios.post("http://127.0.0.1:8080/api/auth/login", {
                                'password': this.state.password,
                                'username': this.state.username,
                                }).then((response) => {
                                    console.log("response: ", response);
                                    this.storeToken(response.data.accessToken);})
                                .catch(function (error) {
                                    console.log(error);
                                });
                                console.log("data get", window.sessionStorage.getItem('token'));
                            }
                        }>Log in</button>
                        
                    </div>
                </form>
            </main>
        ) 
    }
}

  export default Authorizepage;