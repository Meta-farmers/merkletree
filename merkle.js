"use strict";
exports.__esModule = true;
exports.verify = exports.verifyWithAmout = exports.getWhitelist = exports.getWhitelistWithAmount = void 0;
var SHA256 = require("crypto-js/sha256");
var MerkleTree = require("merkletreejs").MerkleTree;
var keccak256 = require("keccak256");
var utils = require("ethers").utils;
function hashToken(account, amount) {
    return Buffer.from(utils.solidityKeccak256(["address", "uint256"], [account, amount]).slice(2), "hex");
}
function hashLeaves(leaves) {
    return leaves.map(function (token) { return hashToken(token[0], token[1]); });
}
function getMerkleTree(hashedLeaves) {
    return new MerkleTree(hashedLeaves, keccak256, { sortPairs: true });
}
function getWhitelistWithAmount(leaves) {
    var hashedLeaves = hashLeaves(leaves);
    var merkleTree = getMerkleTree(hashedLeaves);
    var whitelist = {};
    leaves.forEach(function (leaf, index) {
        whitelist[leaf[0]] = merkleTree.getHexProof(hashedLeaves[index]);
    });
    return [whitelist, merkleTree.getHexRoot()];
}
exports.getWhitelistWithAmount = getWhitelistWithAmount;
function getWhitelist(leaves) {
    // const hashedLeaves = leaves.map(x => SHA256(x));
    var hashedLeaves = leaves.map(function (x) { return (x); });
    var tree = newMerkleTree(hashedLeaves);
    console.log((hashedLeaves[0]));
    var leaf = hashedLeaves[0];
    console.log(tree.getHexProof(leaf));
    // const ok =tree.verify(tree.getHexProof(leaf),leaf,tree.getHexRoot())
    var ok = verify(tree.getHexProof(leaf), leaf, tree.getHexRoot());
    console.log(ok);
    var whitelist = {};
    hashedLeaves.forEach(function (leaf, index) {
        whitelist[leaves[index]] = tree.getHexProof(leaf);
    });
    return [whitelist, tree.getHexRoot()];
}
exports.getWhitelist = getWhitelist;
function newMerkleTree(hashedLeaves) {
    return new MerkleTree(hashedLeaves, keccak256, { sortPairs: true, sortLeaves: true });
}
function verifyWithAmout(root, proof, address, amount) {
    var merkleTree = new MerkleTree();
    return merkleTree.verify(proof, hashToken(address, amount), root);
}
exports.verifyWithAmout = verifyWithAmout;
function verify(proof, address, root) {
    return MerkleTree.verify(proof, address, root, keccak256, { sortPairs: true, sortLeaves: true });
}
exports.verify = verify;
