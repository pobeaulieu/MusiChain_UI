import React, { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import { Button } from "react-bootstrap";
import mainstyles from '../../App.module.css';
import { NavProps } from '../../App';
import { User } from '../../service/interface';

function ConnectWalletButton(props: NavProps) {


  // if change account on Metamask extension, reset the loggedUser 
  if ((window as any).ethereum) {
    (window as any).ethereum.on('accountsChanged', () => props.onWalletConnect(new User("")))
  }

  const connectMetaMask = async () => {
    const user = await props.service.getConnectedAccount()
    props.onWalletConnect(user)
  };

  return (
    <div>
      {props.loggedUser?.address === "" && (
        <Button className={mainstyles.button} onClick={connectMetaMask}>Connect Wallet</Button>
      )}
    </div>
  );
}
export default ConnectWalletButton;
