"use client"
import { useState } from 'react';
import { TokenOwnership, User } from '../../service/interface';
import styles from './UserTokenRow.module.css';
import mainstyles from '../../App.module.css';
import { Button } from 'react-bootstrap';
import { FaPlay } from 'react-icons/fa';
interface UserTokenRowProps {
    token: TokenOwnership;
    loggedUser: User
    onPlayClick:(id : number)=> void
}


export default function UserTokenRow(props : UserTokenRowProps){
    const [audioMenu, isAudioMenu] = useState(false);
    const [nbShare, setNbShare] = useState<number>(0);
    const [price, setPrice] = useState<number>(0.0);


    const addListing: any = () => {
        if (nbShare <= props.token.numberSharesOwned){
            console.log("TODO... add listing " + nbShare + " shares of token " + props.token.tokenId + " at price " + price)
        }else{
            console.log("ERROR not enough shares owned")
        }
    }
    return (
    <>
        <tr className={styles.row}>
                   <td className={styles.cell}>
            <img className={styles.img} src={props.token.musicMedia.image} />
            </td>
            <td className={styles.cell}>{props.token.name}</td>
            <td className={styles.cell}>{props.token.numberSharesOwned}</td>
            <td className={styles.cell}>{props.token.divPerShare + " ETH"}</td>
            <td className={styles.cell}>{props.token.remainingDividendEligibleTickets}</td>
            <td className={styles.cell}>{props.token.numberSharesOwned * props.token.remainingDividendEligibleTickets * props.token.divPerShare + " ETH"}</td>
            <>
                <td className={`${styles.cell}`}>
                    <input className={`${styles.cell} ${styles.inputShares}`} name="nbShare" type="number" onChange={e => setNbShare(e.target.valueAsNumber)} required></input>
                </td>
                <td className={`${styles.cell}`}>
                    <input className={`${styles.cell} ${styles.inputPrice}`} name="price" type="number" onChange={e => setPrice(e.target.valueAsNumber)} required></input>
                </td>
                <td className={styles.cell}>{" ETH"}</td><td className={`${styles.cell} ${styles.preview}`}>

                </td>
                <td className={`${styles.cell} ${styles.preview}`}>
                    <Button className={mainstyles.button} onClick={() =>addListing()}>Add listing</Button>
                </td></>
                <td className={`${styles.cell} ${styles.preview}`}><button className={styles.previewBtn} onClick={() => props.onPlayClick(props.token.tokenId)}><FaPlay></FaPlay></button></td>

        </tr> 
    </>
    );
}