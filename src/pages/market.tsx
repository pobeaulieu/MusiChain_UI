import MarketTokenTableRow from "../components/marketTokenTableRow";
import styles from "./market.module.css";
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import mainstyles from '../App.module.css';

export default function Market(props:any) {
    const history = useHistory();
    let tokens:Object[] = [];

    let tokensDisplay:Array<JSX.Element> = [];

    const getTokens = () => {
        return props.getTokens();
    };

    const setTokens = (indexStart:number, indexEnd:number) => {
        tokensDisplay = [];

        for(let i = indexStart; i<indexEnd;i++){
            tokensDisplay.push(<MarketTokenTableRow data={tokens[i]}/>);
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
        <h1>Your Creations</h1>
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