
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
    // getConnectedAccount retrieves all connected account from metamask 
    // and return the user with the first account address in the extension
    getConnectedAccount():Promise<User>

    // ------------------      Creator Page  -----------------------------
    // createTokens creates a token with the user address set as creator address. 
    // This method mints tokens to the creator address. 
    // This method also creates a listing with the seller address set as creator address. 
    createTokens(creatorAddress:string, name:string, numShares:number, price:number, div:number, initialTktPool: number, mp3:File, img:File): TokenCreation;

    // getCreatedTokens retrieves all the tokens an artist previously created
    getCreatedTokens(creatorAddress: string): TokenCreation[];
     
     // ------------------   My Tokens Page ------------------------
    // getOwnedTokens retrieves all the tokens a user owns
    getOwnedTokens(creatorAddress: string): TokenOwnership[];
   
    // addListing adds a listing for a token a user owns
    addListing(ownerAddress: string, tokenId: number, price: number, amount: number): Listing   
   
    // removeListing removes a listing for a token a user previously created
    removeListing(ownerAddress: string, tokenId: number, price: number, amount: number): Listing   
    
    // getUserListings retrieves all the listing created from the address provided
    getUserListings(ownerAddress: string): Listing[]

    //------------------   Market Page  --------------------------
    // getMarketListings retrieves all the active listing created by other users
    getMarketListings(): Listing[]

    // buy to buy from a listing created by another user
    buy(tokenId: number, buyerAddress: string, sellerAddress: string, amount: number, price: number): TokenOwnership

}



