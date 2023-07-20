import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { Listing, Service, TokenCreation, TokenOwnership, User } from "./interface";
import { getMusicMediaById } from "./musicMedia/MusicMediaCache";
import contractBaseAbi from './contracts/Base.json';
import contractSaleAbi from './contracts/Sale.json';

const web3 = new Web3((window as any).ethereum);
const contractBaseAddress = "0x74bDBcB22C4a05529B20B2EA56D2EB801D990E2e";
const contractBaseInstance = new web3.eth.Contract(contractBaseAbi, contractBaseAddress);

const contractSaleAddress = "0xf19ebaBd620Ee3AcB2f96142dD612734FE4D14D2" ;
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
            const accounts = await web3.eth.getAccounts();
            const currentAddress = accounts[0];
            const data = web3.utils.asciiToHex('some data');
            const result = await (contractBaseInstance.methods.mint as any)(name, numShares, data).send({ from: currentAddress });
            let mintLog = result.logs.find((log: { topics: string[]; }) => log.topics[0] === "0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885");
            let tokenIdHex = mintLog.data.slice(-64);
            let tokenId = web3.utils.hexToNumberString('0x' + tokenIdHex);
            let tokenIdNumber  = Number(tokenId)
            console.log("Token ID:", tokenId);
            console.log('Transaction was successful', result);

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


    getOwnedTokens(creatorAddress: string): TokenOwnership[] {
        // Implement your mock logic here
        return [
            {
                tokenId: 1,
                musicMedia: getMusicMediaById(1),
                name: 'Token Name',
                numberSharesOwned: 5,
                remainingDividendEligibleTickets: 5,
                divPerShare: 0.005
            },
            {
                tokenId: 2,
                musicMedia: getMusicMediaById(2),
                name: 'Token Name',
                numberSharesOwned: 5,
                remainingDividendEligibleTickets: 5,
                divPerShare: 0.005
            },
            {
                tokenId: 1,
                musicMedia: getMusicMediaById(1),
                name: 'Token Name',
                numberSharesOwned: 5,
                remainingDividendEligibleTickets: 5,
                divPerShare: 0.005
            },
            {
                tokenId: 2,
                musicMedia: getMusicMediaById(2),
                name: 'Token Name',
                numberSharesOwned: 5,
                remainingDividendEligibleTickets: 5,
                divPerShare: 0.005
            },
            {
                tokenId: 1,
                musicMedia: getMusicMediaById(1),
                name: 'Token Name',
                numberSharesOwned: 5,
                remainingDividendEligibleTickets: 5,
                divPerShare: 0.005
            },
            {
                tokenId: 2,
                musicMedia: getMusicMediaById(2),
                name: 'Token Name',
                numberSharesOwned: 5,
                remainingDividendEligibleTickets: 5,
                divPerShare: 0.005
            },
        ];
    }

    async addListing(ownerAddress: string, tokenId: number, price: number, amount: number): Promise<Listing> {
        // Implement your mock logic here

        try {
            const accounts = await web3.eth.getAccounts();
            const currentAddress = accounts[0];
            const tokenID = 1
            const result = await (contractSaleInstance.methods.listToken as any)(tokenID, price, amount).send({ from: currentAddress });

            console.log('Transaction was successful', result);
        } catch (error) {
            console.error('An error occurred', error);
        }
        return {
            tokenId: 1,
            tokenName: "This is a name",
            creator:"0xEBe80D3bCfD63698a3A332D9Aad920b44Db70323",
            owner: "0x23A9d1498E445f66C98D771eBb8Bf9FA3478FF20",
            musicMedia: getMusicMediaById(1),
            price: 10,
            shares: 100,
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

    async getMarketListings(): Promise<Listing[]> {
        try {
            const result = await (contractSaleInstance.methods.getListings as any)().call();
            console.log('Transaction was successful', result);

            // const listings = result.map((listing: any) => ({
            //     tokenId: Number(listing.tokenId),
            //     tokenName: listing.tokenName,
            //     creator: listing.creator,
            //     owner: listing.owner,
            //     musicMedia: getMusicMediaById(Number(listing.musicMedia)),
            //     price: Number(listing.price),
            //     shares: Number(listing.amount),
            //     div: Number(listing.div),
            //     remainingTicketPool: Number(listing.remainingTicketPool)
            // }));
            const listings = result.map((listing: any) => ({
                tokenId: Number(listing.tokenId),
                tokenName: "Exemple",
                creator: "0x0000",
                owner: "0x111111",
                musicMedia: 1,
                price: Number(listing.price),
                shares: Number(listing.amount),
                div: 10,
                remainingTicketPool: 50
            }));


            return listings;
        } catch (error) {
            console.error('An error occurred', error);
            return [];
        }
    }

    async buy(tokenId: number, buyerAddress: string, sellerAddress: string, amount: number, price: number): Promise<TokenOwnership> {
        // Implement your mock logic here
        try {
            const accounts = await web3.eth.getAccounts();
            const currentAddress = accounts[0];
            const result = await (contractSaleInstance.methods.buyToken as any)(0).send({ from: currentAddress });

            console.log('Transaction was successful', result);
        } catch (error) {
            console.error('An error occurred', error);
        }

        return {
            tokenId: 1,
            musicMedia: getMusicMediaById(1),
            name: 'Token Name',
            numberSharesOwned: 5,
            remainingDividendEligibleTickets: 5,
            divPerShare: 0.005
        };
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