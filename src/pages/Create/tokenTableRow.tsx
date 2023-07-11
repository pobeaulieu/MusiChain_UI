"use client"
import { useEffect, useState } from 'react';
import { getMusicMediaById, MusicMedia } from '../../MusicMediaCache';
import styles from './tokenTableRow.module.css';



export default function TokenTableRow(props : any){
    const [audioMenu, isAudioMenu] = useState(false);


    


    return (
    <>
        <tr className={styles.row}>
            <td className={styles.cell}>
            <img className={styles.img} alt={`cover`} src={props.musicMedia.imageFile ? URL.createObjectURL(new Blob([props.musicMedia.imageFile])) : ''} />

            </td>
            <td className={styles.cell}>{props.tokenData.Price}</td>
            <td className={styles.cell}>{props.tokenData.NumShares}</td>
            <td className={styles.cell}>{props.tokenData.InitialTktPool}</td>
            <td className={styles.cell}>{props.tokenData.RemainingTktPool}</td>
            <td className={styles.cell}>{props.tokenData.Div}</td>
            <td className={`${styles.cell} ${styles.preview}`}>
                <button className={styles.previewBtn} onClick={() => isAudioMenu(!audioMenu)}>
                    {audioMenu ? <span>&#10006;</span> : <span>&#9658;</span>}
                    {audioMenu &&
                    <div className={styles.audioMenu}>
                        <audio controls src={props.musicMedia && URL.createObjectURL(new Blob([props.musicMedia.mp3File], { type: 'audio/mpeg' }))}></audio>
                    </div>
                    }
                </button>
            </td>
        </tr>
    </>
    );
}