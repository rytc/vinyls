import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const AdminLogin = (props) => {
    const navigate = useNavigate();

    const [loginState, setLoginState] = useState({
        username: '',
        password: '',
        loggedIn: false,
        error: null
    });

    const onInputChange = ({target: {name, value}}) => {
        setLoginState({...loginState, [name]: value});
    }

    const handleLogin = (event) => {
        event.preventDefault();
        
        const {username, password} = loginState;

        fetch("/login", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({username: username, password: password})
        })
            .then(res => res.json())
            .then(res => {
                if(res.jwt) {
                    localStorage.setItem('jwt', res.jwt);
                    navigate('/admin', {replace: true});
                } else {
                    setLoginState({
                        error: res.error
                    })
                }
            }).catch(err => {
                console.log(err);
                setLoginState({
                    error: err
                })
            })
    }

    return (
        <div className="container">
        <h1>Admin</h1>
        <h2>Login</h2>
        {loginState.error ? 
            <div className="alert alert-danger">{loginState.error}</div>
        : <></>}
        <form>
            <div className="mb-4">
                <label className="form-label">Username:</label>
                <input type="text" name="username" onChange={onInputChange} value={loginState.username} className="form-control" />
            </div>
            <div className="mb-4">
                <label className="form-label">Password:</label>
                <input type="password" name="password" onChange={onInputChange} value={loginState.password} className="form-control" />
            </div>
            <button onClick={handleLogin} className="btn btn-primary">Login</button>
        </form>
        </div>
    );
}

export default AdminLogin;