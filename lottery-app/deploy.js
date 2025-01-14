const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { interface, bytecode } = require('./compile');
//updated web3 and hdwallet-provider imports added for convenience

// deploy code will go here
const provider = new HDWalletProvider(
    'sustain saddle debate melody stay enact claim viable into bright left airport',
    'https://sepolia.infura.io/v3/04564008f4c640dda80dac87f76a409e'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    
    console.log("Deploying account 0", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({gas: '1000000', from: accounts[0]});

    console.log(interface);
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop()
};

deploy();