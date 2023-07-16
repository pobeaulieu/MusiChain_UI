import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { Listing, Service, TokenCreation, TokenOwnership, User } from "./interface";
import { getMusicMediaById } from "./MusicMedia/MusicMediaCache";

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

    createTokens(creatorAddress: string, name: string, numShares: number, price: number, div: number, initialTktPool: number, mp3: File, img: File): TokenCreation {
        // Implement your mock logic here
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

    addListing(ownerAddress: string, tokenId: number, price: number, amount: number): Listing {
        // Implement your mock logic here
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