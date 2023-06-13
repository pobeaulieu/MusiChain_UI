
import { Link, useHistory } from "react-router-dom";
import './Nav.css';
import logo from './logo.png';

import MetaMaskIntegration from '../Wallet';

const Nav = (props: any) => {
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
          <Link to="/market" className="navbar-brand">Market</Link>
          {address && <Link to="/wallet" className="navbar-brand">My Tokens</Link>}
          {address && <Link to="/create" className="navbar-brand">Creator</Link>}
        </div>
      </div>

      <div className="navbar-right">
        {address && <span className="address">{address}</span>}
        <MetaMaskIntegration loggedUser={props.loggedUser} onWalletConnect={props.onWalletConnect} />
      </div>
    </nav>
  );
};

export default Nav;
