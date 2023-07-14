"use client"
import { useState } from 'react';
import styles from './marketTokenTableRow.module.css';
import mainstyles from '../App.module.css';

export default function MarketTokenTableRow(props : any){
    const [audioMenu, isAudioMenu] = useState(false);
    const [imgUrl, setImgUrl] = useState("");
    const [musicUrl, setMusicUrl] = useState("");
    const [name, setName] = useState("");


    const getMusicMedia = async () => {
        let content:object = {id:props.data.Id};

        const response:Response = await fetch("https://localhost:8000/api/",{
            method:'GET',
            body:JSON.stringify(content)
        });

        const body = await response.json();

        setImgUrl(URL.createObjectURL(body.ImgFile));
        setMusicUrl(URL.createObjectURL(body.Mp3File));
        setName(body.Name);
    }

    //getMusicMedia();

    return (
    <>
        <tr className={styles.row}>
            <td className={styles.cell}>
                <img className={styles.img} alt={`${name}'s cover`} src={imgUrl}></img>
                <span>{name}</span>
            </td>
            <td className={styles.cell}>{props.data.Creator}</td>
            <td className={styles.cell}>{props.data.Owner}</td>
            <td className={styles.cell}>{props.data.PriceByShare}</td>
            <td className={styles.cell}>{props.data.AvailableShares}</td>
            <td className={styles.cell}>{props.data.DivPotentialByShare}</td>
            <td className={`${styles.cell} ${styles.preview}`}>
                <button className={styles.previewBtn} onClick={() => isAudioMenu(!audioMenu)}>
                    {audioMenu ? <span>&#10006;</span> : <span>&#9658;</span>}
                    {audioMenu &&
                    <div className={styles.audioMenu}>
                        <audio controls src={musicUrl}></audio>
                    </div>
                    }
                </button>
            </td>
            {props.loggedUser.address != "" && <td className={`${styles.cell} ${styles.preview}`}>
                <button className={mainstyles.button} >Buy
                </button>
            </td>}


        </tr>

    </>
    );
}