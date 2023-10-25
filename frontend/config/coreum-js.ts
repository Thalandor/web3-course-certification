const { Client } = require("coreum-js");

export default async function createCoreumClient(network: string ) {

    // Init the client and target the testnet network:
    const coreum = new Client({ network: network }); // Other values are "devnet" and "mainnet"

    // Access the private key of the mnemonic.
    await coreum.connectWithMnemonic(process.env.MNEMONIC);

    return coreum;
}


