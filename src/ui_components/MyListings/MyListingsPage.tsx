import styles from "./MyListingsPage.module.css";

import { PageProps } from "../../App";
import { useEffect, useState } from "react";
import { Listing, TokenOwnership } from "../../service/interface";

import UserListingRow from "./UserListingTableRow";
import { useHistory } from "react-router-dom";
import UserTokenRow from "../MyTokens/UserTokenRow";
import MarketListingRow from "../Market/MarketListingRow";

export default function MyListingsPage(props: PageProps){
    const history = useHistory();


    const [tokenDisplay, setTokenDisplay] = useState<Array<JSX.Element>>();
    const [tokenList, setTokenList] = useState<TokenOwnership[]>();

    const [listingDisplay, setListingDisplay] = useState<Array<JSX.Element>>();
    const [listingList, setListingList] = useState<Listing[]>();

  
    const handleChange = () => {
        // Trigger a re-fetch of the listings when a buy is successful
        fetchListings();
      };
      
    async function fetchListings() {
        const listings = await props.service.getUserListings();
        setListingList(listings);
    }


    useEffect(() => {
        fetchListings();
    }, [props]);


    return (<>
    
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
                {listingList?.map(l => <UserListingRow onChange ={handleChange} onPlayClick={props.onPlayClick}  key={l.tokenId} listing={l} loggedUser={props.loggedUser} service={props.service}/>)}
            </tbody>
        </table>
     </div>  
    </>);
}