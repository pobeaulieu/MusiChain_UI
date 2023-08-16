import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { Listing, MusiChainService, TokenCreation, TokenOwnership, User } from "./interface";
import contractBaseAbi from './contracts/Base.json';
import contractSaleAbi from './contracts/Sale.json';
import contractMetaDataAbi from './contracts/Metadata.json';
import { uploadToIpfs } from "./ipfs";

const web3 = new Web3((window as any).ethereum);

/**
 * We retrieve the address of the contrat deployed on Ganache in the .env file
 * */
const contractMetaDataAddress = process.env.REACT_APP_METADATA_ADDRESS ;
const contractBaseAddress = process.env.REACT_APP_BASE_ADDRESS ;
const contractSaleAddress =process.env.REACT_APP_SALE_ADDRESS ;

/**
 * Creation of the Instance for each contract allowing us to call the methods of the smart contracts
 * */
const contractMetaDataInstance = new web3.eth.Contract(contractMetaDataAbi, contractMetaDataAddress);
const contractBaseInstance = new web3.eth.Contract(contractBaseAbi, contractBaseAddress);
const contractSaleInstance = new web3.eth.Contract(contractSaleAbi, contractSaleAddress);


/**
 * This class deals with all the methods related to the contracts
 */
export class MusiChain implements MusiChain {

    constructor(){
    }

    /**
     * Getter of the connected account through Ganache
     */
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

