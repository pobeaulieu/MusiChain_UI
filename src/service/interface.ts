
export class User{
    address: string; //etherum address of the user

    constructor(address: string){
        this.address = address
    }
}

export interface MusicMedia {
    id: number;
    song:  any;
    image:  any;
}

export interface Listing{
    tokenId: number
    tokenName: string
    creator: string
    owner: string
    musicMedia: MusicMedia
    price: number,
    shares: number,
    div:number,
    remainingTicketPool: number
}

export interface TokenOwnership{
    tokenId: number,
    musicMedia: MusicMedia
    name: string,
    numberSharesOwned: number,
    remainingDividendEligibleTickets: number, 
    divPerShare: number,
}

export interface TokenCreation{
    tokenId: number, 
    musicMedia: MusicMedia
    name: string, 
    numberSharesCreated: number
    initialTicketPool: number,
    remainingDividendAvailableTickets: number,
    dividendPerShare: number,
}

export interface Service {
    // function to get connected account from metamask and return the user with the account address of the account 
    getConnectedAccount():Promise<User>

    // Create Page - Artist creates a token from the Creation Page. This method also creates a listing
    createTokens(creatorAddress:string, name:string, numShares:number, price:number, div:number, initialTktPool: number, mp3:File, img:File): TokenCreation;
    // Create Page - Artist visualizes the tokens he previously created
    getCreatedTokens(creatorAddress: string): TokenCreation[];

    // My Tokens Page - User sees the tokens he owns
    getOwnedTokens(creatorAddress: string): TokenOwnership[];
    // My Tokens Page - User adds a listing for a token he owns
    addListing(ownerAddress: string, tokenId: number, price: number, amount: number): Listing   
    // My Tokens Page - User removes a listing for a token he previously created
    removeListing(ownerAddress: string, tokenId: number, price: number, amount: number): Listing   

    // My Tokens Page - User sees the listings he created 
    getUserListings(ownerAddress: string): Listing[]

    // MarketPage - User sees all the active listing created by other users
    getMarketListings(): Listing[]
    // MarketPage - User buys from a listing created by another user
    buy(tokenId: number, buyerAddress: string, sellerAddress: string, amount: number, price: number): TokenOwnership

}




