const dotenv = require('dotenv');
dotenv.config();

const getConfig = () => {
  const {MNEMONIC} = process.env;
  if (!MNEMONIC)
    throw Error("Create .env from .env-example and set MNEMONIC env");

  return {
    mnemonic: MNEMONIC,
  }
}

module.exports = getConfig();