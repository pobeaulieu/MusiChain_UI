import styles from "./YourCreationsPage.module.css";
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import mainstyles from '../../App.module.css';
import TokenTableRow from "../../components/tokenTableRow";
import { useEffect, useState } from "react";

export default function Creator(props:any) {
    const history = useHistory();

    let tokensDisplay:Array<JSX.Element> = [];

    const [tokenList, setTokenList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const queryParams = new URLSearchParams({
                    creatorAddress: props.loggedUser.address,
                }).toString();

                const response = await fetch(`https://localhost:8000/api/getcreatedtokens?${queryParams}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch token list");
                }

                const data = await response.json();
                console.log(data);
                setTokenList(data.tokenList);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []); // Empty dependency array to run the effect only once on component mount

    const setTokens = (indexStart:number, indexEnd:number) => {
        tokensDisplay = [];

        for(let i = indexStart; i<indexEnd;i++){
            tokensDisplay.push(<TokenTableRow data={tokenList[i]}/>);
        }
    };

    setTokens(0,tokenList.length);

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.topContainer}>
                    <h1>Your Creations</h1>
                    <Button className={mainstyles.button} onClick={() => history.push("/createnewtoken")}>Create New Token</Button>
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
