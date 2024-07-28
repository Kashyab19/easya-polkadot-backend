const express = require('express');
const path = require('path');
const cors = require('cors'); // Import the cors package
require('dotenv').config(); // Load environment variables from .env file
const createToken = require("./mintCar")
const uploadImageToSupabase = require("./utils/uploadImage")
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

// Endpoint to generate skin
app.post('/generate-skin', async (req, res) => {
    const userPrompt = req.body.prompt;
    try {
        const image = await openai.images.generate({
            model: "dall-e-3",
            prompt: userPrompt
        });

        const imageUrl = await uploadImageToSupabase(image.data[0].url);

        res.send({ imageUrl: imageUrl});
    } catch (error) {
        console.error('Error generating skin:', error);
        res.status(500).send('Error generating skin');
    }
});


// Endpoint to mint NFT
app.post('/mint-nft', async (req, res) => {
    const imageData = req.body.imageData;
    const walletAddress = req.body.walletAddress
    try {
       await createToken(imageData, walletAddress)
        // const provider = new KeyringProvider({
        //     type: 'sr25519',
        //     keyring: new Sr25519()
        // });

        // const sdk = new Sdk({
        //     baseUrl: 'https://rest.unique.network/opal/v1', // Use the appropriate endpoint for your network
        //     provider
        // });

        // const account = createAccount({
        //     mnemonic: process.env.UNIQUE_NETWORK_MNEMONIC, // Ensure you have your mnemonic phrase in the .env file
        //     type: 'sr25519'
        // });

        // const collectionId = process.env.UNIQUE_NETWORK_COLLECTION_ID; // Ensure you have your collection ID in the .env file
        // const tokenData = {
        //     owner: account.address,
        //     data: imageData
        // };

        // const { tokenId } = await sdk.tokens.createToken({
        //     collectionId,
        //     tokenData,
        //     signer: account
        // });

        res.json({ message: "Minted and transferred SuccesFully" });
    } catch (error) {
        console.error('Error minting NFT:', error);
        res.status(500).send('Error minting NFT');
    }
});


app.listen(3001, () => console.log('Server running on port 3001'));
