import React from 'react';
import Records from './components/Records.js'
import SearchRecords from './components/SearchRecords.js';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            isLoggedIn: false,
            error: null
        }
    }

    handleLogin(event) {
        event.preventDefault();
        console.log("Login clicked")
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let creds = {
                username: username, password: password
        }
        fetch("/login", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify(creds)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({
                    isLoggedIn: true,
                    jwt: res.jwt
                })
            }).catch(err => {
                console.log(err);
                this.setState({
                    error: err
                })
            })
    }


    render() {
        const {isLoggedIn, error, jwt} = this.state;
        if(isLoggedIn) {
            return (
            <>
                <h1>Admin</h1>

                <h2>Add a new record</h2>
                <SearchRecords jwt={jwt}/>
                
                <h2>Record List</h2>
                <Records jwt={jwt}/>
            </>
            );
        } else {
            return (
                <>
                <h1>Admin</h1>
                <h2>Login</h2>
                <p>Username: </p>
                <input type="text" id="username" /><br />
                <p>Password: </p>
                <input type="password" name="password" id="password" /><br />
                <button onClick={this.handleLogin}>Login</button>
                </>
            );
        }
    }

}

export default Admin;