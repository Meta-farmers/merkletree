const { MerkleTree } = require('merkletreejs')
const  axios  = require ('axios')
const keccak256 = require('keccak256')
const ethers = require('ethers')
const raffleWinners = require("./winners.json");
    axios.get('https://serverless-api.niouk.workers.dev/api/balance/0xBf06cec47bc981ab9f0522BC053A198acA644ac8').then(response=>{console.log(response.data)})
    axios.get('https://serverless-api.niouk.workers.dev/api/raffle/root').then(response=>{console.log("Hex root from cloudflare :",response.data)})

function hashToken(account, amount) {
    return Buffer.from(
      ethers.utils
        .solidityKeccak256(["address", "uint256"], [account, amount])
        .slice(2),
      "hex"
    );
  }

  const rafflehash = Object.entries(raffleWinners).map((token) =>
  hashToken(...token)
);
const raffleTree = new MerkleTree(rafflehash, keccak256, { sortPairs: true });
const raffleRoot = raffleTree.getHexRoot();
console.log(raffleRoot)
