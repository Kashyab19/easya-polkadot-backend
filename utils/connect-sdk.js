const { Sdk, CHAIN_CONFIG } = require('@unique-nft/sdk/full');
const { Sr25519Account } = require('@unique-nft/sr25519');
const config = require('./config.js');

const connectSdk = async () => {
  console.log(config)
  const account = Sr25519Account.fromUri(config.mnemonic);

  const sdk = new Sdk({
    // NOTICE: You can get OPL tokens for free https://t.me/unique2faucet_opal_bot
    baseUrl: CHAIN_CONFIG.opal.restUrl, 
    account,
  });

  return {
    account,
    sdk,
  }
}

module.exports = connectSdk