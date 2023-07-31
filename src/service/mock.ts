import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { Listing, Service, TokenCreation, TokenOwnership, User } from "./interface";
import contractBaseAbi from './contracts/Base.json';
import contractSaleAbi from './contracts/Sale.json';
import contractMetaDataAbi from './contracts/Metadata.json';
import { uploadToIpfs } from "./ipfs";

const web3 = new Web3((window as any).ethereum);

const contractMetaDataAddress = "0x8d4a718b899d423580fe7630E19C6Beb55432961" ;
const contractMetaDataInstance = new web3.eth.Contract(contractMetaDataAbi, contractMetaDataAddress);

const contractBaseAddress = "0xE0bCB9cc237175c3D16E2827474B37d89F52749a";
const contractBaseInstance = new web3.eth.Contract(contractBaseAbi, contractBaseAddress);

const contractSaleAddress = "0x5aD2626BF89b8D96557fCc043c375c4e230E2871" ;
const contractSaleInstance = new web3.eth.Contract(contractSaleAbi, contractSaleAddress);


export class Mock implements Service {

    constructor(){
    }

    async getConnectedAccount(): Promise<User> {
        let user = new User("")
        try {
            const provider = await detectEthereumProvider();
            if (provider) {
          
              try {
                await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
          
                const web3 = new Web3((window as any).ethereum);
                const accounts = await web3.eth.getAccounts();
                const currentAddress = accounts[0];
          
                user =  new User(currentAddress);
              } catch (error) {
                console.error('Error connecting to MetaMask:', error);
              }
              
            } else {
              console.error('MetaMask extension not detected');
            }
          } catch (error) {
            console.error('Error connecting to MetaMask:', error);
          }
          return user
        };

    async createTokens(creatorAddress: string, name: string, numShares: number, price: number, div: number, initialTktPool: number, mp3: File, img: File): Promise<TokenCreation> {
        // Implement your mock logic here
        let divInWeiString = web3.utils.toWei(div, "ether"); // Convert to Wei string
        let divInWeiNumber = parseInt(divInWeiString);
        try {

            const ipfsPaths = await uploadToIpfs(mp3, img)
            const accounts = await web3.eth.getAccounts();
            const currentAddress = accounts[0];
            const data = web3.utils.asciiToHex('some data');
            let ipfs = String(ipfsPaths.mp3Url.replace('/music.mp3', ''))
            const result = await (contractBaseInstance.methods.mint as any)(name, numShares, ipfs, initialTktPool, divInWeiString, data).send({ from: currentAddress });
            let mintLog = result.logs.find((log: { topics: string[]; }) => log.topics[0] === "0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885");
            let tokenIdHex = mintLog.data.slice(-64);
            let tokenId = web3.utils.hexToNumberString('0x' + tokenIdHex);
            let tokenIdNumber  = Number(tokenId)
            console.log('Creation was successful', result);

            const result2 = await this.addListing(currentAddress, tokenIdNumber, price, numShares)
            console.log('Listing was successful', result2);

            const remainingDividendEligibleTickets = await (contractMetaDataInstance.methods.ticketPools as any)(tokenId).call();
            const divPerShare = await (contractMetaDataInstance.methods.divs as any)(tokenId).call();
            const divInEther = web3.utils.fromWei(divPerShare.toString(), 'ether');
            const divInInt = parseInt(divInEther)

            return {
                tokenId: tokenIdNumber,
                mediaIpfsUrl: ipfs,
                name: name,
                numberSharesCreated: numShares,
                initialTicketPool: initialTktPool,
                remainingDividendAvailableTickets: remainingDividendEligibleTickets,
                dividendPerShare:  divInInt
                };
        } catch (error) {
            console.error('An error occurred', error);
            throw error;
        }
    }

