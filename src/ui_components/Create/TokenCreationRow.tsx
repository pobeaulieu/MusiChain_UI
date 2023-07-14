"use client"
import { useState } from 'react';
import { TokenCreation } from '../../service/interface';
import styles from './TokenCreationRow.module.css';



interface TokenCreationRowProps {
    token: TokenCreation;
}

export default function TokenCreationRow(props : TokenCreationRowProps){
    const [audioMenu, isAudioMenu] = useState(false);
    console.log(props)

    return (

        <tr className={styles.row}>
            <td className={styles.cell}>
            <img className={styles.img} alt={`cover`} src={props.token.musicMedia.image} />
            </td>
            <td className={styles.cell}>{props.token.name}</td>
            <td className={styles.cell}>{props.token.numberSharesCreated}</td>
            <td className={styles.cell}>{props.token.initialTicketPool}</td>
            <td className={styles.cell}>{props.token.remainingDividendAvailableTickets}</td>
            <td className={styles.cell}>{props.token.dividendPerShare}</td>
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
  
    );
}