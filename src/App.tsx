import { useEffect, useState } from "react";
import styles from './App.module.css';
import { BrowserRouter, Route } from "react-router-dom";
import Nav from './ui_components/Nav/Nav';
import MyTokensPage from './ui_components/MyTokens/MyTokensPage';
import Market from './ui_components/Market/MarketPage';
import CreateNewToken from './ui_components/Create/CreateNewTokenPage';
import YourCreationsPage from './ui_components/Create/YourCreationsPage';
import {Service, User } from './service/interface';
import { Mock } from './service/mock';
import MusicPlayerBar from './ui_components/MusicPlayer/MusicPlayerBar';
import MyListingsPage from './ui_components/MyListings/MyListingsPage';
import Moralis from "moralis";


function App() {
    const [mediaUrlPlaying, setMediaUrlPlaying] = useState("");

    const [loggedUser, setLoggedUser] = useState<User>(new User(""));

    useEffect(() => {
        async function startIPFS() {
            await Moralis.start({
                apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjI2YTI4MTBjLWU2OWYtNGY3YS1hNWY2LTU4MTBiYzAwMGQ3NiIsIm9yZ0lkIjoiMzQ5NjMwIiwidXNlcklkIjoiMzU5MzY3IiwidHlwZUlkIjoiNDllNWIzYzgtNGEzMC00ZmU2LWJiMzItMmQ1OWY2NTZiOWIyIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTAwNjMyMDUsImV4cCI6NDg0NTgyMzIwNX0.IFXVwzzl6DGWW3-jmSppww6rCF_UHOqo4PrL80REI9c",
              });
        }

        startIPFS();
    }, []);


    const service = new Mock() // TODO remplacer le Mock ici par le vrai service lorsqu'il implementera toute l'interface

    const onWalletConnect = (user: User) => {
        setLoggedUser(user)
    }

    const onPlayClick = (url: string) => {
        setMediaUrlPlaying(url)
    }

    return (
        <div className="App">
            <BrowserRouter>
            <div className={styles.musichainNavBar}>
                <Nav loggedUser={loggedUser} onWalletConnect={onWalletConnect} service={service}/>
                </div>
                
                <main>
                <div>
                    <Route path="/creator" exact component={() => <YourCreationsPage onPlayClick={onPlayClick} service={service} loggedUser={loggedUser} />}/>
                    <Route path="/createnewtoken" exact component={() => <CreateNewToken onPlayClick={onPlayClick} service={service} loggedUser={loggedUser} />}/>
                    <Route path="/mytokens" exact component={()=> <MyTokensPage onPlayClick={onPlayClick}service={service} loggedUser={loggedUser}/>}/>

                    <Route path="/mylistings" exact component={()=> <MyListingsPage onPlayClick={onPlayClick}service={service} loggedUser={loggedUser}/>}/>
                    <Route path="/" exact component={()=> <Market  onPlayClick={onPlayClick} service={service} loggedUser={loggedUser}/>}/>
                    </div>
                </main>
                {mediaUrlPlaying != "" &&            <div className={styles.musicBar}>
                <MusicPlayerBar mediaUrl={mediaUrlPlaying}/>
                </div>}
            </BrowserRouter>
        </div>
    );
}

export default App;


export interface PageProps{
    service: Service,
    loggedUser: User
    onPlayClick:(url : string)=> void

}

export interface NavProps{
    service: Service,
    loggedUser: User,
    onWalletConnect: (user: User)=>void

  }