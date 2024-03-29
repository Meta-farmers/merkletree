const { MerkleTree } = require("merkletreejs");
const axios = require("axios");
const keccak256 = require("keccak256");
const ethers = require("ethers");
const og = require("./og.json");
const ogProofsFile = require("./oglist.json");
const ogWhiteListFile = require("./OG_freemint.json");
const fs = require("fs");

function hashToken(account, amount) {
  return Buffer.from(
    ethers.utils
      .solidityKeccak256(["address", "uint256"], [account, amount])
      .slice(2),
    "hex"
  );
}
function getLeaves2(og) {
  const objOG = Object.entries(og);
  const addressOG = objOG.map((x) => x[1]);
  const addressOGunique = objOG.map((x) => x[1]);
  const ogLeaves = addressOG.map((x) => {
    if (ethers.utils.isAddress(x.address)) return hashToken(x.address, 1);
  });
  const ogFilteredLeaves = ogLeaves.filter(function (x) {
    return x !== undefined;
  });
  return ogFilteredLeaves;
}
function getLeaves(og) {
  const objOG = Object.entries(og);
  const addressOG = objOG.map((x) => x[1].address);
  addressOGunique = [...new Set(addressOG)];
  const ogLeaves = addressOGunique.map((x) => {
    if (ethers.utils.isAddress(x)) return hashToken(x, 1);
  });
  const ogFilteredLeaves = ogLeaves.filter(function (x) {
    return x !== undefined;
  });
  return ogFilteredLeaves;
}

function getTree(og) {
  const tree = new MerkleTree(getLeaves(og), keccak256, { sortPairs: true });
  return tree;
}
function getRoot(og) {
  return getTree(og).getHexRoot();
}

function getProofs(og) {
  const proofs = getLeaves(og).map((x) => getTree(og).getHexProof(x));
  return proofs;
}

const raffle = Object.entries(ogWhiteListFile);
const raffleLeaves = raffle.map((token) => hashToken(...token));
const ogLeaves = ogProofsFile.map((token) => hashToken(token.address, 1));
const raffleTree = new MerkleTree(raffleLeaves, keccak256, { sortPairs: true });
const ogTree = new MerkleTree(ogLeaves, keccak256, { sortPairs: true });
const raffleProofs = raffleLeaves.map((x) => raffleTree.getHexProof(x));
const ogProofs = ogLeaves.map((x) => ogTree.getHexProof(x));
var table = [];
console.log("Root",ogTree.getHexRoot());
console.log("Proof",ogProofsFile[0].proof);
console.log(
  "verify file",
  raffleTree.verify(ogProofsFile[0].proof, ogLeaves[0], "0xa04eec5e2e2a66f4f139315862156c0bf9943f09ad7532f655f85c8daa48870b")
);
console.log(
  "verify process",
  raffleTree.verify(ogProofs[0], ogLeaves[0], ogTree.getHexRoot())
);
raffleProofs.forEach((element, index) => {
  table.push({ address: raffle[index][0], proof: element });
});
fs.writeFile("oglist.json", JSON.stringify(table), (err) => {
  if (err) {
    console.error(err);
    return;
  }
});
console.log(ethers.utils.keccak256("0x"));
