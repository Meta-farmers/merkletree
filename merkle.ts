const SHA256 = require("crypto-js/sha256");
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
  return leaves.map((token) => hashToken(token[0], token[1]));
}

function getMerkleTree(hashedLeaves: Buffer[]): typeof MerkleTree {
  return new MerkleTree(hashedLeaves, keccak256, { sortPairs: true });
}

export function getWhitelistWithAmount(
  leaves: [string, number][]
): [{ [address: string]: string[] }, string] {
  const hashedLeaves = hashLeaves(leaves);
  const merkleTree = getMerkleTree(hashedLeaves);
  let whitelist: { [address: string]: string[] } = {};
  leaves.forEach((leaf, index) => {
    whitelist[leaf[0]] = merkleTree.getHexProof(hashedLeaves[index]);
  });
  return [whitelist, merkleTree.getHexRoot()];
}

export function getWhitelist(
  leaves: string[]
): [{ [address: string]: string[] }, string] {
  // const hashedLeaves = leaves.map(x => SHA256(x));
  const hashedLeaves = leaves.map(x => (x));
  const tree = newMerkleTree(hashedLeaves);
  console.log((hashedLeaves[0]));
  const leaf =hashedLeaves[0]
  console.log(tree.getHexProof(leaf));

  // const ok =tree.verify(tree.getHexProof(leaf),leaf,tree.getHexRoot())
  const ok =verify(tree.getHexProof(leaf),leaf,tree.getHexRoot())
  console.log(ok);

  let whitelist: { [address: string]: string[] } = {};
  hashedLeaves.forEach((leaf, index) => {
    whitelist[leaves[index]] = tree.getHexProof(leaf);
  });
  return [whitelist, tree.getHexRoot()];
}

function newMerkleTree(hashedLeaves: any[]) {
  return new MerkleTree(hashedLeaves, keccak256,
    { sortPairs: true ,sortLeaves: true,}
  );
}

export function verifyWithAmout(
  root: string,
  proof: string[],
  address: string,
  amount: number
): boolean {
  const merkleTree = new MerkleTree();
  return merkleTree.verify(proof, hashToken(address, amount), root);
}

export function verify(
  proof: string[],
  address: string,
  root: string,
): boolean {
  return MerkleTree.verify(proof, address, root, keccak256,{ sortPairs: true ,sortLeaves: true,});
}
