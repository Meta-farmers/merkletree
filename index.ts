import { getWhitelistWithAmount, getWhitelist, verify } from './merkle';
const { MerkleTree } = require("merkletreejs");
const fs = require("fs");
const leaves : [string,number][] = Object.entries (require("./OG_freemint.json"))
const leaves2 =(require("./OG_freemint_light.json"));

const whitelist=getWhitelistWithAmount(leaves)
const whitelist2=getWhitelist(leaves2)

fs.writeFile("proofsList.json", JSON.stringify(whitelist[0]), (err) => {
  if (err) {
    console.error(err);
    return;
  }
});

fs.writeFile("proofs.json", JSON.stringify(whitelist2[0]), (err) => {
  if (err) {
    console.error(err);
    return;
  }
});
fs.writeFile("root.json", JSON.stringify({"root":whitelist2[1]}), (err) => {
  if (err) {
    console.error(err);
    return;
  }
});
const addressToCheck ="0x597C9223bc620E1c170055958299cB7769b56eaA"
let proofs
let  root
fs.readFile("root.json",function(err, data){
    // Display the file content
    root=JSON.parse(data);

fs.readFile("proofs.json",function(err, data){
    // Display the file content
    proofs=JSON.parse(data);
    console.log(root.root);
const isOK =verify(proofs[addressToCheck],addressToCheck,root.root)
console.log(isOK);
}
);
}
);

const sha1 = require('crypto-js/sha1')

const leaves1 = [
    'd89f84d948796605a413e196f40bce1d6294175d',
    '32f04c7f572bf75a266268c6f4d8c92731dc3b7f',
    'b80b52d80f5fe940ac2c987044bc439e4218ac94',
    '1553c75a1d637961827f4904a0955e57915d8310'
  ]

  const tree = new MerkleTree(leaves1, sha1, {
    sortLeaves: true,
    sortPairs: true
  })

  const leaf = leaves1[0]
  const proof = tree.getHexProof(leaf)



  console.log(tree.verify(proof, leaf, tree.getHexRoot()))