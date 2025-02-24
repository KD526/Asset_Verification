const { PinataSDK } = require("pinata-web3")
const fs = require("fs")
require("dotenv").config()

//use jwt and pinata key
const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.GATEWAY_URL
})

//upload file to IPFS using pinata
async function upload(){
  try {
    const blob = new Blob([fs.readFileSync("Government documents")]);
    const file = new File([blob], "Gvt data", { type: "text/plain"})
    const upload = await pinata.upload.file(file);
    console.log(upload)
  } catch (error) {
    console.log(error)
  }
}

upload()
