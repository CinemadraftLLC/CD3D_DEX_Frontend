import converter from 'ethereum-unit-converter';
import Web3 from 'web3'

const contract_source_arr = {
  standard: '/contracts/StandardToken.json',
  antiBotStandard: '/contracts/AntiBotStandardToken.json',
  liquidityGenerator: '/contracts/LiquidityGeneratorToken.json',
  baby: '/contracts/BABYTOKEN.json',
  buybackBaby: '/contracts/BuybackBabyToken.json'
}

import Web3Modal from "web3modal";
import { REACT_APP_SERVICE_FEE_RECEIVER } from '../constants/constants';

const providerOptions = {
  /* See Provider Options Section */
};

let web3Modal
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true,
    providerOptions, // required
  })
}



const readContractABI = async () =>
  new Promise((resolve, reject) => {
    let contract_data
    let contract_source = contract_source_arr.standard

    fetch(`${contract_source}`)
      .then((response) => {
        response.text()
          .then((data) => {
            data = JSON.parse(data)
            contract_data = data.abi
            return resolve(contract_data)
          })
          .catch((e) => {
            return reject()
          })
      })
      .catch((e) => {
        return reject()
      })
  })

const readContractByteCode = async () =>
  new Promise((resolve, reject) => {
    let bytecode
    let contract_source = contract_source_arr.standard

    fetch(`${contract_source}`)
      .then((response) => {
        response.text()
          .then((data) => {
            data = JSON.parse(data)
            bytecode = data.bytecode
            return resolve(bytecode)
          })
          .catch((e) => {
            return reject()
          })
      })
      .catch((e) => {
        return reject()
      })
  })

export const deployContract = (network, args, account) =>
  new Promise(async (resolve, reject) => {
    try {

      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts()
      console.log("accounts", accounts)


      const bytecode = await readContractByteCode()
      const contract_data = await readContractABI()

      const serviceFee = converter(process.env.REACT_APP_SERVICE_FEE, "ether", "wei")

      args = [...args, REACT_APP_SERVICE_FEE_RECEIVER, serviceFee]
      console.log("args", args, account)
      const contract = new web3.eth.Contract(contract_data)
      contract
        .deploy({
          data: bytecode,
          arguments: args,
        })
        .send({ from: accounts[0], value: serviceFee, gasLimit: 3000000 })
        .then(async (deployment) => {
          return resolve(deployment.options.address)
        })
        .catch((e) => {
          console.log(e)
          return reject(e)
        })
    } catch (e) {
      return reject('Could not deploy smart contract', e)
    }
  })
