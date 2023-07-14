import { Listing, Service, TokenCreation, TokenOwnership } from "./interface";
import { getMusicMediaById } from "./musicMedia/MusicMediaCache";

export class Mock implements Service {

    constructor(){

    }

    createTokens(creatorAddress: string, name: string, numShares: number, price: number, div: number, initialTktPool: number, mp3: File, img: File): TokenCreation {
        // Implement your mock logic here
        return {
            tokenId: 1,
            musicMedia: getMusicMediaById(1),
            name: 'Token Name',
            numberSharesCreated: 10,
            initialTicketPool: 100,
            remainingDividendAvailableTickets: 100,
            dividendPerShare: 0.01
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
                dividendPerShare: 0.01
            },
            {
                tokenId: 2,
                musicMedia: getMusicMediaById(2),
                name: 'Token Name',
                numberSharesCreated: 20,
                initialTicketPool: 100,
                remainingDividendAvailableTickets: 54,
                dividendPerShare: 0.01
            }
        ];
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
            }
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
            div:0.1,
            remainingTicketPool: 50000
        };
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
                price: 10,
                shares: 1000,
                div:0.1,
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
                price: 10,
                shares: 100,
                div:0.1,
                remainingTicketPool: 50000
            },
            {
                tokenId: 2,
                tokenName: "Time",
                creator:"0xEBe80D3bCfD63698a3A332D9Aad920b44Db70323",
                owner: "0x23A9d1498E445f66C98D771eBb8Bf9FA3478FF20",
                musicMedia: getMusicMediaById(2),
                price: 10,
                shares: 100,
                div:0.1,
                remainingTicketPool: 50000
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