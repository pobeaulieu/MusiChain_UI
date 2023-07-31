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
    const [tokenList, setTokenList] = useState<TokenCreation[]>();
    async function fetchTokens() {
        const createdTokens = await props.service.getCreatedTokens();
        setTokenList(createdTokens);

    }

    useEffect(() => {
        fetchTokens();
    }, [props]);


    const handleChange = () => {
        fetchTokens();
      };


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
                        {tokenList?.map(t => <TokenCreationRow onChange={handleChange} onPlayClick={props.onPlayClick}  key={t.tokenId} token={t} service={props.service}/>)}
                    </tbody>
                </table>
            </div>
        </>
    );
}

