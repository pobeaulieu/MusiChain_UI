import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { Listing, Service, TokenCreation, TokenOwnership, User } from "./interface";
import { getMusicMediaById } from "./musicMedia/MusicMediaCache";
import contractBaseAbi from './contracts/Base.json';
import contractSaleAbi from './contracts/Sale.json';
import { uploadToIpfs } from "./ipfs";

const web3 = new Web3((window as any).ethereum);
const contractBaseAddress = "0x9490a534E10358E30d722c9CB7A92f8Cdb280608";
const contractBaseInstance = new web3.eth.Contract(contractBaseAbi, contractBaseAddress);

const contractSaleAddress = "0x412D6fa069f26fA811412666F81f8FdA3E273dF7" ;
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
                musicMedia: getMusicMediaById(1),
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

    getCreatedTokens(creatorAddress: string): TokenCreation[] {
        // Implement your mock logic here
        return [
            {
                tokenId: 1,
                musicMedia: getMusicMediaById(1),
                name: 'Token Name',
                numberSharesCreated: 10,
                initialTicketPool: 100,
                remainingDividendAvailableTickets: 65,
                dividendPerShare:  0.005
            },
            {
                tokenId: 2,
                musicMedia: getMusicMediaById(2),
                name: 'Token Name',
                numberSharesCreated: 20,
                initialTicketPool: 100,
                remainingDividendAvailableTickets: 54,
                dividendPerShare:  0.005
            },
            {
                tokenId: 1,
                musicMedia: getMusicMediaById(1),
                name: 'Token Name',
                numberSharesCreated: 10,
                initialTicketPool: 100,
                remainingDividendAvailableTickets: 65,
                dividendPerShare:  0.005
            },
            {
                tokenId: 2,
                musicMedia: getMusicMediaById(2),
                name: 'Token Name',
                numberSharesCreated: 20,
                initialTicketPool: 100,
                remainingDividendAvailableTickets: 54,
                dividendPerShare:  0.005
            },
            {
                tokenId: 1,
                musicMedia: getMusicMediaById(1),
                name: 'Token Name',
                numberSharesCreated: 10,
                initialTicketPool: 100,
                remainingDividendAvailableTickets: 65,
                dividendPerShare:  0.005
            },
            {
                tokenId: 2,
                musicMedia: getMusicMediaById(2),
                name: 'Token Name',
                numberSharesCreated: 20,
                initialTicketPool: 100,
                remainingDividendAvailableTickets: 54,
                dividendPerShare:  0.005
            },
            {
                tokenId: 1,
                musicMedia: getMusicMediaById(1),
                name: 'Token Name',
                numberSharesCreated: 10,
                initialTicketPool: 100,
                remainingDividendAvailableTickets: 65,
                dividendPerShare:  0.005
            },
            {
                tokenId: 2,
                musicMedia: getMusicMediaById(2),
                name: 'Token Name',
                numberSharesCreated: 20,
                initialTicketPool: 100,
                remainingDividendAvailableTickets: 54,
                dividendPerShare:  0.005
            },
            {
                tokenId: 1,
                musicMedia: getMusicMediaById(1),
                name: 'Token Name',
                numberSharesCreated: 10,
                initialTicketPool: 100,
                remainingDividendAvailableTickets: 65,
                dividendPerShare:  0.005
            },
            {
                tokenId: 2,
                musicMedia: getMusicMediaById(2),
                name: 'Token Name',
                numberSharesCreated: 20,
                initialTicketPool: 100,
                remainingDividendAvailableTickets: 54,
                dividendPerShare:  0.005
            },
            {
                tokenId: 1,
                musicMedia: getMusicMediaById(1),
                name: 'Token Name',
                numberSharesCreated: 10,
                initialTicketPool: 100,
                remainingDividendAvailableTickets: 65,
                dividendPerShare:  0.005
            },
            {
                tokenId: 2,
                musicMedia: getMusicMediaById(2),
                name: 'Token Name',
                numberSharesCreated: 20,
                initialTicketPool: 100,
                remainingDividendAvailableTickets: 54,
                dividendPerShare:  0.005
            }
        ];
    }

    payDividends(creatorAddress: string, tokenId: number, numberOfTickets: number): TokenCreation[] {
        throw new Error("Method not implemented.");
    }

    async  getOwnedTokens(): Promise<TokenOwnership[]> {
        try {
          const accounts = await web3.eth.getAccounts();
          const currentAddress = accounts[0];

          const tokenIds: number[] = await (contractBaseInstance.methods.getOwnedTokens as any)(currentAddress).call({ from: currentAddress });

            const tokenOwnershipList: TokenOwnership[] = await Promise.all(
            tokenIds.map(async (tokenId: number) => {
              try {
                const name = await (contractBaseInstance.methods.tokenNames as any)(tokenId).call();
                const ipfs = await (contractBaseInstance.methods.ipfsPaths as any)(tokenId).call();
                const remainingDividendEligibleTickets = 0;
                const divPerShare = 0;
                const musicMedia = getMusicMediaById(1);

                return {
                  tokenId: tokenId,
                  musicMedia: musicMedia,
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
            musicMedia: getMusicMediaById(1),
            price: price,
            shares: amount,
            div: 0.005,
            remainingTicketPool: 50000
        };
    }

    removeListing(ownerAddress: string, tokenId: number, price: number, amount: number): Listing {
        throw new Error("Method not implemented.");
    }


    getUserListings(ownerAddress: string): Listing[] {
        // Implement your mock logic here
        return [
            {
                tokenId: 1,
                tokenName: "This is a name",
                creator:"0xEBe80D3bCfD63698a3A332D9Aad920b44Db70323",
                owner: "0x23A9d1498E445f66C98D771eBb8Bf9FA3478FF20",
                musicMedia: getMusicMediaById(1),
                price: 0.04,
                shares: 1000,
                div: 0.005,
                remainingTicketPool: 50000
            },
            {
                tokenId: 1,
                tokenName: "This is a name",
                creator:"0xEBe80D3bCfD63698a3A332D9Aad920b44Db70323",
                owner: "0x23A9d1498E445f66C98D771eBb8Bf9FA3478FF20",
                musicMedia: getMusicMediaById(1),
                price: 0.04,
                shares: 1000,
                div: 0.005,
                remainingTicketPool: 50000
            },
            {
                tokenId: 1,
                tokenName: "This is a name",
                creator:"0xEBe80D3bCfD63698a3A332D9Aad920b44Db70323",
                owner: "0x23A9d1498E445f66C98D771eBb8Bf9FA3478FF20",
                musicMedia: getMusicMediaById(1),
                price: 0.04,
                shares: 1000,
                div: 0.005,
                remainingTicketPool: 50000
            },
            {
                tokenId: 1,
                tokenName: "This is a name",
                creator:"0xEBe80D3bCfD63698a3A332D9Aad920b44Db70323",
                owner: "0x23A9d1498E445f66C98D771eBb8Bf9FA3478FF20",
                musicMedia: getMusicMediaById(1),
                price: 0.04,
                shares: 1000,
                div: 0.005,
                remainingTicketPool: 50000
            },
            {
                tokenId: 1,
                tokenName: "This is a name",
                creator:"0xEBe80D3bCfD63698a3A332D9Aad920b44Db70323",
                owner: "0x23A9d1498E445f66C98D771eBb8Bf9FA3478FF20",
                musicMedia: getMusicMediaById(1),
                price: 0.04,
                shares: 1000,
                div: 0.005,
                remainingTicketPool: 50000
            },
            {
                tokenId: 1,
                tokenName: "This is a name",
                creator:"0xEBe80D3bCfD63698a3A332D9Aad920b44Db70323",
                owner: "0x23A9d1498E445f66C98D771eBb8Bf9FA3478FF20",
                musicMedia: getMusicMediaById(1),
                price: 0.04,
                shares: 1000,
                div: 0.005,
                remainingTicketPool: 50000
            },
            {
                tokenId: 1,
                tokenName: "This is a name",
                creator:"0xEBe80D3bCfD63698a3A332D9Aad920b44Db70323",
                owner: "0x23A9d1498E445f66C98D771eBb8Bf9FA3478FF20",
                musicMedia: getMusicMediaById(1),
                price: 0.04,
                shares: 1000,
                div: 0.005,
                remainingTicketPool: 50000
            },
            {
                tokenId: 1,
                tokenName: "This is a name",
                creator:"0xEBe80D3bCfD63698a3A332D9Aad920b44Db70323",
                owner: "0x23A9d1498E445f66C98D771eBb8Bf9FA3478FF20",
                musicMedia: getMusicMediaById(1),
                price: 0.04,
                shares: 1000,
                div: 0.005,
                remainingTicketPool: 50000
            },
            {
                tokenId: 1,
                tokenName: "This is a name",
                creator:"0xEBe80D3bCfD63698a3A332D9Aad920b44Db70323",
                owner: "0x23A9d1498E445f66C98D771eBb8Bf9FA3478FF20",
                musicMedia: getMusicMediaById(1),
                price: 0.04,
                shares: 1000,
                div: 0.005,
                remainingTicketPool: 50000
            }
        ];
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
                musicMedia: getMusicMediaById(1),
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
                const musicMedia = getMusicMediaById(1);

                listings.push({
                    tokenId: tokenId,
                    tokenName: tokenName,
                    creator: creator,
                    owner: owner,
                    musicMedia: musicMedia,
                    price: Number(listing.price),
                    shares: Number(listing.amount),
                    div: 10,
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
    async getOwnedTokenstest(contractAddress: string, ownerAddress: string): Promise<string[]> {
        try {
            const result = await (contractSaleInstance.methods.getOwnedTokens as any)(contractAddress, ownerAddress).call();
            console.log('Transaction was successful', result);
    
            // Convert the BigNumber token IDs to strings
            const tokenIds = result.map((tokenId: any) => tokenId.toString());
    
            return tokenIds;
        } catch (error) {
            console.error('An error occurred', error);
            return [];
        }
    }
      
   
    
}