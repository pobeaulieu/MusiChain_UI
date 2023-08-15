"use client"
import { useState } from 'react';
import {MusiChainService, TokenOwnership, User} from '../../service/interface';
import styles from './UserTokenRow.module.css';
import mainstyles from '../../App.module.css';
import { Button } from 'react-bootstrap';
import { FaPlay } from 'react-icons/fa';

interface UserTokenRowProps {
    service: MusiChainService,
    token: TokenOwnership,
    loggedUser: User,    
    onPlayClick:(url : string)=> void
    onChange: ()=> void

    
}


export default function UserTokenRow(props : UserTokenRowProps){
    const [nbShare, setNbShare] = useState<number>(0);
    const [price, setPrice] = useState<number>(0.0);


    const addListing: any = () => {
        if (nbShare <= props.token.numberSharesOwned){
            const tokens = props.service.addListing(props.loggedUser?.address, props.token.tokenId, price, nbShare)
            props.onChange()
            
        }else{
            console.log("ERROR not enough shares owned")
        }
    }
    return (
    <>
        <tr className={styles.row}>
                   <td className={styles.cell}>
            <img className={styles.img} src={`${props.token.mediaIpfsUrl}/image.png`} />
            </td>
            <td className={styles.cell}>{props.token.name}</td>
            <td className={styles.cell}>{props.token.numberSharesOwned}</td>
            <td className={styles.cell}>{props.token.divPerShare + " ETH"}</td>
            <td className={styles.cell}>{props.token.remainingDividendEligibleTickets}</td>
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
                <td className={`${styles.cell} ${styles.preview}`}><button className={styles.previewBtn} onClick={() => props.onPlayClick(props.token.mediaIpfsUrl)}><FaPlay></FaPlay></button></td>

        </tr> 
    </>
    );
}