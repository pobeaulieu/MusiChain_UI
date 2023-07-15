import styles from "./MarketPage.module.css";
import { useHistory } from 'react-router-dom';
import MarketListingRow from "./MarketListingRow";
import { PageProps } from "../../App";
import { useEffect, useState } from "react";
import { Listing, TokenCreation } from "../../service/interface";
import TokenCreationRow from "../Create/TokenCreationRow";

export default function Market(props:PageProps) {
    const [listingDisplay, setListingDisplay] = useState<Array<JSX.Element>>();
    const [listingList, setListingList] = useState<Listing[]>();


    useEffect(() => {
        const listings = props.service.getMarketListings()
        const rows = [];

        for(let i = 0; i<listings.length;i++){
            rows.push(<MarketListingRow onPlayClick={props.onPlayClick}  key={listings[i].tokenId} listing={listings[i]} loggedUser={props.loggedUser}/>);
        }

        setListingList(listings)
        setListingDisplay(rows)

    }, []); 
    return (
    <>
    <div className={styles.wrapper}>
    <div className={styles.topContainer}>
        <h1>Market</h1>

        
    </div>
    <table className={styles.tokenTable}>
        <thead>
        <tr>
            <th>Token</th>
            <th>Name</th>
            <th>Price/share</th>
            <th>Shares</th>
            <th>Div./share</th>
            <th>Ticket Pool</th>
            <th>Div pot./share</th>
            {props.loggedUser?.address != "" && <th>Shares to buy</th>}
            {props.loggedUser?.address != "" && <th>Total transfer</th>}
     
  
        </tr>
        </thead>
        <tbody>
            {listingDisplay}
        </tbody>
    </table>
    </div>
    </>
    );
}