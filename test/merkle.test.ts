import {describe, it, expect} from 'vitest'
import { getWhitelist } from '../merkle';
export const leaves = Object.entries({
    "0x7B0c2F65A7DC95b11B0b99111192bfddA2F08271": 1,
    "0x655d8A60345188b2C94d543dE4eafF58905A40fD": 1,
    "0x597C9223bc620E1c170055958299cB7769b56eaA": 1,
    "0x184E509eEba9b0dC4985c5eF298649a736c2c615": 1,
  });
  const root ="0x808d789b4d338f5bba67613682614a3aad295f83862501540b56ac16cde2c84e"
describe ("Merkle Tree Testing",()=>{
	it('Should get size 4', ()=>{
        expect(leaves).to.have.lengthOf(4)
	})
	it('Should equal to root tree', ()=>{
        expect(getWhitelist(leaves)).equal(root)
	})
})