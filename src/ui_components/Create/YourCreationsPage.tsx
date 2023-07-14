import styles from "./YourCreationsPage.module.css";
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import mainstyles from '../../App.module.css';
import TokenCreationRow from "./TokenCreationRow";
import { useEffect, useState } from "react";
import { TokenCreation} from "../../service/interface";
import { PageProps } from "../../App";



export default function YourCreationsPage(props: PageProps) {
    const history = useHistory();
    const [tokensDisplay, setTokensDisplay] = useState<Array<JSX.Element>>();
    const [tokenList, setTokenList] = useState<TokenCreation[]>();

    useEffect(() => {
        const tokens = props.service.getCreatedTokens(props.loggedUser.address)
        const rows = [];

        for(let i = 0; i<tokens.length;i++){
            rows.push(<TokenCreationRow token={tokens[i]}/>);
        }

        setTokenList(tokens)
        setTokensDisplay(rows)

    }, []); 



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
                            <th>Remaining eligible tickets</th>
                            <th>Div</th>

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