    /**
     * Methods to create tokens in which we add a Listing too
     * @param creatorAddress
     * @param name
     * @param numShares
     * @param price
     * @param div
     * @param initialTktPool
     * @param mp3
     * @param img
     */
    async createTokens(creatorAddress: string, name: string, numShares: number, price: number, div: number, initialTktPool: number, mp3: File, img: File): Promise<TokenCreation> {
        let divInWeiString = web3.utils.toWei(div, "ether");
        try {
            // At the creation we upload the media to IPFS
            const ipfsPaths = await uploadToIpfs(mp3, img)
            const accounts = await web3.eth.getAccounts();
            const currentAddress = accounts[0];
            const data = web3.utils.asciiToHex('some data');
            let ipfs = String(ipfsPaths.mp3Url.replace('/music.mp3', ''))
            const result = await (contractBaseInstance.methods.mint as any)(name, numShares, ipfs, initialTktPool, divInWeiString, data).send({ from: currentAddress })
            // Those next lines retrieve the ID of the token we just created
            let mintLog = result.logs.find((log: { topics: string[]; }) => log.topics[0] === "0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885");
            let tokenIdHex = mintLog.data.slice(-64);
            let tokenId = web3.utils.hexToNumberString('0x' + tokenIdHex);
            let tokenIdNumber  = Number(tokenId)

            console.log('Creation was successful', result);

            // We add a listing with the token we just created
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

    /**
     * Getter of all the created tokens for a user
     */
    async getCreatedTokens(): Promise<TokenCreation[]> {
        try {
            const accounts = await web3.eth.getAccounts();
            const currentAddress = accounts[0];

            const tokenIds: number[] = await (contractMetaDataInstance.methods.getTokensCreatedBy as any)(currentAddress).call();

            const tokenCreatedList: TokenCreation[] = await Promise.all(
                tokenIds.map(async (tokenId: number) => {
                    try {
                        const name = await (contractMetaDataInstance.methods.tokenNames as any)(tokenId).call();
                        const ipfs = await (contractMetaDataInstance.methods.ipfsPaths as any)(tokenId).call();
                        const numShares = await (contractBaseInstance.methods.getTokenBalance as any)(currentAddress,tokenId).call();
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

    /**
     * This method send the amount specified to each owner of the token
     * @param tokenId
     * @param amount
     */
    async payDividends(tokenId: number, amount: number): Promise<TokenCreation> {
        try {
            const amountWei = web3.utils.toWei(amount.toString(), "ether");
            const amountWeiNum = Number(amountWei)
            const owners = await (contractMetaDataInstance.methods.getTokenOwners as any)(tokenId).call();
            const numberOfOwners = owners.length - 1
            const accounts = await web3.eth.getAccounts();
            const currentAddress = accounts[0];
            const result = await (contractBaseInstance.methods.payDividends as any)(tokenId, amountWei).send({ from: currentAddress, value: numberOfOwners*amountWeiNum})
            console.log('Paiement was successful', result);
            const remainingDividendEligibleTickets = await (contractMetaDataInstance.methods.ticketPools as any)(tokenId).call();
            const divPerShare = await (contractMetaDataInstance.methods.divs as any)(tokenId).call();
            const divInEther = web3.utils.fromWei(divPerShare.toString(), 'ether');
            const divInInt = parseInt(divInEther)
            const ipfs = await (contractMetaDataInstance.methods.ipfsPaths as any)(tokenId).call();
            const numShares = await (contractBaseInstance.methods.getTokenBalance as any)(currentAddress,tokenId).call();
            const name = await (contractMetaDataInstance.methods.tokenNames as any)(tokenId).call();


            return {
                tokenId: tokenId,
                mediaIpfsUrl: ipfs,
                name: name,
                numberSharesCreated: numShares,
                initialTicketPool: remainingDividendEligibleTickets,
                remainingDividendAvailableTickets: remainingDividendEligibleTickets,
                dividendPerShare:  divInInt
            };
        } catch (error) {
            console.error('An error occurred', error);
            throw error;
        }
    }

    /**
     * Getter of all the tokens owned by a user
     */
    async  getOwnedTokens(): Promise<TokenOwnership[]> {
        try {
          const accounts = await web3.eth.getAccounts();
          const currentAddress = accounts[0];

            const tokenIds: number[] = await (contractSaleInstance.methods.getOwnedTokens as any)(currentAddress).call();
            const tokenIds2: number[] = await (contractMetaDataInstance.methods.getOwnedTokens as any)(currentAddress).call();

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

    /**
     * Creation of a listing
     * @param ownerAddress
     * @param tokenId
     * @param price
     * @param amount
     */
    async addListing(ownerAddress: string, tokenId: number, price: number, amount: number): Promise<Listing> {
        let priceInWeiString = web3.utils.toWei(price, "ether"); // Convert to Wei string
        let priceInWeiNumber = parseInt(priceInWeiString);
        try {
            const accounts = await web3.eth.getAccounts();
            const currentAddress = accounts[0];
            // The setApprovalForAll allows other users to buy the token
            await (contractBaseInstance.methods.setApprovalForAll as any)(contractSaleAddress, true).send({ from: currentAddress })
            const result = await (contractSaleInstance.methods.listToken as any)(tokenId, priceInWeiString, amount).send({ from: currentAddress })
            console.log('Transaction was successful', result);
        } catch (error) {
            console.error('An error occurred', error);
        }
        const tokenName = await (contractMetaDataInstance.methods.tokenNames as any)(tokenId).call();
        const creator = await (contractMetaDataInstance.methods.originalCreators as any)(tokenId).call();
        const owner = await (contractMetaDataInstance.methods.getOwnerOfToken as any)(tokenId).call();
        const ipfs = await (contractMetaDataInstance.methods.ipfsPaths as any)(tokenId).call();
        const remainingTicketPool = await (contractMetaDataInstance.methods.ticketPools as any)(tokenId).call();
        const divPerShare = await (contractMetaDataInstance.methods.divs as any)(tokenId).call();
        const divInEther = web3.utils.fromWei(divPerShare.toString(), 'ether');
        const listingId = await (contractSaleInstance.methods.currentListingId as any)().call();

        return {
            listingId: listingId,
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

    /**
     * Remove a listing
     * @param listingId
     */
    async removeListing(listingId: number): Promise<Listing> {
        const listing = await (contractSaleInstance.methods.listings as any)(listingId).call();
        const tokenId = listing.tokenId
        try {
            const accounts = await web3.eth.getAccounts();
            const currentAddress = accounts[0];
            const result = await (contractSaleInstance.methods.removeListing as any)(listingId).send({ from: currentAddress });

            console.log('Transaction was successful', result);
        } catch (error) {
            console.error('An error occurred', error);
        }
        const tokenName = await (contractMetaDataInstance.methods.tokenNames as any)(tokenId).call();
        const creator = await (contractMetaDataInstance.methods.originalCreators as any)(tokenId).call();
        const owner = await (contractMetaDataInstance.methods.getOwnerOfToken as any)(tokenId).call();
        const ipfs = await (contractMetaDataInstance.methods.ipfsPaths as any)(tokenId).call();
        const remainingDividendEligibleTickets = await (contractMetaDataInstance.methods.ticketPools as any)(tokenId).call();
        const divPerShare = await (contractMetaDataInstance.methods.divs as any)(tokenId).call();
        const divInEther = web3.utils.fromWei(divPerShare.toString(), 'ether');

        return {
            listingId: listingId,
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

    /**
     * Getter of all listings created by a user
     */
    async getUserListings(): Promise<Listing[]> {
        try {
            const accounts = await web3.eth.getAccounts();
            const currentAddress = accounts[0];
            const result = await (contractSaleInstance.methods.getListingsByUser as any)(currentAddress).call({ from: currentAddress });

            const listings: Listing[] = [];
            for (let listing of result) {
                const tokenId = Number(listing.tokenId);
                const listingId = Number(listing.listingId);
                const tokenName = await (contractMetaDataInstance.methods.tokenNames as any)(tokenId).call();
                const creator = await (contractMetaDataInstance.methods.originalCreators as any)(tokenId).call();
                const owner = await (contractMetaDataInstance.methods.getOwnerOfToken as any)(tokenId).call();
                const ipfs = await (contractMetaDataInstance.methods.ipfsPaths as any)(tokenId).call();
                const priceInEther = web3.utils.fromWei(listing.price.toString(), 'ether');
                const remainingDividendEligibleTickets = await (contractMetaDataInstance.methods.ticketPools as any)(tokenId).call();
                const divPerShare = await (contractMetaDataInstance.methods.divs as any)(tokenId).call();
                const divInEther = web3.utils.fromWei(divPerShare.toString(), 'ether');

                listings.push({
                    listingId: listingId,
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

    /**
     * Method to buy a token listed by another user
     * @param listingId
     * @param amount
     * @param price
     */
    async buy(listingId: number, amount: number, price: number): Promise<TokenOwnership> {
        const listing = await (contractSaleInstance.methods.listings as any)(listingId).call();
        const tokenId = listing.tokenId
        try {
            const accounts = await web3.eth.getAccounts();
            const tokenName = await (contractMetaDataInstance.methods.tokenNames as any)(tokenId).call();
            const currentAddress = accounts[0];
            const result = await (contractSaleInstance.methods.buyToken as any)(listingId, amount).send({from: currentAddress, value: web3.utils.toWei(price.toString(), "ether")})
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

    /**
     * Getter of all the listings created
     */
    async getMarketListings(): Promise<Listing[]> {
        try {
            const result = await (contractSaleInstance.methods.getAllListings as any)().call();
            const listings: Listing[] = [];
            for (let listing of result) {
                const tokenId = Number(listing.tokenId);
                const listingId = Number(listing.listingId);
                const tokenName = await (contractMetaDataInstance.methods.tokenNames as any)(tokenId).call();
                const creator = await (contractMetaDataInstance.methods.originalCreators as any)(tokenId).call();
                const owner = await (contractMetaDataInstance.methods.getOwnerOfToken as any)(tokenId).call();
                const ipfs = await (contractMetaDataInstance.methods.ipfsPaths as any)(tokenId).call();
                const priceInEther = web3.utils.fromWei(listing.price.toString(), 'ether');
                const remainingTicketPool = await (contractMetaDataInstance.methods.ticketPools as any)(tokenId).call();
                const divPerShare = await (contractMetaDataInstance.methods.divs as any)(tokenId).call();
                const divInEther = web3.utils.fromWei(divPerShare.toString(), 'ether');

                listings.push({
                    listingId: listingId,
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