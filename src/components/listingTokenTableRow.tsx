"use client"
import { useState } from 'react';
import styles from './listingTokenTableRow.module.css';



export default function ListingTokenTableRow(props : any){
    const [audioMenu, isAudioMenu] = useState(false);
    const [imgUrl, setImgUrl] = useState("");
    const [musicUrl, setMusicUrl] = useState("");
    const [name, setName] = useState("");


    // const getMusicMedia = async () => {
    //     let content:object = {id:props.data.Id};

    //     const response:Response = await fetch("https://localhost:8000/api/getmusicmedia",{
    //         method:'GET',
    //         body:JSON.stringify(content)
    //     });

    //     const body = await response.json();

    //     setImgUrl(URL.createObjectURL(body.ImgFile));
    //     setMusicUrl(URL.createObjectURL(body.Mp3File));
    //     setName(body.Name);
    // }

    // getMusicMedia();

    return (
    <>
        <tr className={styles.row}>
            <td className={styles.cell}>
                <img className={styles.img} alt={`${name}'s cover`} src={imgUrl}></img>
                <span>{name}</span>
            </td>
            <td className={styles.cell}>{props.data.pricePerShare}</td>
            <td className={styles.cell}>{props.data.InitialShares}</td>
            <td className={styles.cell}>{props.data.SoldShares}</td>
            <td className={`${styles.cell} ${styles.preview}`}>
                <button className={styles.closeBtn}>
                    X
                </button>
            </td>
        </tr>
    </>
    );
}