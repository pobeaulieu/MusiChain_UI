import { useState } from 'react';
import styles from './MarketListingRow.module.css';
import mainstyles from '../../App.module.css';
import { Listing, User } from '../../service/interface';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { tokenToString } from 'typescript';

interface MarketListingRowProps {
    listing: Listing;
    loggedUser: User
}

export default function MarketListingRow(props: MarketListingRowProps) {
    const [audioMenu, isAudioMenu] = useState(false);
    const history = useHistory();
    const [nbShare, setNbShare] = useState<number>(0);

    const buyShares: any = () => {
        if (nbShare <= props.listing.shares){
            console.log("TODO... buy " + nbShare + " shares of token " + props.listing.tokenId + " at price " + props.listing.price)
        }else{
            console.log("ERROR not enough shares available")
        }
    }
    
    return (
        <tr className={styles.row} key={props.listing.tokenId}>
            <td className={styles.cell}>
                <img className={styles.img} alt={`cover`} src={props.listing.musicMedia.image} />
            </td>
            <td className={styles.cell}>{props.listing.tokenName}</td>
            <td className={styles.cell}>{props.listing.price}</td>
            <td className={styles.cell}>{props.listing.shares}</td>
            <td className={styles.cell}>{props.listing.div}</td>
            <td className={styles.cell}>{props.listing.remainingTicketPool}</td>
            <td className={styles.cell}>{props.listing.remainingTicketPool * props.listing.div}</td>

            {props.loggedUser.address !== "" && (
                <><td className={`${styles.cell} ${styles.preview}`}>
                    <input className={`${styles.cell}`} name="nbShare" type="number" onChange={e => setNbShare(e.target.valueAsNumber)} required></input>
                </td><td className={`${styles.cell} ${styles.preview}`}>
                        <Button className={mainstyles.button} onClick={() =>buyShares()}>Buy Shares</Button>
                    </td></>
            )}
                        <td className={`${styles.cell} ${styles.preview}`}>
                <button className={styles.previewBtn} onClick={() => isAudioMenu(!audioMenu)}>
                    {audioMenu ? <span>&#10006;</span> : <span>&#9658;</span>}
                    {audioMenu &&
                        <div className={styles.audioMenu}>
                            <audio controls src={props.listing.musicMedia.song}></audio>
                        </div>
                    }
                </button>
            </td>
        </tr>

    );


}
