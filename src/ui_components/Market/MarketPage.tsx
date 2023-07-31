import styles from "./MarketPage.module.css";
import { useHistory } from 'react-router-dom';
import MarketListingRow from "./MarketListingRow";
import { PageProps } from "../../App";
import { useEffect, useState } from "react";
import { Listing, TokenCreation } from "../../service/interface";
import TokenCreationRow from "../Create/TokenCreationRow";

export default function Market(props:PageProps) {
    const [listingList, setListingList] = useState<Listing[]>();
    const [update, setUpdate] = useState(false)
    async function fetchListings() {
        const listings = await props.service.getMarketListings();
        setListingList(listings);

    }
    useEffect(() => {
        fetchListings(); // don't forget to call the function
    }, [props, setUpdate]);


    const handleBuySuccess = () => {
        // Trigger a re-fetch of the listings when a buy is successful
        fetchListings();
      };

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
            {listingList?.map(l => <MarketListingRow onPlayClick={props.onPlayClick} key={l.tokenId} listing={l} loggedUser={props.loggedUser} service={props.service} onChange={handleBuySuccess}/>)}
        </tbody>
    </table>
    </div>
    </>
    );
}