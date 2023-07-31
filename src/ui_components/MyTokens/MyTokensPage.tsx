import styles from "./MyTokensPage.module.css";
import { PageProps } from "../../App";
import { useEffect, useState } from "react";
import { TokenOwnership } from "../../service/interface";
import UserTokenRow from "./UserTokenRow";
import { useHistory } from "react-router-dom";
import { Listing } from "../../service/interface";

export default function MyTokensPage(props: PageProps) {
    const [tokenList, setTokenList] = useState<TokenOwnership[]>();

    const handleChange = () => {
      fetchTokens();
    };

    useEffect(() => {
        fetchTokens();
    }, [props]);

    async function fetchTokens() {
      try {
        const tokenlistings = await props.service.getOwnedTokens();
        setTokenList(tokenlistings);
    
      } catch (error) {
        console.error("An error occurred while fetching owned tokens:", error);
      }
    }
    
  
    return (
      <>
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
            <tbody>{tokenList?.map(t =>  <UserTokenRow
              onPlayClick={props.onPlayClick}
              key={t.tokenId}
              token={t} // Pass the entire tokenlistings[i] object as the 'token' prop
              loggedUser={props.loggedUser}
              service={props.service} 
              onChange={handleChange}               
               />)}</tbody>
          </table>
        </div>
      </>
    );
  }
