"use strict";
exports.__esModule = true;
var merkle_1 = require("./merkle");
var MerkleTree = require("merkletreejs").MerkleTree;
var fs = require("fs");
var leaves = Object.entries(require("./OG_freemint.json"));
var leaves2 = (require("./OG_freemint_light.json"));
var whitelist = (0, merkle_1.getWhitelistWithAmount)(leaves);
var whitelist2 = (0, merkle_1.getWhitelist)(leaves2);
fs.writeFile("proofsList.json", JSON.stringify(whitelist[0]), function (err) {
    if (err) {
        console.error(err);
        return;
    }
});
fs.writeFile("proofs.json", JSON.stringify(whitelist2[0]), function (err) {
    if (err) {
        console.error(err);
        return;
    }
});
fs.writeFile("root.json", JSON.stringify({ "root": whitelist2[1] }), function (err) {
    if (err) {
        console.error(err);
        return;
    }
});
var addressToCheck = "0x597C9223bc620E1c170055958299cB7769b56eaA";
var proofs;
var root;
fs.readFile("root.json", function (err, data) {
    // Display the file content
    root = JSON.parse(data);
    fs.readFile("proofs.json", function (err, data) {
        // Display the file content
        proofs = JSON.parse(data);
        console.log(root.root);
        var isOK = (0, merkle_1.verify)(proofs[addressToCheck], addressToCheck, root.root);
        console.log(isOK);
    });
});
var sha1 = require('crypto-js/sha1');
var leaves1 = [
    'd89f84d948796605a413e196f40bce1d6294175d',
    '32f04c7f572bf75a266268c6f4d8c92731dc3b7f',
    'b80b52d80f5fe940ac2c987044bc439e4218ac94',
    '1553c75a1d637961827f4904a0955e57915d8310'
];
var tree = new MerkleTree(leaves1, sha1, {
    sortLeaves: true,
    sortPairs: true
});
var leaf = leaves1[0];
var proof = tree.getHexProof(leaf);
console.log(tree.verify(proof, leaf, tree.getHexRoot()));
