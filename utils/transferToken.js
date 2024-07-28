const config = require('./config.js');


const getAddressFromBackend = async () => {
    try {
      const response = await fetch('/', { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        return data.address;
      } else {
        throw new Error('Failed to fetch address from backend');
      }
    } catch (error) {
      console.error('Error fetching address from backend:', error);
      return null;
    }
  };

const transferToken = async (tokenId, collId, sdk) => {
    const txTransfer = await sdk.token.transfer.submitWaitResult({
      collectionId: collId,
      tokenId: tokenId,
      address: config.addr,
      to: "5HH4faUBmVzSyyD6b7RKET4waGUWXbdZAUVAvBmFTqVBsyWJ",
      //from: '5D2EovBGwhr8usESizDiTY1ad2T1M3x1sZTUqFa9VJeJEUmG', // optional 
    })

    const parsedTransfer = txTransfer.parsed

    console.log(`${parsedTransfer?.to} is the new owner of token ${parsedTransfer?.tokenId} 
    from collection ${parsedTransfer?.collectionId}`)
}


module.exports = transferToken;