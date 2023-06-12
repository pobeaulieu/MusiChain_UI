'use client'
import { useState } from 'react';
import styles from './createNewToken.module.css';
import mainstyles from '../App.module.css';
import { Button, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function CreateNewToken(props:any) {

    const [imageURL, setImageURL] = useState("");
    const [musicURL, setMusicURL] = useState("");
    const [name, setName] = useState("");
    const [nbShare, setNbShare] = useState(0);
    const [initPrice, setInitPrice] = useState(0);
    const [div, setDiv] = useState(0);
    const [initTicketPool, setInitticketPool] = useState(0);
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
            
            let tokenBody:TokenBody = {
                CreatorAddress: props.loggedUser.address,
                Name: name,
                NumShares: nbShare,
                Price: initPrice,
                Div: div,
                InitialTktPool: initTicketPool,
                Mp3: musicInput.files[0],
                Img: imageInput.files[0]
            };
            console.log(tokenBody);
            await props.createToken(tokenBody);
        }

        setLoading(false);
    }

  return (
    <div className={styles.page}>
      <div className={styles.top}>
      <Button className={mainstyles.button} onClick={()=>history.push("/create")}>{"< Back to your creations"}</Button>
      </div>
      <div className={styles.left}>
        <img className={styles.img} src={imageURL} alt="preview token"></img>
        <audio controls src={musicURL} className={styles.musicPlayer}></audio>
      </div>

      <div className={styles.right}>
      <form onSubmit={submit} name="musicCreator">
        <h1>Create New Token</h1>
        <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="creatorAddress">Creator Address :</label>
            <span className={styles.text}>{props.loggedUser.address}</span>
        </div>
        <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="name">Name :</label>
            <input className={styles.input} name="name" type="text" onChange={e => setName(e.target.value)} required></input>
        </div>
        
        <h3>Initial Share Offering</h3>
        <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="nbShare">Number of Shares :</label>
            <input className={styles.input} name="nbShare" type="number" onChange={e => setNbShare(e.target.valueAsNumber)} required></input>
        </div>
        <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="initPrice">Initial price/shares :</label>
            <input className={styles.input} name="initPrice" type="number" onChange={e => setInitPrice(e.target.valueAsNumber)} required></input>
        </div>
        <h3>Dividend Plan</h3>
        <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="divPerTicketSold">Dividend per tickets sold</label>
            <input className={styles.input} name="divPerTicketSold" type="number" onChange={e => setDiv(e.target.valueAsNumber)} required></input>
        </div>
        <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="InitTicketPool">Initial tocket pool</label>
            <input className={styles.input} name="InitTicketPool" type="number" onChange={e => setInitticketPool(e.target.valueAsNumber)} required></input>
        </div>
        <h3>Upload Media</h3>
        <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="tokenImg">Load token image</label>
            <input className={styles.input} onChange={onImageChange} name="tokenImg" type="file" accept="image/png, image/gif, image/jpeg" required></input>
        </div>
        <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="musicPreview">Load music preview</label>
            <input className={styles.input} onChange={onMusicChange} name="musicPreview" type="file" accept="audio/mp3" required></input>
        </div>
        <div className={styles.submitWrapper}>
          <button type="submit" className={mainstyles.button}>Submit</button>
        </div>
        <div className={styles.message}>
          <p>{props.message}</p>
        </div>
        {loading && <Spinner/>}
      </form>
      </div>
    </div>
  )
}

interface TokenBody{
    CreatorAddress:string,
    Name:string,
    NumShares:number,
    Price:number,
    Div:number,
    InitialTktPool: number,
    Mp3:File,
    Img:File
}