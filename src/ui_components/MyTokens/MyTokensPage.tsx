import YourTokenTableRow from "./UserTokenRow";
import styles from "./MyTokensPage.module.css";
import ListingTokenTableRow from "./UserListingTableRow";
import { Button } from "react-bootstrap";
import mainstyles from '../../App.module.css';
import { PageProps } from "../../App";
import { useEffect, useState } from "react";
import { Listing, TokenOwnership } from "../../service/interface";
import UserTokenRow from "./UserTokenRow";
import UserListingRow from "./UserListingTableRow";
import { useHistory } from "react-router-dom";

export default function MyTokensPage(props: PageProps){
    const history = useHistory();


    const [tokenDisplay, setTokenDisplay] = useState<Array<JSX.Element>>();
    const [tokenList, setTokenList] = useState<TokenOwnership[]>();

    const [listingDisplay, setListingDisplay] = useState<Array<JSX.Element>>();
    const [listingList, setListingList] = useState<Listing[]>();

    useEffect(() => {
        const tokens = props.service.getOwnedTokens(props.loggedUser.address)
        const rows = [];

        for(let i = 0; i<tokens.length;i++){
            rows.push(<UserTokenRow  key={tokens[i].tokenId} token={tokens[i]} loggedUser={props.loggedUser}/>);
        }

        setTokenList(tokens)
        setTokenDisplay(rows)

        const listings = props.service.getUserListings(props.loggedUser.address)
        const lrows = [];

        for(let i = 0; i<listings.length;i++){
            lrows.push(<UserListingRow  key={listings[i].tokenId} listing={listings[i]} loggedUser={props.loggedUser}/>);
        }

        setListingList(listings)
        setListingDisplay(lrows)




    }, []); 


    return (<>
     <div className={styles.wrapper}>
     <div className={styles.topContainer}>
    <h1>Your Tokens</h1>
    </div>
      
        <table className={styles.tokenTable}>
            <thead>
            <tr>
                <th>Token</th>
                <th>Name</th>
                <th>Owned Shares</th>
                <th>Dividend/share</th>
                <th>Ticket Pool</th>
                <th>Total Dividend Potential</th>
                <th>Number of Shares</th>
                <th>Price/share</th>
            </tr>
            </thead>
            <tbody>
                {tokenDisplay}
            </tbody>
        </table>
        </div>  
        <div className={styles.wrapper}>
        <div className={styles.topContainer}>
            <h1>Active Listings</h1>
            
        </div>
        
        <table className={styles.listingTable}>
            <thead>
            <tr>
                <th>Token</th>
                <th>Name</th>
                <th>Remaining Shares Listed</th>
                <th>Price/share</th>
   
            </tr>
            </thead>
            <tbody>
                {listingDisplay}
            </tbody>
        </table>
     </div>  
    </>);
}