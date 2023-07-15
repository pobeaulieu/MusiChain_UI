import { useState } from 'react';
import styles from './App.module.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Nav from './ui_components/Nav/Nav';
import MyTokensPage from './ui_components/MyTokens/MyTokensPage';
import Market from './ui_components/Market/MarketPage';
import CreateNewToken from './ui_components/Create/CreateNewTokenPage';
import YourCreationsPage from './ui_components/Create/YourCreationsPage';
import {Service, User } from './service/interface';
import AddListingPage from './ui_components/MyTokens/AddListingPage';
import { Mock } from './service/mock';
import MusicPlayerBar from './ui_components/MusicPlayer/MusicPlayerBar';

function App() {
    const [songIdPlaying, setSongIdPlaying] = useState(-1);

    const [loggedUser, setLoggedUser] = useState<User>(new User(""));

    const service = new Mock() // TODO remplacer le Mock ici par le vrai service lorsqu'il implementera toute l'interface

    const onWalletConnect = (user: User) => {
        setLoggedUser(user)
    }

    const onPlayClick = (id: number) => {
        setSongIdPlaying(id)
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Nav loggedUser={loggedUser} onWalletConnect={onWalletConnect} service={service}/>
                <main>
                    <Route path="/creator" exact component={() => <YourCreationsPage onPlayClick={onPlayClick} service={service} loggedUser={loggedUser} />}/>
                    <Route path="/createnewtoken" exact component={() => <CreateNewToken onPlayClick={onPlayClick} service={service} loggedUser={loggedUser} />}/>
                    <Route path="/mytokens" exact component={()=> <MyTokensPage onPlayClick={onPlayClick}service={service} loggedUser={loggedUser}/>}/>
                    <Route path="/" exact component={()=> <Market  onPlayClick={onPlayClick} service={service} loggedUser={loggedUser}/>}/>
                </main>
                {songIdPlaying != -1 &&            <div className={styles.musicBar}>
                <MusicPlayerBar songId={songIdPlaying}/>
                </div>}
            </BrowserRouter>
        </div>
    );
}

export default App;


export interface PageProps{
    service: Service,
    loggedUser: User
    onPlayClick:(id : number)=> void

}

export interface NavProps{
    service: Service,
    loggedUser: User,
    onWalletConnect: (user: User)=>void

  }