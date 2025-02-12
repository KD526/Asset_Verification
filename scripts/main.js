require("dotenv").config()
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function uploadFileToPinata(filePath) {

    const apiKey = process.env.pinata_api_key;
    const apiSecret = process.env.pinata_secret_api_key;

    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

    try {
        const response = await axios.post(url, formData, {
            maxBodyLength: 'Infinity', // prevent axios from capping the file size
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                pinata_api_key: apiKey,
                pinata_secret_api_key: apiSecret
            }
        });

        return response.data;
    } catch (error) {
        console.error('Failed to upload file:', error);
        return null;
    }
}

// Example usage: upload a PDF document
uploadFileToPinata('./path/to/document.pdf').then(data => {
    if (data) {
        console.log('File uploaded successfully! CID:', data.IpfsHash);
    }
});
