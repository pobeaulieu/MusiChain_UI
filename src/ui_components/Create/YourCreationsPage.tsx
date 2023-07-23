import styles from "./YourCreationsPage.module.css";
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import mainstyles from '../../App.module.css';
import TokenCreationRow from "./TokenCreationRow";
import { useEffect, useState } from "react";
import { TokenCreation} from "../../service/interface";
import { PageProps } from "../../App";
import UserListingRow from "../MyListings/UserListingTableRow";



export default function YourCreationsPage(props: PageProps) {
    const history = useHistory();
    const [tokensDisplay, setTokensDisplay] = useState<Array<JSX.Element>>();
    const [tokenList, setTokenList] = useState<TokenCreation[]>();

    useEffect(() => {
        async function fetchTokens() {
            const createdTokens = await props.service.getCreatedTokens();
            setTokenList(createdTokens);

            const rows = [];
            for(let i = 0; i<createdTokens.length;i++){
                rows.push(<TokenCreationRow onPlayClick={props.onPlayClick}  key={createdTokens[i].tokenId} token={createdTokens[i]} service={props.service}/>);
            }
            setTokensDisplay(rows);
        }

        fetchTokens(); // don't forget to call the function
    }, [props]);



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
                            <th>Name</th>
                            <th>Shares</th>
                            <th>Initial ticket pool</th>
                            <th>Remaining ticket pool</th>
                            <th>Dividend/share</th>
                            <th>Tickets to pay div. </th>
                            <th>Total transfer </th>

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

