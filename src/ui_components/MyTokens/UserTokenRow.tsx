"use client"
import { useState } from 'react';
import { TokenOwnership, User } from '../../service/interface';
import styles from './UserTokenRow.module.css';
import mainstyles from '../../App.module.css';
interface UserTokenRowProps {
    token: TokenOwnership;
    loggedUser: User
}


export default function UserTokenRow(props : UserTokenRowProps){
    const [audioMenu, isAudioMenu] = useState(false);
    return (
    <>
        <tr className={styles.row}>
                   <td className={styles.cell}>
            <img className={styles.img} src={props.token.musicMedia.image} />
            </td>
            <td className={styles.cell}>{props.token.name}</td>
            <td className={styles.cell}>{props.token.numberSharesOwned}</td>
            <td className={styles.cell}>{props.token.divPerShare}</td>
            <td className={styles.cell}>{props.token.remainingDividendEligibleTickets}</td>
            <td className={styles.cell}>{props.token.remainingDividendEligibleTickets * props.token.divPerShare}</td>
            <td className={`${styles.cell} ${styles.preview}`}>
                <button className={styles.previewBtn} onClick={() => isAudioMenu(!audioMenu)}>
                    {audioMenu ? <span>&#10006;</span> : <span>&#9658;</span>}
                    {audioMenu &&
                    <div className={styles.audioMenu}>
                        <audio controls src={props.token.musicMedia.song}></audio>
                    </div>
                    }
                </button>
            </td>
        </tr> 
    </>
    );
}