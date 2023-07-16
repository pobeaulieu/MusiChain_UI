
import { Link, useHistory } from "react-router-dom";
import './Nav.css';
import logo from './logo.png';
import ConnectWalletButton from './ConnectWalletButton';
import { NavProps } from "../../App";



const Nav = (props: NavProps) => {
  const { address } = props.loggedUser;
  const history = useHistory();

  if (!address) {
    history.push("/");
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <img src={logo} alt="Musichain Logo" />
          <span>MusiChain</span>
        </div>

        <div className="nav-links">
          <Link to="/" className="navbar-brand">Market</Link>
          {address && <Link to="/mytokens" className="navbar-brand">My Tokens</Link>}
          {address && <Link to="/mylistings" className="navbar-brand">My Listings</Link>}

          {address && <Link to="/creator" className="navbar-brand">Creator</Link>}
        </div>
      </div>

      <div className="navbar-right">
        <ConnectWalletButton service = {props.service} loggedUser={props.loggedUser} onWalletConnect={props.onWalletConnect} />
      </div>
    </nav>
  );
};

export default Nav;
