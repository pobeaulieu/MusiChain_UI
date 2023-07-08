import YourTokenTableRow from "../components/yourTokenTableRow";
import styles from "./yourToken.module.css";
import ListingTokenTableRow from "../components/listingTokenTableRow";
import { Button } from "react-bootstrap";
import mainstyles from '../App.module.css';

export default function YourTokens(){
    let yourTokens:Array<JSX.Element> = [];
    let listingTokens:Array<JSX.Element> = [];

    let yTokens = [
        {Name:"test",NbSharesOwned:"test",InitialTktPool:"test", RemainingTktPool:"test", Div:"test"},
        {Name:"test",NbSharesOwned:"test",InitialTktPool:"test", RemainingTktPool:"test", Div:"test"},
        {Name:"test",NbSharesOwned:"test",InitialTktPool:"test", RemainingTktPool:"test", Div:"test"},
        {Name:"test",NbSharesOwned:"test",InitialTktPool:"test", RemainingTktPool:"test", Div:"test"},
        ];

    let lTokens = [
        {Name:"test",pricePerShare:"test",InitialShares:"test", SoldShares:"test"},
        {Name:"test",pricePerShare:"test",InitialShares:"test", SoldShares:"test"},
        {Name:"test",pricePerShare:"test",InitialShares:"test", SoldShares:"test"},
        {Name:"test",pricePerShare:"test",InitialShares:"test", SoldShares:"test"},
        ];    

    const setTokens = (data:Array<object>, indexStart:number, indexEnd:number, type:number) => {
        let tokens = [];

        for(let i = indexStart; i<indexEnd;i++){
            if(type){
                tokens.push(<YourTokenTableRow data={data[i]}/>);
            }else{
                tokens.push(<ListingTokenTableRow data={data[i]}/>)
            }
            
        }
        return tokens;
    };


    yourTokens = setTokens(yTokens,0,yTokens.length,1);
    listingTokens = setTokens(lTokens,0, lTokens.length,0);

    return (<>
        <h1>Your Tokens</h1>
        <table className={styles.tokenTable}>
            <thead>
            <tr>
                <th>Token</th>
                <th>Number of shares owned</th>
                <th>Initial ticket pool</th>
                <th>Remaining dividend eligible tickets</th>
                <th>Dividend per share</th>
                <th className={styles.headPreview}>Preview</th> 
            </tr>
            </thead>
            <tbody>
                {yourTokens}
            </tbody>
        </table>

        <div className={styles.topContainer}>
            <h1>Active Listings</h1>
            <Button className={mainstyles.button}>New Listing</Button>
        </div>
        
        <table className={styles.tokenTable}>
            <thead>
            <tr>
                <th>Token</th>
                <th>Price per share</th>
                <th>initial Shares</th>
                <th>Sold Shares</th>
                <th className={styles.headPreview}></th> 
            </tr>
            </thead>
            <tbody>
                {listingTokens}
            </tbody>
        </table>
        
    </>);
}