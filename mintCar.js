const connectSdk = require("./utils/connect-sdk.js")
const transferToken = require("./utils/transferToken.js")

const createToken = async (tokenImage, walletAddress, collectionId) => {
  if(!tokenImage){
    console.log("no image url")
    return 
  }

  const { sdk} = await connectSdk();

  const tokenTx = await sdk.token.createV2({
    collectionId: collectionId ? collectionId: 3266,
    image: tokenImage,
    owner: walletAddress ? walletAddress: "5HpC86sY1Ec8mMz11yMm5hBNgsLZc79RPfJ8wAd87jVhNtdd",
    attributes: [
      {
        trait_type: "Nickname",
        value: "Crypto Huskies",
      },
      {
        trait_type: "Victories",
        value: 0,
      },
      {
        trait_type: "Defeats",
        value: 0,
      }
    ],
  });

  const token = tokenTx.parsed;
  if (!token) throw Error("Cannot parse token");

  console.log(`Explore your NFT: https://uniquescan.io/opal/tokens/${token.collectionId}/${token.tokenId}`);
  await transferToken(token.tokenId, token.collectionId, sdk);
}


createToken().catch(e => {
  console.log('Something wrong during token creation');
  throw e;
});


module.exports = createToken