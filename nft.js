const fs = require("fs");

const { NFTStorage, File, Blob } = require('nft.storage')
const {getFilesFromPath } = require('web3.storage')

const endpoint = 'https://api.nft.storage' // the default
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDM3Mzc5ODE1YzVkYjEyODcxNGZjZTY4MjM3ZjdCZDI3NzRjYkY4NzAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0Njg1OTg5ODM2MCwibmFtZSI6ImFwaTEifQ.gS_tDGGhXlYKGy_XC7CIH5pYg7Oo77e8PsiGPQhroBo"


async function main() {
const path = process.argv.slice(2)
var files = await getFilesFromPath(path)
  const storage = new NFTStorage({ endpoint, token })
  const cid = await storage.storeDirectory(files)
  console.log({ cid })
  const status = await storage.status(cid)
  console.log(status)
}
main()