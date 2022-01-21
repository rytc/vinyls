import React from 'react';
import Records from '../../admin/components/Records.js'
import SearchRecords from '../../components/SearchRecords.js';
import AdminLogin from '../../components/AdminLogin';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            jwt: localStorage.getItem('jwt'),
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
                if(res.jwt) {
                    this.setState({
                        isLoggedIn: true,
                        jwt: res.jwt,
                        error: null
                    })
                } else {
                    this.setState({
                        error: res.error
                    })
                }
            }).catch(err => {
                console.log(err);
                this.setState({
                    error: err
                })
            })
    }

    render() {
        const {jwt} = this.state;
        return (
        <div className="container">
            <h1>Admin</h1>

            <h2>Add a new record</h2>
            <SearchRecords jwt={jwt}/>
            
            <h2>Record List</h2>
            <Records jwt={jwt}/>
        </div>
        );
    }

}

export default Admin;