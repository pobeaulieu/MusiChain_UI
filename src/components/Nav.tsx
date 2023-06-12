import {Link} from "react-router-dom";
import './Nav.css';
import logo from './logo.png';

const Nav = (props: any) => {


 
    return (
         <nav className="navbar" > 
         <div className="logo">
            <img src={logo} alt="Musichain Logo"
            ></img>
             <span>Musichain</span>
        </div>
         
            <div className="nav-links">
                <Link to="/market" className="navbar-brand">Market</Link>
                <Link to="/wallet" className="navbar-brand">My Tokens</Link>
                <Link to="/create" className="navbar-brand">Creator</Link> 
            </div>
        </nav>
    );
};

export default Nav;