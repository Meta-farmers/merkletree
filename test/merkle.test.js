"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var merkle_1 = require("../merkle");
var leavesWithAmount = Object.entries({
    "0x7B0c2F65A7DC95b11B0b99111192bfddA2F08271": 1,
    "0x655d8A60345188b2C94d543dE4eafF58905A40fD": 1,
    "0x597C9223bc620E1c170055958299cB7769b56eaA": 1,
    "0x184E509eEba9b0dC4985c5eF298649a736c2c615": 1,
});
var leaves = [
    "0x7B0c2F65A7DC95b11B0b99111192bfddA2F08271",
    "0x655d8A60345188b2C94d543dE4eafF58905A40fD",
    "0x597C9223bc620E1c170055958299cB7769b56eaA",
    "0x184E509eEba9b0dC4985c5eF298649a736c2c615",
];
var root = "0x0c6cdba12800e42ea76628fe536ec8d8a85deb82bce54b11df520fa7909e26b4";
var rootWithAmout = "0x808d789b4d338f5bba67613682614a3aad295f83862501540b56ac16cde2c84e";
(0, vitest_1.describe)("Merkle Tree Testing", function () {
    (0, vitest_1.it)('Should get size 4', function () {
        (0, vitest_1.expect)(leavesWithAmount).to.have.lengthOf(4);
    });
    (0, vitest_1.it)('Should equal to root with amount tree', function () {
        (0, vitest_1.expect)((0, merkle_1.getWhitelistWithAmount)(leavesWithAmount)[1]).equal(rootWithAmout);
    });
    (0, vitest_1.it)('Should equal to root without amount tree', function () {
        (0, vitest_1.expect)((0, merkle_1.getWhitelist)(leaves)[1]).equal(root);
    });
});
//# sourceMappingURL=merkle.test.js.map