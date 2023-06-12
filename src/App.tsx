import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import Create from './pages/create';

function App() {
    const [loggedUser, setLoggedUser] = useState({address: "0xF2320835E6edA0c87783063B8215E2A624624CdE"});
    const [message, setMessage] = useState("");
    const [redirect, setRedirect] = useState(false);

    const createToken = async (tokenBody: TokenBody) => {
        const formData = new FormData();
        formData.append('creatorAddress', tokenBody.CreatorAddress);
        formData.append('name', tokenBody.Name);
        formData.append('numShares', tokenBody.NumShares);
        formData.append('price', tokenBody.Price);
        formData.append('div', tokenBody.Div);
        formData.append('initialTktPool', tokenBody.InitialTktPool);
        formData.append('mp3', tokenBody.Mp3);
        formData.append('img', tokenBody.Img);
      
        console.log(formData)
        const tokenResponse: Response = await fetch('https://localhost:8000/api/createTokens', {
          method: 'POST',
          body: formData,
        });
      
        const content: string = await tokenResponse.text();
      
        setMessage(content);
      };

    return (
        <div className="App">
            <BrowserRouter>
                <Nav />
                <main>
                    <Route path="/create" exact component={() => <Create createToken={createToken} loggedUser={loggedUser} message={message}/>}/>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;


interface TokenBody{
    CreatorAddress:string,
    Name:string,
    NumShares:string,
    Price:string,
    Div:string,
    InitialTktPool: string,
    Mp3:File,
    Img:File
}