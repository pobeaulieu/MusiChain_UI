
import styles from "./MyTokensPage.module.css";
import { PageProps } from "../../App";
import { useEffect, useState } from "react";
import { TokenOwnership } from "../../service/interface";
import UserTokenRow from "./UserTokenRow";

import { useHistory } from "react-router-dom";

export default function MyTokensPage(props: PageProps){
    const history = useHistory();


    const [tokenDisplay, setTokenDisplay] = useState<Array<JSX.Element>>();
    const [tokenList, setTokenList] = useState<TokenOwnership[]>();



    useEffect(() => {
        const tokens = props.service.getOwnedTokens(props.loggedUser?.address)
        const rows = [];

        for(let i = 0; i<tokens.length;i++){
            rows.push(<UserTokenRow onPlayClick={props.onPlayClick} key={tokens[i].tokenId} token={tokens[i]}
                                    loggedUser={props.loggedUser} service={props.service}/>);
        }

        setTokenList(tokens)
        setTokenDisplay(rows)

    




    }, []); 


    return (<>
     <div className={styles.wrapper}>
     <div className={styles.topContainer}>
    <h1>Your Tokens</h1>
    </div>
      
        <table className={styles.tokenTable}>
            <thead>
            <tr>
                <th>Token</th>
                <th>Name</th>
                <th>Owned Shares</th>
                <th>Dividend/share</th>
                <th>Ticket Pool</th>
                <th>Total Dividend Potential</th>
                <th>Number of Shares</th>
                <th>Price/share</th>
            </tr>
            </thead>
            <tbody>
                {tokenDisplay}
            </tbody>
        </table>
        </div>  

    </>);
}