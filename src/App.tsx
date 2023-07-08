import { useState } from 'react';
import './App.module.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Creator from './pages/creator';
import CreateNewToken from './pages/createNewToken';
import YourTokens from './pages/yourToken';


function App() {
    const [loggedUser, setLoggedUser] = useState({address: ""});
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

    const onWalletConnect = (address: string) => {
        setLoggedUser({address: address})
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Nav loggedUser={loggedUser} onWalletConnect={onWalletConnect}/>
                <main>
                    <Route path="/creator" exact component={() => <Creator createToken={createToken} loggedUser={loggedUser} message={message}/>}/>
                    <Route path="/createnewtoken" exact component={() => <CreateNewToken createToken={createToken} loggedUser={loggedUser} message={message}/>}/>
                    <Route path="/mytokens" exact component={() => <YourTokens/>}/>
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