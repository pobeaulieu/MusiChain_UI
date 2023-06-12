import React, { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import { Button } from "react-bootstrap";
import mainstyles from './App.module.css';

function MetaMaskIntegration(props: any) {
  const connectMetaMask = async () => {
    try {
      const provider = await detectEthereumProvider();
      if (provider) {
    
          await connectToMetaMask();
        
      } else {
        console.error('MetaMask extension not detected');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  const connectToMetaMask = async () => {
    try {
      await (window as any).ethereum.request({ method: 'eth_requestAccounts' });

      const web3 = new Web3((window as any).ethereum);
      const accounts = await web3.eth.getAccounts();
      const currentAddress = accounts[0];

      props.onWalletConnect(currentAddress);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };


  // Listen for changes in MetaMask connection
  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        props.onWalletConnect("");
      }
    };

    if ((window as any).ethereum) {
      (window as any).ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if ((window as any).ethereum) {
        (window as any).ethereum.off('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  return (
    <div>
      {props.loggedUser.address === "" && (
        <Button className={mainstyles.button} onClick={connectMetaMask}>Connect MetaMask</Button>
      )}
    </div>
  );
}
export default MetaMaskIntegration;
