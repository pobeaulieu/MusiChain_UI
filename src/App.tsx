import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import Create from './pages/create';

function App() {
    const [loggedUser, setLoggedUser] = useState({});
    const [message, setMessage] = useState("");
    const [redirect, setRedirect] = useState(false);

    const onLogin = async (username : string, password : string) => {
        console.log("username: ", username)
        console.log("password: ", password)
        const loginResponse = await fetch('https://localhost:8000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username,
                password
            })
        });

        console.log("username: ", username)
        console.log("password: ", password)

        const response = await loginResponse.json();
        console.log("reponse: ", password)

        if (response.username != null){
            setLoggedUser(response);
            setRedirect(true)
        }
        
        else {
            setMessage(response.message)
        }
    }

    const onLogout = async () => {
        setLoggedUser({});
        await fetch('https://localhost:8000/api/logout', {
            method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            });
        setRedirect(false)

    }

    const loadUser =  async () => {
        setLoggedUser({});
        const response = await fetch('https://localhost:8000/api/user', {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
    
        const content = await response.json();
        
        setLoggedUser(content);
    }

    const createToken = async (tokenBody:TokenBody) => {
        const tokenResponse:Response = await fetch('https://localhost:8000/api/createTokens', {
            method:"CREATE",
            headers:{
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body : JSON.stringify({
                Creator: tokenBody.Creator,
                Name: tokenBody.Name,
                NumShares: tokenBody.NumShares,
                Price: tokenBody.Price,
                Div: tokenBody.Div,
                InitialTktPool: tokenBody.InitialTktPool,
                Mp3: tokenBody.Mp3,
                Img: tokenBody.Img
            })
        });

        const content:string = await tokenResponse.text();

        setMessage(content);

    }

    return (
        <div className="App">
            <BrowserRouter>
                <Nav loggedUser={loggedUser} onLogout={onLogout}/>
                <main>
                    <Route path="/" exact component={() => <Home loggedUser={loggedUser} loadUser={loadUser} message={message}/>}/>
                    <Route path="/login" exact component={() => <Login onLogin={onLogin}  redirect={redirect} message={message}/>}/>
                    <Route path="/create" exact component={() => <Create createToken={createToken} loggedUser={loggedUser} message={message}/>}/>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;


interface TokenBody{
    Creator:string,
    Name:string,
    Artist:string,
    NumShares:number,
    Price:number,
    Div:number,
    InitialTktPool: number,
    Mp3:File,
    Img:File
}