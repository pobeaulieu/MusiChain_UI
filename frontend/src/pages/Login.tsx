import {SyntheticEvent, useState} from 'react';
import { Spinner } from 'react-bootstrap';
import {Redirect} from "react-router-dom";

const Login = (props:any) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        setLoading(true);
        e.preventDefault();
        await props.onLogin(username, password)
        setLoading(false);
    }

    if (props.redirect) {
        return <Redirect to="/"/>;
    }
    return (
        <div className="form-signin">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Veuillez vous connecter</h1>
                <input type="username" className="form-control" placeholder="username" required
                    onChange={e => setUsername(e.target.value)}
                />

                <input type="password" className="form-control" placeholder="password" required
                    onChange={e => setPassword(e.target.value)}
                />

                <button className="w-100 btn btn-lg btn-primary" type="submit">Login</button><br /><br />
                <p style={{color: 'red'}}>{props.message}</p>
                {loading && <Spinner/>}
            </form>
        </div>
    );
};
export default Login;