    async getCreatedTokens(): Promise<TokenCreation[]> {
        // Implement your mock logic here
        try {
            const accounts = await web3.eth.getAccounts();
            const currentAddress = accounts[0];

            const tokenIds: number[] = await (contractBaseInstance.methods.getTokensCreatedBy as any)(currentAddress).call();

            const tokenCreatedList: TokenCreation[] = await Promise.all(
                tokenIds.map(async (tokenId: number) => {
                    try {
                        const name = await (contractMetaDataInstance.methods.tokenNames as any)(tokenId).call();
                        const ipfs = await (contractMetaDataInstance.methods.ipfsPaths as any)(tokenId).call();
                        const numShares = await (contractBaseInstance.methods.getTokenBalance as any)(currentAddress,tokenId).call();
                        const remainingDividendEligibleTickets = 0;
                        const divPerShare = await (contractMetaDataInstance.methods.divs as any)(tokenId).call();
                        const divInEther = web3.utils.fromWei(divPerShare.toString(), 'ether');
                        const initalPool = await (contractMetaDataInstance.methods.ticketPools as any)(tokenId).call();

                        return {
                            tokenId: tokenId,
                            mediaIpfsUrl: ipfs,
                            name: name,
                            numberSharesCreated: Number(numShares),
                            initialTicketPool: Number(initalPool),
                            remainingDividendAvailableTickets: Number(initalPool),
                            dividendPerShare: Number(divInEther),
                        };
                    } catch (error) {
                        console.error(`An error occurred while processing token ID ${tokenId}:`, error);
                        throw error;
                    }
                })
            );

            return tokenCreatedList;
        } catch (error) {
            console.error('An error occurred while fetching owned tokens:', error);
            throw error;
        }
    }

    payDividends(creatorAddress: string, tokenId: number, numberOfTickets: number): TokenCreation[] {
        throw new Error("Method not implemented.");
    }

    async  getOwnedTokens(): Promise<TokenOwnership[]> {
        try {
          const accounts = await web3.eth.getAccounts();
          const currentAddress = accounts[0];

            const tokenIds: number[] = await (contractSaleInstance.methods.getOwnedTokens as any)(currentAddress).call();
            const tokenIds2: number[] = await (contractBaseInstance.methods.getOwnedTokens as any)(currentAddress).call();
            const uniqueBaseTokens = new Set(tokenIds);
            const uniqueSaleTokens = tokenIds2.filter(token => !uniqueBaseTokens.has(token));
            const allUniqueTokens = [...Array.from(uniqueBaseTokens), ...uniqueSaleTokens];


            const tokenOwnershipList: TokenOwnership[] = await Promise.all(
                allUniqueTokens.map(async (tokenId: number) => {
              try {
                const name = await (contractMetaDataInstance.methods.tokenNames as any)(tokenId).call();
                const ipfs = await (contractMetaDataInstance.methods.ipfsPaths as any)(tokenId).call();
                const numShares = await (contractBaseInstance.methods.getTokenBalance as any)(currentAddress,tokenId).call();
                const remainingDividendEligibleTickets = await (contractMetaDataInstance.methods.ticketPools as any)(tokenId).call();
                const divPerShare = await (contractMetaDataInstance.methods.divs as any)(tokenId).call();
                const divInEther = web3.utils.fromWei(divPerShare.toString(), 'ether');

                return {
                  tokenId: tokenId,
                  mediaIpfsUrl: ipfs,
                  name: name,
                  numberSharesOwned: Number(numShares),
                  remainingDividendEligibleTickets: Number(remainingDividendEligibleTickets),
                  divPerShare: Number(divInEther),
                };
              } catch (error) {
                console.error(`An error occurred while processing token ID ${tokenId}:`, error);
                throw error;
              }
            })
          );

          return tokenOwnershipList;
        } catch (error) {
          console.error('An error occurred while fetching owned tokens:', error);
          throw error;
        }
      }

