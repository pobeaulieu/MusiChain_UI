import styles from "./MyTokensPage.module.css";
import { PageProps } from "../../App";
import { useEffect, useState } from "react";
import { TokenOwnership } from "../../service/interface";
import UserTokenRow from "./UserTokenRow";
import { useHistory } from "react-router-dom";
import { Listing, TokenCreation } from "../../service/interface";

export default function MyTokensPage(props: PageProps) {
  const history = useHistory();
  const [tokenDisplay, setTokenDisplay] = useState<Array<JSX.Element>>();
  const [tokenList, setTokenList] = useState<TokenOwnership[]>(); // Update the type

  useEffect(() => {
    async function fetchtoken() {
        const listings = await props.service.getOwnedTokens();
        setTokenList(listings);

        const rows = [];
        for(let i = 0; i<listings.length;i++){
          rows.push(
            <UserTokenRow
              onPlayClick={props.onPlayClick}
              key={listings[i].tokenId}
              token={listings[i]} // Pass the entire listings[i] object as the 'token' prop
              loggedUser={props.loggedUser}
              service={props.service}
            />
          );
        }
        setTokenDisplay(rows); // Corrected to setTokenDisplay
    }

    fetchtoken(); // don't forget to call the function
}, [props]);

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
          <tbody>{tokenDisplay}</tbody>
        </table>
      </div>
    </>
  );
}
