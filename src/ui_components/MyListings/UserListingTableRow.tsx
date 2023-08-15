import { useState } from "react";
import {Listing, MusiChainService, User} from "../../service/interface";
import styles from './UserListingRow.module.css';
import { Button, CloseButtonProps } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";


interface UserListingRowProps {
    listing: Listing;
    loggedUser: User
    onPlayClick:(url : string)=> void
    service: MusiChainService
    onChange: ()=> void
}


export default function UserListingRow(props : UserListingRowProps){

    const removeListing: any = async () => {
        const remove = await props.service.removeListing(props.listing.listingId)
        props.onChange()
        
    }

    return (
        <tr className={styles.row}>
                   <td className={styles.cell}>
            <img className={styles.img} src={`${props.listing.mediaIpfsUrl}/image.png`} />
            </td>
            <td className={styles.cell}>{props.listing.tokenName}</td>
            <td className={styles.cell}>{props.listing.shares}</td>
            <td className={styles.cell}>{props.listing.price + " ETH"}</td>
     

            <td className={`${styles.cell} ${styles.preview}`}>
                    <Button className={styles.trashBtn} variant="danger" onClick={() =>removeListing()}><BsFillTrashFill onClick={() =>removeListing()} /> </Button>
                </td>
                <td className={`${styles.cell} ${styles.preview}`}><button className={styles.previewBtn} onClick={() => props.onPlayClick(props.listing.mediaIpfsUrl )}><FaPlay></FaPlay></button></td>

        </tr> 
    );
}



const RemoveButton: React.FC<CloseButtonProps> = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="red"
          width="40px"
          height="40px"
          style={{ transition: 'fill 0.2s ease-in-out' }}
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M16.2 7.8l-1.4-1.4-4.8 4.8-4.8-4.8-1.4 1.4 4.8 4.8-4.8 4.8 1.4 1.4 4.8-4.8 4.8 4.8 1.4-1.4-4.8-4.8 4.8-4.8z" />
        </svg>
      </button>
    );
  };
