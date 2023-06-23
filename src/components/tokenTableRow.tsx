"use client"
import { useState } from 'react';
import styles from './tokenTableRow.module.css';



export default function TokenTableRow(props : any){
    const [audioMenu, isAudioMenu] = useState(false);
    const [imgUrl, setImgUrl] = useState("");
    const [musicUrl, setMusicUrl] = useState("");
    const [name, setName] = useState("");


    const getMusicMedia = async () => {
        let content:object = {id:props.data.Id};

        const response:Response = await fetch("https://localhost:8000/api/getmusicmedia",{
            method:'GET',
            body:JSON.stringify(content)
        });

        const body = await response.json();

        setImgUrl(URL.createObjectURL(body.ImgFile));
        setMusicUrl(URL.createObjectURL(body.Mp3File));
        setName(body.Name);
    }

    getMusicMedia();

    return (
    <>
        <tr className={styles.row}>
            <td className={styles.cell}>
                <img className={styles.img} alt={`${name}'s cover`} src={imgUrl}></img>
                <span>{name}</span>
            </td>
            <td className={styles.cell}>{props.data.Price}</td>
            <td className={styles.cell}>{props.data.NumShares}</td>
            <td className={styles.cell}>{props.data.InitialTktPool}</td>
            <td className={styles.cell}>{props.data.RemainingTktPool}</td>
            <td className={styles.cell}>{props.data.Div}</td>
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
        </tr>
    </>
    );
}