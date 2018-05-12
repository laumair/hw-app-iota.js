This repository hosts the library to communicate with the Ledger Nano S IOTA app.

## Examples

**Basic example:**

```js
import Transport from "@ledgerhq/hw-transport-node-hid";
// import Transport from "@ledgerhq/hw-transport-u2f"; // for browser
import AppIota from 'hw-app-iota';

const getAddress = async () => {
  const transport = await Transport.create();
  const hwapp = new AppIota(transport);
  await hwapp.setActiveSeed("44'/4218'/0'/0/0");
  return await hwapp.getAddress(0, {checksum: true});
};

getAddress().then(a => console.log(a));
```

## API Reference

### hw-app-iota~Iota
Class for the interaction with the Ledger IOTA application.

* [~Iota](#module_hw-app-iota..Iota)
    * [.setActiveSeed(path, [security])](#module_hw-app-iota..Iota+setActiveSeed)
    * [.setActiveAccount(account, [security])](#module_hw-app-iota..Iota+setActiveAccount)
    * [.getAddress(index, [options])](#module_hw-app-iota..Iota+getAddress) ⇒ <code>Promise.&lt;String&gt;</code>
    * [.signTransaction(transfers, inputs, [remainder])](#module_hw-app-iota..Iota+signTransaction) ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>
    * [.displayAddress(index)](#module_hw-app-iota..Iota+displayAddress)
    * [.readIndexes()](#module_hw-app-iota..Iota+readIndexes) ⇒ <code>Promise.&lt;Array.&lt;Integer&gt;&gt;</code>
    * [.writeIndexes(indexes)](#module_hw-app-iota..Iota+writeIndexes)

<a name="module_hw-app-iota..Iota+setActiveSeed"></a>

#### iota.setActiveSeed(path, [security])
Initializes the Ledger with a security level and an IOTA seed based on a
BIP44 path.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>String</code> |  | String representation of the 5-level BIP32 path |
| [security] | <code>Number</code> | <code>2</code> | IOTA security level to use |

**Example**  
```js
iota.setActiveSeed("44'/4218'/0'/0/0", 2);
```
<a name="module_hw-app-iota..Iota+setActiveAccount"></a>

#### iota.setActiveAccount(account, [security])
Initializes the Ledger with a security level and an IOTA seed based on
one out of 5 predefined accounts.
This identical to calling setActiveSeed with the default IOTA path where
level 5 corresponds to the account number. The seed indexes are only
available for those 5 paths.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| account | <code>Number</code> |  | Account number. Must be between 0 and 4. |
| [security] | <code>Number</code> | <code>2</code> | IOTA security level to use |

**Example**  
```js
iota.setActiveAccount(0, 2);
```
<a name="module_hw-app-iota..Iota+getAddress"></a>

#### iota.getAddress(index, [options]) ⇒ <code>Promise.&lt;String&gt;</code>
Generates an address index-based.
The result depends on the initalized seed and security level.

**Returns**: <code>Promise.&lt;String&gt;</code> - Tryte-encoded address  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| index | <code>Integer</code> |  | Index of the address |
| [options] | <code>Object</code> |  |  |
| [options.checksum] | <code>Boolean</code> | <code>false</code> | Append 9 tryte checksum |

**Example**  
```js
iota.getAddress(0, { checksum: true });
```
<a name="module_hw-app-iota..Iota+signTransaction"></a>

#### iota.signTransaction(transfers, inputs, [remainder]) ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>
Returns an array of raw transaction data (trytes) including the signatures.

**Returns**: <code>Promise.&lt;Array.&lt;String&gt;&gt;</code> - Transaction trytes of 2673 trytes per transaction  

| Param | Type | Description |
| --- | --- | --- |
| transfers | <code>Array.&lt;Object&gt;</code> | Transfer objects |
| transfers[].address | <code>String</code> | Tryte-encoded address of recipient, with or without the 9 tryte checksum |
| transfers[].value | <code>Integer</code> | Value to be transferred |
| transfers[].tag | <code>String</code> | Tryte-encoded tag. Maximum value is 27 trytes. |
| inputs | <code>Array.&lt;Object&gt;</code> | Inputs used for funding the transfer |
| inputs[].address | <code>String</code> | Tryte-encoded source address, with or without the 9 tryte checksum |
| inputs[].balance | <code>Integer</code> | Balance of that input |
| inputs[].keyIndex | <code>String</code> | Index of the address |
| [remainder] | <code>Object</code> | Destination for sending the remainder value (of the inputs) to. |
| remainder.address | <code>String</code> | Tryte-encoded address, with or without the 9 tryte checksum |
| remainder.keyIndex | <code>Integer</code> | Index of the address |

<a name="module_hw-app-iota..Iota+displayAddress"></a>

#### iota.displayAddress(index)
Displays address on Ledger to verify it belongs to ledger seed.

| Param | Type | Description |
| --- | --- | --- |
| index | <code>Integer</code> | Index of the address |

<a name="module_hw-app-iota..Iota+readIndexes"></a>

#### iota.readIndexes() ⇒ <code>Promise.&lt;Array.&lt;Integer&gt;&gt;</code>
Retrieves the 5 seed indexes stored on the Ledger.
Each index corresponds to the index of highest remainder address used
so far on the respective account.

<a name="module_hw-app-iota..Iota+writeIndexes"></a>

#### iota.writeIndexes(indexes)
Writes the 5 seed indexes to Ledger.

| Param | Type | Description |
| --- | --- | --- |
| indexes | <code>Array.&lt;Integer&gt;</code> | Seed indexes to write |
