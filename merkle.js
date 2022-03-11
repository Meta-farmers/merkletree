"use strict";
exports.__esModule = true;
exports.leaves = exports.verify = exports.getWhitelist = void 0;
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
function getWhitelist(leaves) {
    var hashedLeaves = hashLeaves(leaves);
    var merkleTree = getMerkleTree(hashedLeaves);
    var whitelist = {};
    leaves.forEach(function (leaf, index) {
        whitelist[leaf[0]] = merkleTree.getHexProof(hashedLeaves[index]);
    });
    return [whitelist, merkleTree.getHexRoot()];
}
exports.getWhitelist = getWhitelist;
function verify(root, leaf) {
    return true;
}
exports.verify = verify;
exports.leaves = Object.entries({
    "0x7B0c2F65A7DC95b11B0b99111192bfddA2F08271": 1,
    "0x655d8A60345188b2C94d543dE4eafF58905A40fD": 1,
    "0x597C9223bc620E1c170055958299cB7769b56eaA": 1,
    "0x184E509eEba9b0dC4985c5eF298649a736c2c615": 1
});
var whitelist = getWhitelist(exports.leaves);
console.log(whitelist[0]["0x597C9223bc620E1c170055958299cB7769b56eaA"]);
