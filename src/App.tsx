import { useState } from 'react';
import './App.module.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Nav from './ui_components/Nav/Nav';
import MyTokensPage from './ui_components/MyTokens/MyTokensPage';
import Market from './ui_components/Market/MarketPage';
import CreateNewToken from './ui_components/Create/CreateNewTokenPage';
import YourCreationsPage from './ui_components/Create/YourCreationsPage';
import {Service, User } from './service/interface';
import BuyPage from './ui_components/Market/Buy';
import AddListingPage from './ui_components/MyTokens/AddListingPage';
import { Mock } from './service/mock';

function App() {
    const [loggedUser, setLoggedUser] = useState<User>(new User(""));


    const service = new Mock()

    const onWalletConnect = (user: User) => {
        setLoggedUser(user)
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Nav loggedUser={loggedUser} onWalletConnect={onWalletConnect} service={service}/>
                <main>
                    <Route path="/creator" exact component={() => <YourCreationsPage service={service} loggedUser={loggedUser} />}/>
                    <Route path="/createnewtoken" exact component={() => <CreateNewToken service={service} loggedUser={loggedUser} />}/>
                    <Route path="/mytokens" exact component={()=> <MyTokensPage service={service} loggedUser={loggedUser}/>}/>
                    <Route path="/buy" exact component={()=> <BuyPage  />}/>
                    <Route path="/addlisting" exact component={()=> <AddListingPage  />}/>
                    <Route path="/" exact component={()=> <Market  service={service} loggedUser={loggedUser}/>}/>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;


export interface PageProps{
    service: Service,
    loggedUser: User

}



export interface NavProps{
    service: Service,
    loggedUser: User
    onWalletConnect: (user: User)=>void
  }