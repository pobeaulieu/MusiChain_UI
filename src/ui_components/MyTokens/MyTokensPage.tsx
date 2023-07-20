import styles from "./MyTokensPage.module.css";
import { PageProps } from "../../App";
import { useEffect, useState } from "react";
import { TokenOwnership } from "../../service/interface";
import UserTokenRow from "./UserTokenRow";

import { useHistory } from "react-router-dom";

export default function MyTokensPage(props: PageProps) {
  const history = useHistory();
  const contractAddress = "0x1234567890ABCDEF1234567890ABCDEF12345678";
  const [tokenDisplay, setTokenDisplay] = useState<JSX.Element[]>([]);
  const [tokenList, setTokenList] = useState<TokenOwnership[]>([]);

  useEffect(() => {
    // Check if props.loggedUser?.address is defined before proceeding
    if (props.loggedUser?.address) {
      // Define an async function to fetch the tokens and process the result
      const fetchTokens = async () => {
        try {
          // Fetch the tokens using the service function and await the Promise result
          const tokens = await props.service.getOwnedTokens(
            contractAddress,
            props.loggedUser.address
          );

          // Process the tokens and update the state accordingly
          const rows = tokens.map((token) => (
            <UserTokenRow
              onPlayClick={props.onPlayClick}
              key={token.tokenId}
              token={token}
              loggedUser={props.loggedUser}
              service={props.service}
            />
          ));

          setTokenList(tokens);
          setTokenDisplay(rows);
        } catch (error) {
          console.error("An error occurred while fetching owned tokens:", error);
        }
      };

      // Call the fetchTokens function to fetch and process the tokens
      fetchTokens();
    }
  }, [props.service, props.loggedUser?.address, props.onPlayClick]);

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
