# Solana-wallet

This repository contains `SOLHdKeyring` class to create **Solana wallet** from **Safle Vault**.

## Usecase

We will be using `SolHdKeyring` class to initialize the wallet and then utilize the provided functions to perform the required tasks. <br />
The class initialization is done in the following way.

```
const solWallet = new SolHdKeyring(`mnemonic`)
```

`mnemonic` is the BIP-39 key phrase to generate the wallet.

Once we initialize the class, we can utilize the provided functions.

The wallet have the following functions:

#### generateWallet()

This function is used to generate the Solana wallet and set the 0th address as the default address. <br />
parameters: - <br />
returns: `{address: string} // wallet address`

#### exportPrivateKey()

This function is used to export the provate key for the generated address. <br />
**parameters:** - <br />
**returns:** `{privateKey: string} // address private key`

#### signTransaction(transaction: _TransactionObj_ , connectionUrl: _string_ )

This function is used to sign a transaction off-chain and then send it to the network.<br /> Transactions are of 4 types:

1. SOL transfer:<br />
   Trasaction to transfer SOL from one wallet/address to another.<br />The transaction object is of the following type:

```
TransactionObj: {
    data: {
        to, // destination address
        amount, // amount
    },
    txnType: NATIVE_TRANSFER // type constant
}
```

2. SPL token transfer:<br />
   Transaction to transfer SPL tokens from one wallet/address to another.<br />The transaction object is of the following type:

```
TransactionObj: {
    data: {
        to, // destination address
        amount // amount to send
        memo // any memo send by user
        token // token address
    },
    txnType: TOKEN_TRANSFER // type constant
}
```

3. Contract transactions:<br />
   Transaction to call any smart contract function.<br />The transaction object is of the following type:

```
TransactionObj: {
    data: {
        programAccountKey, // address at which the program state is managed
        programId, // programId of the contract
        bufferData // data to send in buffer format
    },
    txnType: CONTRACT_TRANSACTION // type constant
}
```

4. Mint new SPL token: <br />
   Transaction to mint new token with initial amount and decimal places.<br />The transaction object is of the following type:

```
TransactionObj: {
    data: {
        amount: 1000, // amount
        decimals: 2, // decimal places
   },
   txnType: MINT_NEW_TOKEN // type constant
}
```

**parameters:**

```
name: transaction,
type: TransactionObj, // refer to the above 4 trancationObj types.

name: connectionUrl, // SOLANA network URL
type: string
```

**returns:** `{signedTransaction: Buffer} signed raw transaction`

#### signMessage(message: _string_ )

This function is used to sign a message. <br />
**parameters:**

```
name: message
type: string
```

**returns:** `{signedMessage: string} // signed message hex string`

#### getAccounts()

This function is used to get the wallet address. <br />
**parameters:** - <br />
**returns:** `{address: string} // wallet address`

#### sendTransaction(rawTransaction: _Buffer_ | _UInt8Array_ , connectionUrl: _string_)

This function is used send the signed transaction onto the chain. <br />
**parameters:**

```
name: rawTransaction, // signed raw transaction (got from signedTransaction())
type: Buffer | UInt8Array

name: connectionUrl, // SOLANA network URL
type: string
```

**returns:** `{transactionDetails : string} // transaction hash`

#### getFee(connectionUrl: _string_)

This function is returns the fees in lamports which will be used for each signature. <br />
That means if there are 5 signatures of a transaction then the total fees will be `5 * transactionFees` . <br />

**parameters:**

```
name: connectionUrl, // SOLANA network URL
type: string
```

**returns:** `{transactionFees: integer} // transaction fees`
