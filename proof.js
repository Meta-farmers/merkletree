const { MerkleTree } = require("merkletreejs");
const axios = require("axios");
const keccak256 = require("keccak256");
const ethers = require("ethers");
const og = require("./og.json");
const ogList = require("./oglist.json");
const raffleWinners = require("./ogClean.json");
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

const raffle = Object.entries(raffleWinners);
const raffleLeaves = raffle.map((token) => hashToken(...token));
const ogLeaves = ogList.map((token) => hashToken(token.address,1));
const raffleTree = new MerkleTree(raffleLeaves, keccak256, { sortPairs: true });
const ogTree = new MerkleTree(ogLeaves, keccak256, { sortPairs: true });
const raffleRoot = raffleTree.getHexRoot();
const raffleProofs = raffleLeaves.map((x) => raffleTree.getHexProof(x));
myProof = [
  "0x1cb7b6b61fb6cd7251efd20805dc6bac7415f50772e365327c5cbd38696494e2",
  "0x7ffe6d39cac162557a011b386c2df7e8ccacc3af1ec5edfe3a46ebfb6f22d5cd",
  "0xb1f1dbc69c9b5221e138dc3e789d90501105d47accd46612621018ffa0e48a8f",
  "0xb8b7e5df363d699c8cde56ba58e182d8f07dd7427c5dd6cc5fa30588a6e3a49e",
  "0x50b12a31275258a1bd5369533f08a6d30d7e82ec22f600a1b926bae023ecf7a1",
  "0x075d52cd915dbdff41d97c1b8dce35e685d342f9e128a6770600dbebff67248a",
  "0x07039e6dea5ed4080eca71124243c032d2c39f170de37741f9ab0ca78827f512",
  "0xe2ac543a95a30de25ef3ee20777433205da28747c79ce3ebb0ea87b8e0668930",
];
var table = [];
//getProofs(og).forEach((element,index) => console.log("",index,og[index].address,element));
//getProofs(og).forEach((element,index) => table.push({"address":og[index].address.toLowerCase(),"proof":element}));
console.log(
  "verify ",
  raffleTree.verify(myProof, raffleLeaves[0], raffleTree.getHexRoot())
);
console.log(
  "verify ",
  ogTree.verify(ogList[0].proof, ogLeaves[0], ogTree.getHexRoot())
);
console.log(ogList[0]);
raffleProofs.forEach((element, index) => {
  table.push({ "address":raffle[index][0], "proof" : element });
});
// console.log(
//   "verify ",
//   getTree(og).verify(getProofs[2], getLeaves(og)[2], getRoot(og))
// );
fs.writeFile("oglist.json", JSON.stringify(table), (err) => {
  if (err) {
    console.error(err);
    return;
  }
});
