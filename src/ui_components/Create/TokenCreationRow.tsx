"use client"
import { useState } from 'react';
import {Service, TokenCreation} from '../../service/interface';
import styles from './TokenCreationRow.module.css';
import mainstyles from '../../App.module.css';
import { Button } from 'react-bootstrap';
import { FaPlay } from 'react-icons/fa';



interface TokenCreationRowProps {
    token: TokenCreation;
    service: Service;
    onPlayClick:(url :string)=> void
    onChange: ()=>void
}

export default function TokenCreationRow(props : TokenCreationRowProps){
    const [nbTickets, setNbTickets] = useState<number>(0);
    
    const payDividends: any = async(tokenId: number, amount: number) => {
        const transaction = await props.service.payDividends( tokenId,amount)

        console.log("TODO... pay dividends")
        props.onChange()

    }

    return (

        <tr className={styles.row}>
            <td className={styles.cell}>
            <img className={styles.img} alt={`cover`} src={`${props.token.mediaIpfsUrl}/image.png`} />
            </td>
            <td className={styles.cell}>{props.token.name}</td>
            <td className={styles.cell}>{props.token.numberSharesCreated}</td>
            <td className={styles.cell}>{props.token.initialTicketPool}</td>
            <td className={styles.cell}>{props.token.remainingDividendAvailableTickets}</td>
            <td className={styles.cell}>{props.token.dividendPerShare + " ETH"}</td>
 

   
           
               <td className={`${styles.cell} ${styles.preview}`}>
                    <input className={`${styles.cell}`} name="nbTickets" type="number" onChange={e => setNbTickets(e.target.valueAsNumber)} required></input>
                </td>
                <td className={styles.cell}>{nbTickets ? (Number(props.token.dividendPerShare) * nbTickets).toFixed(props.token.dividendPerShare.toString().split(".")[1].length) + " ETH" : "0 ETH"}</td><td className={`${styles.cell} ${styles.preview}`}>
                        <Button className={mainstyles.button} onClick={() =>payDividends(props.token.tokenId, Number(props.token.dividendPerShare) * nbTickets )}>Pay dividends</Button>
                    </td>
                    <td className={`${styles.cell} ${styles.preview}`}><button className={styles.previewBtn} onClick={() => props.onPlayClick(props.token.mediaIpfsUrl)}><FaPlay></FaPlay></button></td>

         
        </tr>
  
    );
}