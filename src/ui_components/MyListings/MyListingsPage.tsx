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

    useEffect(() => {
        async function fetchListings() {
            const listings = await props.service.getUserListings();
            setListingList(listings);

            const rows = [];
            for(let i = 0; i<listings.length;i++){
                rows.push(<UserListingRow onPlayClick={props.onPlayClick}  key={listings[i].tokenId} listing={listings[i]} loggedUser={props.loggedUser} service={props.service}/>);
            }
            setListingDisplay(rows);
        }

        fetchListings(); // don't forget to call the function
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
                {listingDisplay}
            </tbody>
        </table>
     </div>  
    </>);
}