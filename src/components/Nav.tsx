import {Link} from "react-router-dom";

const Nav = (props: any) => {


 
    return (
         <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4" >
            <div className="container-fluid">
                <Link to="/market" className="navbar-brand">Market</Link>
                <Link to="/wallet" className="navbar-brand">Wallet</Link>
                <Link to="/create" className="navbar-brand">Create</Link> // if the user is creator

            </div>
        </nav>
    );
};

export default Nav;