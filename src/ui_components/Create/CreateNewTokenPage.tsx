'use client'
import { useState } from 'react';
import styles from './CreateNewTokenPage.module.css';
import mainstyles from '../../App.module.css';
import { Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { PageProps } from '../../App';


export default function CreateNewTokenPage(props:PageProps) {
    const [imageURL, setImageURL] = useState("");
    const [musicURL, setMusicURL] = useState("");
    const [name, setName] = useState("");
    const [nbShare, setNbShare] = useState<number>(0.0);
    const [initPrice, setInitPrice] = useState<number>(0.0);
    const [div, setDiv] = useState<number>(0.0);
    const [initTicketPool, setInitticketPool] = useState<number>(0.0);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImageURL(URL.createObjectURL(event.target.files[0]));
        }
    }

    const onMusicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setMusicURL(URL.createObjectURL(event.target.files[0]));
        }
    }

    const submit = async (e:any) => {
        setLoading(true);
        e.preventDefault();
        let form:HTMLFormElement = e.target;
        if(form){
            let musicInput:any = form.elements.namedItem("musicPreview")!;
            let imageInput:any = form.elements.namedItem("tokenImg")!;
            const createdTokens = await props.service.createTokens(props.loggedUser?.address, name, nbShare, initPrice, div, initTicketPool, musicInput.files[0], imageInput.files[0])

            console.log(createdTokens)


            if (createdTokens?.tokenId > 0){
                history.push("/creator");
            }

    
        }

        setLoading(false);
    }

  return (
    <div className={styles.page}>

      {imageURL && musicURL && <div className={styles.right}>
        <img className={styles.img} src={imageURL} alt="preview token"></img>
        <audio controls src={musicURL} className={styles.musicPlayer}></audio>
      </div>}

      <div className={styles.left}>
      <form onSubmit={submit} name="musicCreator">
        <h1>Create New Token</h1>

        <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="creatorAddress">Creator Address :</label>
            <span className={styles.text}>{props.loggedUser?.address}</span>
        </div>
        <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="name">Name :</label>
            <input className={styles.input} name="name" onChange={e => setName(e.target.value)} required></input>
        </div>
        <h3>Upload Media</h3>
        <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="tokenImg">Load token image : </label>
            <input className={styles.input} onChange={onImageChange} name="tokenImg" type="file" accept="image/png, image/gif, image/jpeg" required></input>
        </div>
        <div className={styles.inputContainer}>
            <label htmlFor="musicPreview">Load music preview :</label>
            <input  className={styles.input}onChange={onMusicChange} name="musicPreview" type="file" accept="audio/mp3" required></input>
        </div>
        <h3>Initial Share Offering</h3>
        <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="nbShare">Number of Shares :</label>
            <input className={styles.input} name="nbShare" type="number" onChange={e => setNbShare(e.target.valueAsNumber)} required></input>
        </div>
        <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="initPrice">Initial price/shares :</label>
            <input className={styles.input} name="initPrice" type="number" step="0.00000000000000001"  onChange={e => setInitPrice(e.target.valueAsNumber)} required></input>
        </div>
        <h3>Dividend Plan</h3>
        <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="divPerTicketSold">Dividend to pay per tickets sold :</label>
            <input className={styles.input} name="divPerTicketSold" type="number" step="0.00000000000000001" onChange={e => setDiv(e.target.valueAsNumber)} required></input>
        </div>
        <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="InitTicketPool">Initial ticket pool :</label>
            <input className={styles.input} name="InitTicketPool" type="number" onChange={e => setInitticketPool(e.target.valueAsNumber)} required></input>
        </div>

        <div className={styles.inputContainer} >
          <button type="submit" className={mainstyles.button}>Submit</button>
        </div>
        {loading && <Spinner/>}
      </form>
      </div>
    </div>
  )
}

