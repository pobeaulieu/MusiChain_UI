import { useState } from "react";
import { Listing, User } from "../../service/interface";
import styles from './UserListingRow.module.css';
import mainstyles from '../../App.module.css';
import { CloseButtonProps } from "react-bootstrap";

interface UserListingRowProps {
    listing: Listing;
    loggedUser: User
}

export default function UserListingRow(props : UserListingRowProps){
    const [audioMenu, isAudioMenu] = useState(false);
    return (
        <tr className={styles.row}>
                   <td className={styles.cell}>
            <img className={styles.img} alt={`cover`} src={props.listing.musicMedia.image} />
            </td>
            <td className={styles.cell}>{props.listing.tokenName}</td>
            <td className={styles.cell}>{props.listing.price}</td>
            <td className={styles.cell}>{props.listing.shares}</td>

            {props.loggedUser.address != "" && <td className={`${styles.cell} `}>
                <RemoveButton> 
                </RemoveButton>
            </td>}
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
