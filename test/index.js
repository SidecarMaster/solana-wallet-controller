const solanaWeb3 = require('@solana/web3.js');
var assert = require('assert');
const Solana = require('../src/index')
const {
    HD_WALLET_12_MNEMONIC,
    SOLANA_NETWORK: {
        MAINNET,
        DEVNET,
        TESTNET
    },
    TRANSACTION_TYPE: { NATIVE_TRANSFER,
        TOKEN_TRANSFER,
        CONTRACT_TRANSACTION,
        MINT_NEW_TOKEN
    },
    CONTRACT_TRANSACTION_PARAM: {
        PROGRAM_ACCOUNT_KEY,
        PROGRAM_ID,
        BUFFER_DATA
    },
    TRANSFER_SOL: {
        SOL_RECEIVER,
        SOL_AMOUNT
    },
    TRANSFER_TOKEN: {
        TOKEN_RECEIVER,
        EMPTY_TOKEN_RECEIVER,
        TOKEN_AMOUNT,
        TOKEN_MEMO,
        TOKEN_ADDRESS,
        CHECK_FOR_EMPTY_RECEIVER,
        NO_CHECK_FOR_EMPTY_RECEIVER
    },
    MINT_TOKEN: {
        MINT_AMOUNT,
        MINT_DECIMAL
    }
} = require('./constants')

const CONTRACT_TXN_PARAM = {
    transaction: {
        data: {
            programAccountKey: PROGRAM_ACCOUNT_KEY,
            programId: PROGRAM_ID,
            bufferData: BUFFER_DATA
        }, txnType: CONTRACT_TRANSACTION
    },
    connectionUrl: DEVNET
}

const SOL_TXN_PARAM = {
    transaction: {
        data: {
            to: SOL_RECEIVER,
            amount: SOL_AMOUNT,
        }, txnType: NATIVE_TRANSFER
    },
    connectionUrl: DEVNET
}

const TOKEN_TXN_PARAM = {
    transaction: {
        data: {
            to: TOKEN_RECEIVER,
            amount: TOKEN_AMOUNT,
            memo: TOKEN_MEMO,
            token: TOKEN_ADDRESS,
            overrideDestinationCheck: CHECK_FOR_EMPTY_RECEIVER,
        }, txnType: TOKEN_TRANSFER
    },
    connectionUrl: DEVNET
}

const MINT_NEW_TOKEN_PARAM = {
    transaction: {
        data: {
            amount: MINT_AMOUNT,
            decimals: MINT_DECIMAL,
        }, txnType: MINT_NEW_TOKEN
    },
    connectionUrl: DEVNET
}

const getConnection = (network) => {
    const connection = new solanaWeb3.Connection(network, "confirmed")
    return connection;
}

describe('Initialize wallet ', () => {
    const solWallet = new Solana(HD_WALLET_12_MNEMONIC)

    it("Should have correct mnemonic", () => {
        assert.equal(solWallet.mnemonic, HD_WALLET_12_MNEMONIC, "Incorrect hd wallet")
    })

    it("Should generateWallet ", async () => {
        assert(solWallet.address === null)
        const wallet = await solWallet.generateWallet()
        assert(solWallet.address !== null)
    })

    it("Should sign SOL transfer transaction ", async () => {
        assert.equal(solWallet.mnemonic, HD_WALLET_12_MNEMONIC, "Incorrect hd wallet")
        assert(solWallet.address !== null)

        const wallet = await solWallet.signTransaction(SOL_TXN_PARAM.transaction, SOL_TXN_PARAM.connectionUrl)

        const stringWall = wallet.signedTransaction.toString('hex')
        const stringBuff = Buffer.from(stringWall, 'hex')

        const connection = getConnection(SOL_TXN_PARAM.connectionUrl)
        const transactionDetails = await connection.sendRawTransaction(wallet.signedTransaction)

        console.log("SOL Transfer transaction hash: ", transactionDetails)
    })

    it("Should sign contract transaction ", async () => {
        assert.equal(solWallet.mnemonic, HD_WALLET_12_MNEMONIC, "Incorrect hd wallet")
        assert(solWallet.address !== null)

        const wallet = await solWallet.signTransaction(CONTRACT_TXN_PARAM.transaction, CONTRACT_TXN_PARAM.connectionUrl)

        const stringWall = wallet.signedTransaction.toString('hex')
        const stringBuff = Buffer.from(stringWall, 'hex')

        const connection = getConnection(SOL_TXN_PARAM.connectionUrl)
        const transactionDetails = await connection.sendRawTransaction(wallet.signedTransaction)

        console.log("Contract transaction hash: ", transactionDetails)
    })

    it("Sign token transfer transaction", async () => {
        const wallet = await solWallet.signTransaction(TOKEN_TXN_PARAM.transaction, TOKEN_TXN_PARAM.connectionUrl)

        const stringWall = wallet.signedTransaction.toString('hex')
        const stringBuff = Buffer.from(stringWall, 'hex')

        const connection = getConnection(SOL_TXN_PARAM.connectionUrl)
        const transactionDetails = await connection.sendRawTransaction(wallet.signedTransaction)

        console.log("Token Transfer transaction hash: ", transactionDetails)
    })

    it("Sign token minting transaction", async () => {
        const wallet = await solWallet.signTransaction(MINT_NEW_TOKEN_PARAM.transaction, MINT_NEW_TOKEN_PARAM.connectionUrl)

        const stringWall = wallet.signedTransaction.toString('hex')
        const stringBuff = Buffer.from(stringWall, 'hex')

        const connection = getConnection(SOL_TXN_PARAM.connectionUrl)
        const transactionDetails = await connection.sendRawTransaction(wallet.signedTransaction)

        console.log("Mint token transaction hash: ", transactionDetails)
    })
})