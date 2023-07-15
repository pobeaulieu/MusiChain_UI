"use client"
import { useState } from 'react';
import { TokenCreation } from '../../service/interface';
import styles from './TokenCreationRow.module.css';
import mainstyles from '../../App.module.css';
import { Button } from 'react-bootstrap';
import { FaPlay } from 'react-icons/fa';



interface TokenCreationRowProps {
    token: TokenCreation;
    onPlayClick:(id : number)=> void
}

export default function TokenCreationRow(props : TokenCreationRowProps){
    const [audioMenu, isAudioMenu] = useState(false);
    const [nbTickets, setNbTickets] = useState<number>(0);
    
    const payDividends: any = () => {
     
        console.log("TODO... pay dividends")

    }

    return (

        <tr className={styles.row}>
            <td className={styles.cell}>
            <img className={styles.img} alt={`cover`} src={props.token.musicMedia.image} />
            </td>
            <td className={styles.cell}>{props.token.name}</td>
            <td className={styles.cell}>{props.token.numberSharesCreated}</td>
            <td className={styles.cell}>{props.token.initialTicketPool}</td>
            <td className={styles.cell}>{props.token.remainingDividendAvailableTickets}</td>
            <td className={styles.cell}>{props.token.dividendPerShare + " ETH"}</td>
 

   
           
               <td className={`${styles.cell} ${styles.preview}`}>
                    <input className={`${styles.cell}`} name="nbTickets" type="number" onChange={e => setNbTickets(e.target.valueAsNumber)} required></input>
                </td>
                <td className={styles.cell}>{props.token.dividendPerShare * nbTickets + " ETH"}</td><td className={`${styles.cell} ${styles.preview}`}>
                        <Button className={mainstyles.button} onClick={() =>payDividends()}>Pay dividends</Button>
                    </td>
                    <td className={`${styles.cell} ${styles.preview}`}><button className={styles.previewBtn} onClick={() => props.onPlayClick(props.token.tokenId)}><FaPlay></FaPlay></button></td>

         
        </tr>
  
    );
}