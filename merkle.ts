const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const { utils } = require("ethers");

function hashToken(account, amount) {
  return Buffer.from(
    utils.solidityKeccak256(["address", "uint256"], [account, amount]).slice(2),
    "hex"
  );
}
function hashLeaves(leaves: [string, number][]): Buffer[] {
  return leaves.map((token) => hashToken(token[0],token[1]));
}

function getMerkleTree(hashedLeaves: Buffer[]) : typeof MerkleTree {
  return new MerkleTree(hashedLeaves, keccak256, { sortPairs: true });
}

export function getWhitelist(leaves: [string, number][]) : [{ [address: string]: string[] },string] {
  const hashedLeaves= hashLeaves(leaves)
  const merkleTree = getMerkleTree(hashedLeaves);
  let whitelist : { [address: string]: string[] } = {};
  leaves.forEach((leaf, index) => {

    whitelist[leaf[0]]=merkleTree.getHexProof(hashedLeaves[index])
  });
  return [whitelist,merkleTree.getHexRoot()];
}


export function verify(root:string,leaf) : boolean {
  return true
}
export const leaves = Object.entries({
  "0x7B0c2F65A7DC95b11B0b99111192bfddA2F08271": 1,
  "0x655d8A60345188b2C94d543dE4eafF58905A40fD": 1,
  "0x597C9223bc620E1c170055958299cB7769b56eaA": 1,
  "0x184E509eEba9b0dC4985c5eF298649a736c2c615": 1,
});