    async addListing(ownerAddress: string, tokenId: number, price: number, amount: number): Promise<Listing> {
        let priceInWeiString = web3.utils.toWei(price, "ether"); // Convert to Wei string
        let priceInWeiNumber = parseInt(priceInWeiString);
        try {
            const accounts = await web3.eth.getAccounts();
            const currentAddress = accounts[0];
            await (contractBaseInstance.methods.setApprovalForAll as any)(contractSaleAddress, true).send({ from: currentAddress });
            const result = await (contractSaleInstance.methods.listToken as any)(tokenId, priceInWeiString, amount).send({ from: currentAddress });

            console.log('Transaction was successful', result);
        } catch (error) {
            console.error('An error occurred', error);
        }
        const tokenName = await (contractMetaDataInstance.methods.tokenNames as any)(tokenId).call();
        const creator = await (contractBaseInstance.methods.originalCreators as any)(tokenId).call();
        const owner = await (contractBaseInstance.methods.getOwnerOfToken as any)(tokenId).call();
        const ipfs = await (contractMetaDataInstance.methods.ipfsPaths as any)(tokenId).call();
        const remainingTicketPool = await (contractMetaDataInstance.methods.ticketPools as any)(tokenId).call();
        const divPerShare = await (contractMetaDataInstance.methods.divs as any)(tokenId).call();
        const divInEther = web3.utils.fromWei(divPerShare.toString(), 'ether');


        return {
            tokenId: tokenId,
            tokenName: tokenName,
            creator:creator,
            owner: owner,
            mediaIpfsUrl: ipfs,
            price: priceInWeiNumber,
            shares: amount,
            divPerShare: Number(divInEther),
            remainingTicketPool: Number(remainingTicketPool)
        };
    }

    async removeListing(tokenId: number): Promise<Listing> {
        try {
            const accounts = await web3.eth.getAccounts();
            const currentAddress = accounts[0];
            const result = await (contractSaleInstance.methods.removeListing as any)(tokenId).send({ from: currentAddress });

            console.log('Transaction was successful', result);
        } catch (error) {
            console.error('An error occurred', error);
        }
        const tokenName = await (contractMetaDataInstance.methods.tokenNames as any)(tokenId).call();
        const creator = await (contractBaseInstance.methods.originalCreators as any)(tokenId).call();
        const owner = await (contractBaseInstance.methods.getOwnerOfToken as any)(tokenId).call();
        const ipfs = await (contractMetaDataInstance.methods.ipfsPaths as any)(tokenId).call();
        const remainingDividendEligibleTickets = await (contractMetaDataInstance.methods.ticketPools as any)(tokenId).call();
        const divPerShare = await (contractMetaDataInstance.methods.divs as any)(tokenId).call();
        const divInEther = web3.utils.fromWei(divPerShare.toString(), 'ether');
        const divInInt = parseInt(divInEther);

        return {
            tokenId: tokenId,
            tokenName: tokenName,
            creator:creator,
            owner: owner,
            mediaIpfsUrl: ipfs,
            price: 0,
            shares: 0,
            divPerShare: Number(divInEther),
            remainingTicketPool: remainingDividendEligibleTickets
        };
    }


