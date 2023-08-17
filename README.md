# Demo
https://www.youtube.com/watch?v=jV2Ez_j8w_0&ab_channel=Pier-OlivierBeaulieu 

## Getting Started
- `npm install`
- Windows-> `npm run start`
- Unix-> `npm run startu`

## Environment Setup: Ganache and Metamask Connection

### Metamask Account Creation
1. Create a Metamask account.
2. Obtain the seed phrase associated with the Metamask wallet.

### Ganache Workspace Setup
1. Create a new Ganache workspace.
2. Provide the Metamask wallet's seed phrase during Ganache setup.

### Adding Test Network to Metamask
1. Open Metamask.
2. Add a custom network with the following details:
    - Network Name: Test Network
    - New RPC URL: http://localhost:7545
    - Chain ID: 1337
    - Currency Symbol: ETH

Now, the test accounts from Ganache should be accessible through Metamask.
