import TokenTableRow from "../components/tokenTableRow";
import styles from "./myTokens.module.css";
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import mainstyles from '../App.module.css';

export default function Creator(props:any) {
    const history = useHistory();
    let tokens:Object[] = [];

    let tokensDisplay:Array<JSX.Element> = [];

    const getTokens = () => {
        return props.getTokens();
    };

    const setTokens = (indexStart:number, indexEnd:number) => {
        tokensDisplay = [];

        for(let i = indexStart; i<indexEnd;i++){
            tokensDisplay.push(<TokenTableRow data={tokens[i]}/>);
        }
    };

    tokens = getTokens();
    setTokens(0,tokens.length);

    return (
    <>
    <div className={styles.wrapper}>
    <div className={styles.topContainer}>
        <h1>Your Creations</h1>
        <Button className={mainstyles.button} onClick={()=>history.push("/createnewtoken")}>Create New Token</Button>
    </div>
    <table className={styles.tokenTable}>
        <thead>
        <tr>
            <th>Token</th>
            <th>Price</th>
            <th>Number of shares</th>
            <th>Initial ticket pool</th>
            <th>Remaining dividend eligible tickets</th>
            <th>Dividend per share</th>
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