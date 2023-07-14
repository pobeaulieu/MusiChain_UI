import styles from "./MarketPage.module.css";
import { useHistory } from 'react-router-dom';
import MarketTokenTableRow from "../../components/marketTokenTableRow";

export default function Market(props:any) {
    const history = useHistory();
    let tokens:Object[] = [];

    let tokensDisplay:Array<JSX.Element> = [];


    const setTokens = (indexStart:number, indexEnd:number) => {
        tokensDisplay = [];

        for(let i = indexStart; i<indexEnd;i++){
            tokensDisplay.push(<MarketTokenTableRow loggedUser={props.loggedUser} data={tokens[i]}/>);
        }
    };

    tokens = [
            {Name:"test",Creator:"test",Owner:"test", PriceByShare:"test", AvailableShares:"test", DivPotentialByShare:"test"},
            {Name:"test",Creator:"test",Owner:"test", PriceByShare:"test", AvailableShares:"test", DivPotentialByShare:"test"},
            {Name:"test",Creator:"test",Owner:"test", PriceByShare:"test", AvailableShares:"test", DivPotentialByShare:"test"},
            {Name:"test",Creator:"test",Owner:"test", PriceByShare:"test", AvailableShares:"test", DivPotentialByShare:"test"},
            ];
    setTokens(0,tokens.length);

    return (
    <>
    <div className={styles.wrapper}>
    <div className={styles.topContainer}>
        <h1>Market</h1>
        <div>
        Search : <input className={styles.search} type="text" placeholder="token's name"></input>
        </div>
        
    </div>
    <table className={styles.tokenTable}>
        <thead>
        <tr>
            <th>Token</th>
            <th>Creator</th>
            <th>Owner</th>
            <th>Price/Share</th>
            <th>Available Shares</th>
            <th>Div potential/Share</th>
            <th className={styles.headPreview}>Preview</th> 
        </tr>
        </thead>
        <tbody>
            {tokensDisplay}
        </tbody>
    </table>
    </div>
    </>
    );
}