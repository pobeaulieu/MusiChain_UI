import styles from "./MyListingsPage.module.css";

import { PageProps } from "../../App";
import { useEffect, useState } from "react";
import { Listing, TokenOwnership } from "../../service/interface";

import UserListingRow from "./UserListingTableRow";
import { useHistory } from "react-router-dom";

export default function MyListingsPage(props: PageProps){
    const history = useHistory();


    const [tokenDisplay, setTokenDisplay] = useState<Array<JSX.Element>>();
    const [tokenList, setTokenList] = useState<TokenOwnership[]>();

    const [listingDisplay, setListingDisplay] = useState<Array<JSX.Element>>();
    const [listingList, setListingList] = useState<Listing[]>();

    useEffect(() => {
        const listings = props.service.getUserListings(props.loggedUser?.address)
        const lrows = [];

        for(let i = 0; i<listings.length;i++){
            lrows.push(<UserListingRow  onPlayClick={props.onPlayClick}  key={listings[i].tokenId} listing={listings[i]} loggedUser={props.loggedUser}/>);
        }

        setListingList(listings)
        setListingDisplay(lrows)




    }, []); 


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