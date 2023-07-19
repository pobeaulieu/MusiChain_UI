import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { Listing, Service, TokenCreation, TokenOwnership, User } from "./interface";
import { getMusicMediaById } from "./musicMedia/MusicMediaCache";
import contractBaseAbi from './contracts/Base.json';
import contractSaleAbi from './contracts/Sale.json';

const web3 = new Web3((window as any).ethereum);
const contractBaseAddress = "0x38d2aCA3d05Eb715381142Ed91E8D55EA9CCcabF";
const contractBaseInstance = new web3.eth.Contract(contractBaseAbi, contractBaseAddress);
const creatorAddress = "74c58A723c45c6269fC7A8afaDb6C46EfB25944d" ;
const contractSaleAddress = "0xcf87D49A4F27E3C315fEb28f05AedE7b69041731" ;
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
            const tokenID = 1
            const result = await (contractBaseInstance.methods.mint as any)(tokenID, numShares, data).send({ from: currentAddress });

            console.log('Transaction was successful', result);
        } catch (error) {
            console.error('An error occurred', error);
        }

        return {
            tokenId: 1,
            musicMedia: getMusicMediaById(1),
            name: 'Token Name',
            numberSharesCreated: 10,
            initialTicketPool: 100,
            remainingDividendAvailableTickets: 100,
            dividendPerShare:  0.005
        };
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


    async  getOwnedTokens(creatorAddress: string): Promise<TokenOwnership[]> {
        try {
       
          const accounts = await web3.eth.getAccounts();
      
          
          const tokenOwnershipData = [];
      
          // Example token ownership data
          tokenOwnershipData.push({
            tokenId: 1,
            musicMedia: getMusicMediaById(1),
            name: 'Token Name',
            numberSharesOwned: 5,
            remainingDividendEligibleTickets: 5,
            divPerShare: 0.005,
          });
          tokenOwnershipData.push({
            tokenId: 2,
            musicMedia: getMusicMediaById(2),
            name: 'Token Name',
            numberSharesOwned: 5,
            remainingDividendEligibleTickets: 5,
            divPerShare: 0.005,
          });
      
          console.log('Token ownership data:', tokenOwnershipData);
      
          // Retrieve only the token IDs owned by the creatorAddress
          const tokenIdsOwnedByCreator = tokenOwnershipData
            .filter(token => token.musicMedia.creatorAddress === creatorAddress)
            .map(token => token.tokenId);
      
          console.log('Token IDs owned by the creator:', tokenIdsOwnedByCreator);
      
          return tokenOwnershipData;
        } catch (error) {
          console.error('An error occurred', error);
          throw error;
        }
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

    getMarketListings(): Listing[] {
        // Implement your mock logic here
        return [
            {
                tokenId: 1,
                tokenName: "Name",
                creator:"0xEBe80D3bCfD63698a3A332D9Aad920b44Db70323",
                owner: "0x23A9d1498E445f66C98D771eBb8Bf9FA3478FF20",
                musicMedia: getMusicMediaById(1),
                price: 0.04,
                shares: 100,
                div: 0.005,
                remainingTicketPool: 50000
            },
            {
                tokenId: 2,
                tokenName: "Time",
                creator:"0xEBe80D3bCfD63698a3A332D9Aad920b44Db70323",
                owner: "0x23A9d1498E445f66C98D771eBb8Bf9FA3478FF20",
                musicMedia: getMusicMediaById(2),
                price: 0.023,
                shares: 200,
                div: 0.0015,
                remainingTicketPool: 20000
            },
            {
                tokenId: 1,
                tokenName: "Name",
                creator:"0xEBe80D3bCfD63698a3A332D9Aad920b44Db70323",
                owner: "0x23A9d1498E445f66C98D771eBb8Bf9FA3478FF20",
                musicMedia: getMusicMediaById(1),
                price: 0.04,
                shares: 100,
                div: 0.005,
                remainingTicketPool: 50000
            },
            {
                tokenId: 2,
                tokenName: "Time",
                creator:"0xEBe80D3bCfD63698a3A332D9Aad920b44Db70323",
                owner: "0x23A9d1498E445f66C98D771eBb8Bf9FA3478FF20",
                musicMedia: getMusicMediaById(2),
                price: 0.023,
                shares: 200,
                div: 0.0015,
                remainingTicketPool: 20000
            },
            {
                tokenId: 1,
                tokenName: "Name",
                creator:"0xEBe80D3bCfD63698a3A332D9Aad920b44Db70323",
                owner: "0x23A9d1498E445f66C98D771eBb8Bf9FA3478FF20",
                musicMedia: getMusicMediaById(1),
                price: 0.04,
                shares: 100,
                div: 0.005,
                remainingTicketPool: 50000
            },
            {
                tokenId: 2,
                tokenName: "Time",
                creator:"0xEBe80D3bCfD63698a3A332D9Aad920b44Db70323",
                owner: "0x23A9d1498E445f66C98D771eBb8Bf9FA3478FF20",
                musicMedia: getMusicMediaById(2),
                price: 0.023,
                shares: 200,
                div: 0.0015,
                remainingTicketPool: 20000
            },
            {
                tokenId: 1,
                tokenName: "Name",
                creator:"0xEBe80D3bCfD63698a3A332D9Aad920b44Db70323",
                owner: "0x23A9d1498E445f66C98D771eBb8Bf9FA3478FF20",
                musicMedia: getMusicMediaById(1),
                price: 0.04,
                shares: 100,
                div: 0.005,
                remainingTicketPool: 50000
            },
            {
                tokenId: 2,
                tokenName: "Time",
                creator:"0xEBe80D3bCfD63698a3A332D9Aad920b44Db70323",
                owner: "0x23A9d1498E445f66C98D771eBb8Bf9FA3478FF20",
                musicMedia: getMusicMediaById(2),
                price: 0.023,
                shares: 200,
                div: 0.0015,
                remainingTicketPool: 20000
            },
            {
                tokenId: 1,
                tokenName: "Name",
                creator:"0xEBe80D3bCfD63698a3A332D9Aad920b44Db70323",
                owner: "0x23A9d1498E445f66C98D771eBb8Bf9FA3478FF20",
                musicMedia: getMusicMediaById(1),
                price: 0.04,
                shares: 100,
                div: 0.005,
                remainingTicketPool: 50000
            },
            {
                tokenId: 2,
                tokenName: "Time",
                creator:"0xEBe80D3bCfD63698a3A332D9Aad920b44Db70323",
                owner: "0x23A9d1498E445f66C98D771eBb8Bf9FA3478FF20",
                musicMedia: getMusicMediaById(2),
                price: 0.023,
                shares: 200,
                div: 0.0015,
                remainingTicketPool: 20000
            }
        ];
    }

    buy(tokenId: number, buyerAddress: string, sellerAddress: string, amount: number, price: number): TokenOwnership {
        // Implement your mock logic here
        return {
            tokenId: 1,
            musicMedia: getMusicMediaById(1),
            name: 'Token Name',
            numberSharesOwned: 5,
            remainingDividendEligibleTickets: 5,
            divPerShare: 0.005
        };
    }
}