    async getUserListings(): Promise<Listing[]> {
        try {
            const accounts = await web3.eth.getAccounts();
            const currentAddress = accounts[0];
            const result = await (contractSaleInstance.methods.getListingsByUser as any)(currentAddress).call({ from: currentAddress });

            const listings: Listing[] = [];
            for (let listing of result) {
                const tokenId = Number(listing.tokenId);

                const tokenName = await (contractMetaDataInstance.methods.tokenNames as any)(tokenId).call();
                const creator = await (contractBaseInstance.methods.originalCreators as any)(tokenId).call();
                const owner = await (contractBaseInstance.methods.getOwnerOfToken as any)(tokenId).call();
                const ipfs = await (contractMetaDataInstance.methods.ipfsPaths as any)(tokenId).call();
                const priceInEther = web3.utils.fromWei(listing.price.toString(), 'ether');
                const remainingDividendEligibleTickets = await (contractMetaDataInstance.methods.ticketPools as any)(tokenId).call();
                const divPerShare = await (contractMetaDataInstance.methods.divs as any)(tokenId).call();
                const divInEther = web3.utils.fromWei(divPerShare.toString(), 'ether');

                listings.push({
                    tokenId: tokenId,
                    tokenName: tokenName,
                    creator: creator,
                    owner: owner,
                    mediaIpfsUrl: ipfs,
                    price: Number(priceInEther),
                    shares: Number(listing.amount),
                    divPerShare: Number(divInEther),
                    remainingTicketPool: remainingDividendEligibleTickets
                });
            }

            console.log('Transaction was successful', listings);
            return listings;
        } catch (error) {
            console.error('An error occurred', error);
            return [];
        }
    }

    async buy(tokenId: number, amount: number, price: number): Promise<TokenOwnership> {
        try {
            console.log(tokenId)
            const accounts = await web3.eth.getAccounts();
            const tokenName = await (contractMetaDataInstance.methods.tokenNames as any)(tokenId).call();
            const currentAddress = accounts[0];
            console.log(amount)
            const result = await (contractSaleInstance.methods.buyToken as any)(tokenId, amount).send({from: currentAddress, value: web3.utils.toWei(price.toString(), "ether")});
            const ipfs = await (contractMetaDataInstance.methods.ipfsPaths as any)(tokenId).call();
            const shareAlreadyOwned = await (contractBaseInstance.methods.getTokenBalance as any)(currentAddress,tokenId).call();
            const remainingDividendEligibleTickets = await (contractMetaDataInstance.methods.ticketPools as any)(tokenId).call();
            const divPerShare = await (contractMetaDataInstance.methods.divs as any)(tokenId).call();
            const divInEther = web3.utils.fromWei(divPerShare.toString(), 'ether');

            console.log('Transaction was successful', result);
            return {
                tokenId: tokenId,
                mediaIpfsUrl: ipfs,
                name: tokenName,
                numberSharesOwned: Number(shareAlreadyOwned)+amount,
                remainingDividendEligibleTickets: remainingDividendEligibleTickets,
                divPerShare: Number(divInEther)
            };
        } catch (error) {
            console.error('An error occurred', error);
            return Promise.reject(error);
        }
    }


    async getMarketListings(): Promise<Listing[]> {
        try {
            const result = await (contractSaleInstance.methods.getAllListings as any)().call();
            const listings: Listing[] = [];
            for (let listing of result) {
                const tokenId = Number(listing.tokenId);

                const tokenName = await (contractMetaDataInstance.methods.tokenNames as any)(tokenId).call();
                const creator = await (contractBaseInstance.methods.originalCreators as any)(tokenId).call();
                const owner = await (contractBaseInstance.methods.getOwnerOfToken as any)(tokenId).call();
                const ipfs = await (contractMetaDataInstance.methods.ipfsPaths as any)(tokenId).call();
                const priceInEther = web3.utils.fromWei(listing.price.toString(), 'ether');
                const remainingTicketPool = await (contractMetaDataInstance.methods.ticketPools as any)(tokenId).call();
                const divPerShare = await (contractMetaDataInstance.methods.divs as any)(tokenId).call();
                const divInEther = web3.utils.fromWei(divPerShare.toString(), 'ether');

                listings.push({
                    tokenId: tokenId,
                    tokenName: tokenName,
                    creator: creator,
                    owner: owner,
                    mediaIpfsUrl: ipfs,
                    price: Number(priceInEther),
                    shares: Number(listing.amount),
                    divPerShare: Number(divInEther),
                    remainingTicketPool: Number(remainingTicketPool)
                });
            }

            console.log('Transaction was successful', listings);
            return listings;
        } catch (error) {
            console.error('An error occurred', error);
            return [];
        }
    }

}