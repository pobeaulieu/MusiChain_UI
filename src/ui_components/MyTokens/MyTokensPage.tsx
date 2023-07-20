import styles from "./MyTokensPage.module.css";
import { PageProps } from "../../App";
import { useEffect, useState } from "react";
import { TokenOwnership, MusicMedia } from "../../service/interface";
import { getMusicMediaById } from "/MusiChain_UI/src/service/musicMedia/MusicMediaCache";
import UserTokenRow from "./UserTokenRow";

import { useHistory } from "react-router-dom";

export default function MyTokensPage(props: PageProps) {
  const history = useHistory();
  const contractAddress = "0x1234567890ABCDEF1234567890ABCDEF12345678";
  const [tokenDisplay, setTokenDisplay] = useState<JSX.Element[]>([]);
  const [tokenList, setTokenList] = useState<TokenOwnership[]>([]);

  

  useEffect(() => {
    const fetchOwnedTokens = async () => {
      try {
        const tokens = await props.service.getOwnedTokens(contractAddress, props.loggedUser?.address);

        // Convert string[] to TokenOwnership[]
        const tokenOwnershipList: TokenOwnership[] = tokens.map((tokenId: string) => ({
          tokenId: Number(tokenId),
          musicMedia: getMusicMediaById(Number(tokenId)),
          name: 'Token Name',
          numberSharesOwned: 5,
          remainingDividendEligibleTickets: 5,
          divPerShare: 0.005,
        }));

        setTokenList(tokenOwnershipList);

        const rows = tokenOwnershipList.map((token) => (
          <UserTokenRow
            onPlayClick={props.onPlayClick}
            key={token.tokenId}
            token={token}
            loggedUser={props.loggedUser}
            service={props.service}
          />
        ));
        setTokenDisplay(rows);
      } catch (error) {
        console.error("An error occurred while fetching owned tokens:", error);
      }
    };

    fetchOwnedTokens();
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
