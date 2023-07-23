import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { Listing, Service, TokenCreation, TokenOwnership, User } from "./interface";
import contractBaseAbi from './contracts/Base.json';
import contractSaleAbi from './contracts/Sale.json';
import { uploadToIpfs } from "./ipfs";

const web3 = new Web3((window as any).ethereum);
const contractBaseAddress = "0x2223C966Ca64835289b5aD329fee76473F0c9196";
const contractBaseInstance = new web3.eth.Contract(contractBaseAbi, contractBaseAddress);

const contractSaleAddress = "0x8C7350b70a09Ee913b47ce1b7Fe011CE68F84b5c" ;
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

        try {

            const ipfsPaths = await uploadToIpfs(mp3, img)
            const accounts = await web3.eth.getAccounts();
            const currentAddress = accounts[0];
            const data = web3.utils.asciiToHex('some data');
            let ipfs = String(ipfsPaths.mp3Url.replace('/music.mp3', ''))
            const result = await (contractBaseInstance.methods.mint as any)(name, numShares, ipfs, data).send({ from: currentAddress });
            let mintLog = result.logs.find((log: { topics: string[]; }) => log.topics[0] === "0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885");
            let tokenIdHex = mintLog.data.slice(-64);
            let tokenId = web3.utils.hexToNumberString('0x' + tokenIdHex);
            let tokenIdNumber  = Number(tokenId)
            console.log('Creation was successful', result);

            const result2 = await this.addListing(currentAddress, tokenIdNumber, price, numShares)
            console.log('Listing was successful', result2);

            return {
                tokenId: tokenIdNumber,
                mediaIpfsUrl: ipfs,
                name: name,
                numberSharesCreated: numShares,
                initialTicketPool: initialTktPool,
                remainingDividendAvailableTickets: 100,
                dividendPerShare:  0.005
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
                        console.log("HELLO")
                        const name = await (contractBaseInstance.methods.tokenNames as any)(tokenId).call();
                        const ipfs = await (contractBaseInstance.methods.ipfsPaths as any)(tokenId).call();
                        console.log(ipfs)
                        const remainingDividendEligibleTickets = 0;
                        const divPerShare = 0;
                        const initalPool = 0;
                        const numShares = 0;
        

                        return {
                            tokenId: tokenId,
                            mediaIpfsUrl: ipfs,
                            name: name,
                            numberSharesCreated: numShares,
                            initialTicketPool: initalPool,
                            remainingDividendAvailableTickets: remainingDividendEligibleTickets,
                            dividendPerShare: divPerShare,
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

          const tokenIds: number[] = await (contractBaseInstance.methods.getOwnedTokens as any)(currentAddress).call();

            const tokenOwnershipList: TokenOwnership[] = await Promise.all(
            tokenIds.map(async (tokenId: number) => {
              try {
                const name = await (contractBaseInstance.methods.tokenNames as any)(tokenId).call();
                const ipfs = await (contractBaseInstance.methods.ipfsPaths as any)(tokenId).call();
                const remainingDividendEligibleTickets = 0;
                const divPerShare = 0;
        

                return {
                  tokenId: tokenId,
                  mediaIpfsUrl: ipfs,
                  name: name,
                  numberSharesOwned: 0,
                  remainingDividendEligibleTickets: remainingDividendEligibleTickets,
                  divPerShare: divPerShare,
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
        // Implement your mock logic here

        try {
            const accounts = await web3.eth.getAccounts();
            const currentAddress = accounts[0];
            const result = await (contractSaleInstance.methods.listToken as any)(tokenId, price, amount).send({ from: currentAddress });

            console.log('Transaction was successful', result);
        } catch (error) {
            console.error('An error occurred', error);
        }
        const tokenName = await (contractBaseInstance.methods.tokenNames as any)(tokenId).call();
        const creator = await (contractBaseInstance.methods.originalCreators as any)(tokenId).call();
        const owner = await (contractBaseInstance.methods.getOwnerOfToken as any)(tokenId).call();
        const ipfs = await (contractBaseInstance.methods.ipfsPaths as any)(tokenId).call();


        return {
            tokenId: tokenId,
            tokenName: tokenName,
            creator:creator,
            owner: owner,
            mediaIpfsUrl: ipfs,
            price: price,
            shares: amount,
            divPerShare: 0.005,
            remainingTicketPool: 50000
        };
    }

    removeListing(ownerAddress: string, tokenId: number, price: number, amount: number): Listing {
        throw new Error("Method not implemented.");
    }


    async getUserListings(): Promise<Listing[]> {
        try {
            const accounts = await web3.eth.getAccounts();
            const currentAddress = accounts[0];
            const result = await (contractSaleInstance.methods.getListingsByUser as any)(currentAddress).call({ from: currentAddress });

            const listings: Listing[] = [];
            for (let listing of result) {
                const tokenId = Number(listing.tokenId);

                const tokenName = await (contractBaseInstance.methods.tokenNames as any)(tokenId).call();
                const creator = await (contractBaseInstance.methods.originalCreators as any)(tokenId).call();
                const owner = await (contractBaseInstance.methods.getOwnerOfToken as any)(tokenId).call();
                const ipfs = await (contractBaseInstance.methods.ipfsPaths as any)(tokenId).call();

                listings.push({
                    tokenId: tokenId,
                    tokenName: tokenName,
                    creator: creator,
                    owner: owner,
                    mediaIpfsUrl: ipfs,
                    price: Number(listing.price),
                    shares: Number(listing.amount),
                    divPerShare: 10,
                    remainingTicketPool: 50
                });
            }

            console.log('Transaction was successful', listings);
            return listings;
        } catch (error) {
            console.error('An error occurred', error);
            return [];
        }
    }

    async buy(tokenId: number, buyerAddress: string, sellerAddress: string, amount: number, price: number): Promise<TokenOwnership> {
        try {
            const accounts = await web3.eth.getAccounts();
            const tokenName = await (contractBaseInstance.methods.tokenNames as any)(tokenId).call();
            const currentAddress = accounts[0];
            const result = await (contractSaleInstance.methods.buyToken as any)(0).send({ from: currentAddress });
            const ipfs = await (contractBaseInstance.methods.ipfsPaths as any)(tokenId).call();

            console.log('Transaction was successful', result);
            return {
                tokenId: tokenId,
                mediaIpfsUrl: ipfs,
                name: tokenName,
                numberSharesOwned: 5,
                remainingDividendEligibleTickets: 5,
                divPerShare: 0.005
            };
        } catch (error) {
            console.error('An error occurred', error);
            return Promise.reject(error);
        }
    }


    async getMarketListings(): Promise<Listing[]> {
        try {
            const result = await (contractSaleInstance.methods.getListings as any)().call();

            const listings: Listing[] = [];
            for (let listing of result) {
                const tokenId = Number(listing.tokenId);

                const tokenName = await (contractBaseInstance.methods.tokenNames as any)(tokenId).call();
                const creator = await (contractBaseInstance.methods.originalCreators as any)(tokenId).call();
                const owner = await (contractBaseInstance.methods.getOwnerOfToken as any)(tokenId).call();
                const ipfs = await (contractBaseInstance.methods.ipfsPaths as any)(tokenId).call();

                listings.push({
                    tokenId: tokenId,
                    tokenName: tokenName,
                    creator: creator,
                    owner: owner,
                    mediaIpfsUrl: ipfs,
                    price: Number(listing.price),
                    shares: Number(listing.amount),
                    divPerShare: 10,
                    remainingTicketPool: 50
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