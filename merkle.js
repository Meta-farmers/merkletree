
const { MerkleTree } = require('merkletreejs')
const  axios  = require ('axios')
const keccak256 = require('keccak256')
const ethers = require('ethers')
const raffleWinners = require("./winners.json");
    axios.post('https://whitelist.niouk.workers.dev/', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });