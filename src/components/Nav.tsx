import {Link} from "react-router-dom";

const Nav = (props: any) => {

    let menu;

    if (props.loggedUser.username === undefined) {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link to="/login"  className="nav-link">Log in</Link>
                </li>
            </ul>
        )
    } else {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link to="/login" className="nav-link" onClick={props.onLogout}>Log out</Link>
                </li>
            </ul>
        )
    }

    return (
         <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4" >
            <div className="container-fluid">
                <Link to="/market" className="navbar-brand">Market</Link>
                <Link to="/wallet" className="navbar-brand">Wallet</Link>
                <Link to="/create" className="navbar-brand">Create</Link> // if the user is creator

                <div>
                    {menu}
                </div>
            </div>
        </nav>
    );
};

export default Nav;