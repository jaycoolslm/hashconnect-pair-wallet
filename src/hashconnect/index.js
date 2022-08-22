import { HashConnect } from 'hashconnect'

let hashconnect = new HashConnect()

let appMetadata = {
    name: "dApp Example",
    description: "An example hedera dApp",
    icon: "https://absolute.url/to/icon.png"
}

export const pairHashpack = async () => {
    let initData = await hashconnect.init(appMetadata, "testnet", false);

    hashconnect.foundExtensionEvent.once((walletMetadata) => {
        hashconnect.connectToLocalWallet(initData.pairingString, walletMetadata);
    })

    hashconnect.pairingEvent.once((pairingData) => {
        console.log('wallet paired')
        console.log(pairingData)

        const accountId = document.getElementById('accountid')
        accountId.innerHTML = pairingData.accountIds[0]
    })

    return initData
}


export const authenticateUser = async () => {
    const payload = {
        url: window.location.hostname,
        data: {
            token: "fufhr9e84hf9w8fehw9e8fhwo9e8fw938fw3o98fhjw3of"
        }
    }

    const hashconnectData = JSON.parse(window.localStorage.hashconnectData)
    console.log(hashconnectData)

    const res = await fetch('http://localhost:8443/sendAuth')
    const {signingData} = await res.json()

    const serverSigAsArr = Object.values(signingData.serverSignature)
    const serverSigAsBuffer = Buffer.from(serverSigAsArr)

    let auth = await hashconnect
        .authenticate(hashconnectData.topic, hashconnectData.pairingData[0].accountIds[0], signingData.serverSigningAccount, serverSigAsBuffer, payload);

    const receiveAuthData = {
        signingAccount: hashconnectData.pairingData[0].accountIds[0],
        auth
    }

    const res2 = await fetch('http://localhost:8443/getAuth', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(receiveAuthData),
    })

    const { authMessage } = await res2.json()

    console.log(authMessage)

}