
var express = require('express');
var config = require('../routes/config.json');
var Txs = require('ethereumjs-tx').Transaction;
var request = require("request");
var Web3 = require('web3');
const httpEndPoint = config.connectionURL;
var web3 = new Web3(new Web3.providers.HttpProvider(httpEndPoint));
const contractAddress = config.contractAddress;
const abi = require('../controller/abi.json');
console.log("Hello")
module.exports = {

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------API FOR ERC20 FUNCTIONALITY------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

getTokenOwner: async (req, res) => {
    try {
        var newContract = await new web3.eth.Contract(abi,contractAddress);
        var resp = await newContract.methods.getowner().call();
        let response = {status:true, address:resp};
        res.send(response);
    } catch(err){
        let response = {status:false, message:"Unable to get Owner Address, Please Try Again!!!"};
        res.send(response);
    }
},

getTokenOwnerBalance: async (req, res) => {
    try {
        var newContract = await new web3.eth.Contract(abi,contractAddress);
        if(req.query.address && !req.query.address == ""){
            var resp = await newContract.methods.balanceOf(req.query.address).call();
            let response = {status:true, balance:resp};
            res.send(response);
        } else {
            let response = {status:false, message:"Enter Valid Address & Try Again!!!"};
            res.send(response);
        }
    } catch(err){
        let response = {status:false, message:"Unable to get Owner Token Balance, Please Try Again!!!"};
        res.send(response);
    }
},

getTokenName: async (req, res) => {
    try {
        var newContract = await new web3.eth.Contract(abi,contractAddress);
        var resp = await newContract.methods.name().call();
        let response = {status:true, name:resp};
        res.send(response);
    } catch(err){
        let response = {status:false, message:"Unable to get token Name, Please Try Again!!!"};
        res.send(response);
    }
},

getTokenSymbol: async (req, res) => {
    try {
        var newContract = await new web3.eth.Contract(abi,contractAddress);
        var resp = await newContract.methods.symbol().call();
        let response = {status:true, symbol:resp};
        res.send(response);
    } catch(err){
        let response = {status:false, message:"Unable to get Token Symbol, Please Try Again!!!"};
        res.send(response);
    }
},

getTokenTotalSupply: async (req, res) => {
    try {
        var newContract = await new web3.eth.Contract(abi,contractAddress);
        var resp = await newContract.methods.totalSupply().call();
        let response = {status:true, totalSupply:resp};
        res.send(response);
    } catch(err){
        let response = {status:false, message:"Unable to get Token Total Supply, Please Try Again!!!"};
        res.send(response);
    }
},

approveToken: async (req, res) => {
    try {
    var gasPrice = '0x09184e72a000';
    var gasLimit = 55000;
    var count = await web3.eth.getTransactionCount(req.body.fromAddress);
    var contract = await new web3.eth.Contract(abi,contractAddress,{from: req.body.fromAddress});    
    var chainId = 0x01;

    var rawTx = {
        "from": req.body.fromAddress,
        "nonce": "0x" + count.toString(16),
        "gasPrice": gasPrice,
        "gasLimit": gasLimit,
        "to": contractAddress,
        "value": "0x0", // Indication that we are not sending any ethers but our own tokens
        "data": contract.methods.approve(req.body.toAddress, req.body.amount).encodeABI(),
        "chainId": chainId
    };

    var privKeyBuffer = new Buffer(req.body.privateKey, 'hex');
    const tx = new Txs(rawTx,{'chain':'ropsten'});
    tx.sign(privKeyBuffer);
    web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'), function(error, tHash) {

    if (error){
    let response = '{"status":"false","hash":"","error":"'+error+'"}';
    res.send(JSON.parse(response));
    }
    else {
    let response = '{"status":"true","hash":"'+tHash+'","error":""}';
    res.send(JSON.parse(response));
    }});
    } catch(err){
        let response = {status:false, message:"Unable to Approve Token, Please Try Again!!!"};
        res.send(response);
    }
},

transferToken: async (req, res) => {
    try {
    var gasPrice = '0x09184e72a000';
    var gasLimit = 55000;
    var count = await web3.eth.getTransactionCount(req.body.fromAddress);
    var contract = await new web3.eth.Contract(abi,contractAddress,{from: req.body.fromAddress});    
    var chainId = 0x01;

    var rawTx = {
        "from": req.body.fromAddress,
        "nonce": "0x" + count.toString(16),
        "gasPrice": gasPrice,
        "gasLimit": gasLimit,
        "to": contractAddress,
        "value": "0x0", // Indication that we are not sending any ethers but our own tokens
        "data": contract.methods.transfer(req.body.toAddress, req.body.amount).encodeABI(),
        "chainId": chainId
    };

    var privKeyBuffer = new Buffer(req.body.privateKey, 'hex');
    const tx = new Txs(rawTx,{'chain':'ropsten'});
    tx.sign(privKeyBuffer);
    web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'), function(error, tHash) {

    if (error){
    let response = '{"status":"false","hash":"","error":"'+error+'"}';
    res.send(JSON.parse(response));
    }
    else {
    let response = '{"status":"true","hash":"'+tHash+'","error":""}';
    res.send(JSON.parse(response));
    }});
    } catch(err){
        let response = {status:false, message:"Unable to Transfer Token, Please Try Again!!!"};
        res.send(response);
    }
},

transferFrom: async (req, res) => {
    try {
    var gasPrice = '0x09184e72a000';
    var gasLimit = 55000;
    var count = await web3.eth.getTransactionCount(req.body.fromAddress);
    var contract = await new web3.eth.Contract(abi,contractAddress,{from: req.body.fromAddress});    
    var chainId = 0x01;

    var rawTx = {
        "from": req.body.fromAddress,
        "nonce": "0x" + count.toString(16),
        "gasPrice": gasPrice,
        "gasLimit": gasLimit,
        "to": contractAddress,
        "value": "0x0", // Indication that we are not sending any ethers but our own tokens
        "data": contract.methods.transferFrom(req.body.fromAddress, req.body.toAddress, req.body.amount).encodeABI(),
        "chainId": chainId
    };

    var privKeyBuffer = new Buffer(req.body.privateKey, 'hex');
    const tx = new Txs(rawTx,{'chain':'ropsten'});
    tx.sign(privKeyBuffer);
    web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'), function(error, tHash) {

    if (error){
    let response = '{"status":"false","hash":"","error":"'+error+'"}';
    res.send(JSON.parse(response));
    }
    else {
    let response = '{"status":"true","hash":"'+tHash+'","error":""}';
    res.send(JSON.parse(response));
    }});
    } catch(err){
        console.log(err)
        let response = {status:false, message:"Unable to Transfer Token, Please Try Again!!!"};
        res.send(response);
    }
},

burnToken: async (req, res) => {
    try {
    var gasPrice = '0x09184e72a000';
    var gasLimit = 55000;
    var count = await web3.eth.getTransactionCount(req.body.fromAddress);
    var contract = await new web3.eth.Contract(abi,contractAddress,{from: req.body.fromAddress});    
    var chainId = 0x01;

    var rawTx = {
        "from": req.body.fromAddress,
        "nonce": "0x" + count.toString(16),
        "gasPrice": gasPrice,
        "gasLimit": gasLimit,
        "to": contractAddress,
        "value": "0x0", // Indication that we are not sending any ethers but our own tokens
        "data": contract.methods.burn(req.body.amount).encodeABI(),
        "chainId": chainId
    };

    var privKeyBuffer = new Buffer(req.body.privateKey, 'hex');
    const tx = new Txs(rawTx,{'chain':'ropsten'});
    tx.sign(privKeyBuffer);
    web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'), function(error, tHash) {

    if (error){
    let response = '{"status":"false","hash":"","error":"'+error+'"}';
    res.send(JSON.parse(response));
    }
    else {
    let response = '{"status":"true","hash":"'+tHash+'","error":""}';
    res.send(JSON.parse(response));
    }});
    } catch(err){
        console.log(err)
        let response = {status:false, message:"Unable to Burn Token, Please Try Again!!!"};
        res.send(response);
    }
},

mintToken: async (req, res) => {
    try {
    var gasPrice = '0x09184e72a000';
    var gasLimit = 55000;
    var count = await web3.eth.getTransactionCount(req.body.fromAddress);
    var contract = await new web3.eth.Contract(abi,contractAddress,{from: req.body.fromAddress});    
    var chainId = 0x01;

    var rawTx = {
        "from": req.body.fromAddress,
        "nonce": "0x" + count.toString(16),
        "gasPrice": gasPrice,
        "gasLimit": gasLimit,
        "to": contractAddress,
        "value": "0x0", // Indication that we are not sending any ethers but our own tokens
        "data": contract.methods.burn(req.body.amount).encodeABI(),
        "chainId": chainId
    };

    var privKeyBuffer = new Buffer(req.body.privateKey, 'hex');
    const tx = new Txs(rawTx,{'chain':'ropsten'});
    tx.sign(privKeyBuffer);
    web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'), function(error, tHash) {

    if (error){
    let response = '{"status":"false","hash":"","error":"'+error+'"}';
    res.send(JSON.parse(response));
    }
    else {
    let response = '{"status":"true","hash":"'+tHash+'","error":""}';
    res.send(JSON.parse(response));
    }});
    } catch(err){
        console.log(err)
        let response = {status:false, message:"Unable to Mint Token, Please Try Again!!!"};
        res.send(response);
    }
},

transferOwnership: async (req, res) => {
    try {
    var gasPrice = '0x09184e72a000';
    var gasLimit = 55000;
    var count = await web3.eth.getTransactionCount(req.body.fromAddress);
    var contract = await new web3.eth.Contract(abi,contractAddress,{from: req.body.fromAddress});    
    var chainId = 0x01;

    var rawTx = {
        "from": req.body.fromAddress,
        "nonce": "0x" + count.toString(16),
        "gasPrice": gasPrice,
        "gasLimit": gasLimit,
        "to": contractAddress,
        "value": "0x0", // Indication that we are not sending any ethers but our own tokens
        "data": contract.methods.transferOwnership(req.body.newAddress).encodeABI(),
        "chainId": chainId
    };

    var privKeyBuffer = new Buffer(req.body.privateKey, 'hex');
    const tx = new Txs(rawTx,{'chain':'ropsten'});
    tx.sign(privKeyBuffer);
    web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'), function(error, tHash) {

    if (error){
    let response = '{"status":"false","hash":"","error":"'+error+'"}';
    res.send(JSON.parse(response));
    }
    else {
    let response = '{"status":"true","hash":"'+tHash+'","error":""}';
    res.send(JSON.parse(response));
    }});
    } catch(err){
        console.log(err)
        let response = {status:false, message:"Unable to Transfer Ownership, Please Try Again!!!"};
        res.send(response);
    }
},


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------API FOR NEXON FUNCTIONALITY--------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

getBigPayDay: async (req, res) => {
    try {
        var newContract = await new web3.eth.Contract(abi,contractAddress);
        var resp = await newContract.methods.getBigPayDay().call();
        // const d = unixEpochTimeMS;
        const time = resp.toLocaleString();
        let response = {status:true, day:time};
        res.send(response);
    } catch(err){
        let response = {status:false, message:"Unable to get Bigpay Day, Please Try Again!!!"};
        res.send(response);
    }
},

getBigPayDayPercentage: async (req, res) => {
    try {
        var newContract = await new web3.eth.Contract(abi,contractAddress);
        var resp = await newContract.methods.getBigPayDayPercentage().call();
        let response = {status:true, percentage:resp/100};
        res.send(response);
    } catch(err){
        let response = {status:false, message:"Unable to get Bigpay Day Percentage, Please Try Again!!!"};
        res.send(response);
    }
},

getTokenpoolAddress: async (req, res) => {
    try {
        var newContract = await new web3.eth.Contract(abi,contractAddress);
        var resp = await newContract.methods.getTokenpoolAddress().call();
        let response = {status:true, address:resp};
        res.send(response);
    } catch(err){
        let response = {status:false, message:"Unable to get Tokenpool Address, Please Try Again!!!"};
        res.send(response);
    }
},

getPurchaseableTokenAddress: async (req, res) => {
    try {
        var newContract = await new web3.eth.Contract(abi,contractAddress);
        var resp = await newContract.methods.getpurchaseableTokensAddress().call();
        let response = {status:true, address:resp};
        res.send(response);
    } catch(err){
        let response = {status:false, message:"Unable to get Purchaseable Token Address, Please Try Again!!!"};
        res.send(response);
    }
},

getPriceOfToken: async (req, res) => {
    try {
        var newContract = await new web3.eth.Contract(abi,contractAddress);
        var resp = await newContract.methods.getPriceToken().call();
        let response = {status:true, priceOfToken:resp};
        res.send(response);
    } catch(err){
        let response = {status:false, message:"Unable to get Price of Token, Please Try Again!!!"};
        res.send(response);
    }
},

getRewardPercentage: async (req, res) => {
    try {
        var newContract = await new web3.eth.Contract(abi,contractAddress);
        var resp = await newContract.methods.getRewardPercentage().call();
        let response = {status:true, percentage:resp};
        res.send(response);
    } catch(err){
        let response = {status:false, message:"Unable to get Reward Percentage, Please Try Again!!!"};
        res.send(response);
    }
},

getPenaltyPercentage: async (req, res) => {
    try {
        var newContract = await new web3.eth.Contract(abi,contractAddress);
        var resp = await newContract.methods.getPenaltyPercentage().call();
        let response = {status:true, percentage:resp};
        res.send(response);
    } catch(err){
        let response = {status:false, message:"Unable to get Penalty Percentage, Please Try Again!!!"};
        res.send(response);
    }
},

getPenaltyIfWithdrawToday: async (req, res) => {
    try {
        var newContract = await new web3.eth.Contract(abi,contractAddress);
        if(req.query.id && !req.query.id == ""){
            var resp = await newContract.methods.getPaneltyIfWithdrawToday(req.query.id).call();
            let response = {status:true, penalty:resp};
            res.send(response);
        } else {
            let response = {status:false, message:"Enter Valid Id & Try Again!!!"};
            res.send(response);
        }
    } catch(err){
        let response = {status:false, message:"Unable to get Penalty by Today, Please Try Again!!!"};
        res.send(response);
    }
},

getReferralAddress: async (req, res) => {
    try {
        var newContract = await new web3.eth.Contract(abi,contractAddress);
        var resp = await newContract.methods.getReferralAddress().call();
        let response = {status:true, address:resp};
        res.send(response);
    } catch(err){
        let response = {status:false, message:"Unable to get Referral Address, Please Try Again!!!"};
        res.send(response);
    }
},

getReferralAmount: async (req, res) => {
    try {
        var newContract = await new web3.eth.Contract(abi,contractAddress);
        var resp = await newContract.methods.getReferralAmount().call();
        let response = {status:true, amount:resp};
        res.send(response);
    } catch(err){
        let response = {status:false, message:"Unable to get Referral Amount, Please Try Again!!!"};
        res.send(response);
    }
},

getClaimTokens: async (req, res) => {
    try {
        var newContract = await new web3.eth.Contract(abi,contractAddress);
        var resp = await newContract.methods.getClaimTokens().call();
        let response = {status:true, token:resp};
        res.send(response);
    } catch(err){
        let response = {status:false, message:"Unable to get Claimed Tokens, Please Try Again!!!"};
        res.send(response);
    }
},

getRewardsDetailsOfUserById: async (req, res) => {
    try {
        var newContract = await new web3.eth.Contract(abi,contractAddress);
        if(req.query.id && !req.query.id == ""){
            var resp = await newContract.methods.getRewardsDetailsOfUserById(req.query.id).call();
            let response = {status:true, amount:resp};
            res.send(response);
        } else {
            let response = {status:false, message:"Enter Valid Id & Try Again!!!"};
            res.send(response);
        }
    } catch(err){
        let response = {status:false, message:"Unable to get Reward details by user id, Please Try Again!!!"};
        res.send(response);
    }
},

getTotalETH: async (req, res) => {
    try {
        var newContract = await new web3.eth.Contract(abi,contractAddress);
        var resp = await newContract.methods.getTotalETH().call();
        let response = {status:true, ETH:resp};
        res.send(response);
    } catch(err){
        let response = {status:false, message:"Unable to get total ETH, Please Try Again!!!"};
        res.send(response);
    }
},

getStakingCount: async (req, res) => {
    try {
        var newContract = await new web3.eth.Contract(abi,contractAddress);
        var resp = await newContract.methods.getStakingCount().call();
        let response = {status:true, count:resp};
        res.send(response);
    } catch(err){
        let response = {status:false, message:"Unable to get Staking Count, Please Try Again!!!"};
        res.send(response);
    }
},

getMyPurchasedTokens: async (req, res) => {
    try {
        var newContract = await new web3.eth.Contract(abi,contractAddress);
        if(req.query.address && !req.query.address == ""){
            var resp = await newContract.methods.getMyPurchasedTokens(req.query.address).call();
            let response = {status:true, token:resp};
            res.send(response);
        } else {
            let response = {status:false, message:"Enter Valid Address & Try Again!!!"};
            res.send(response);
        }
    } catch(err){
        let response = {status:false, message:"Unable to get Purchased Token by address, Please Try Again!!!"};
        res.send(response);
    }
},

getETHAmountByAddress: async (req, res) => {
    try {
        var newContract = await new web3.eth.Contract(abi,contractAddress);
        if(req.query.address && !req.query.address == ""){
            var resp = await newContract.methods.getETHAmountByAddress(req.query.address).call();
            let response = {status:true, amount:resp};
            res.send(response);
        } else {
            let response = {status:false, message:"Enter Valid Address & Try Again!!!"};
            res.send(response);
        }
    } catch(err){
        let response = {status:false, message:"Unable to get ETH Amount by address, Please Try Again!!!"};
        res.send(response);
    }
},

getFinalWithdrawlStake: async (req, res) => {
    try {
        var newContract = await new web3.eth.Contract(abi,contractAddress);
        if(req.query.id && !req.query.id == ""){
            var resp = await newContract.methods.getFinalWithdrawlStake(req.query.id).call();
            let response = {status:true, finalStake:resp};
            res.send(response);
        } else {
            let response = {status:false, message:"Enter Valid Id & Try Again!!!"};
            res.send(response);
        }
    } catch(err){
        let response = {status:false, message:"Unable to get Final Withdrawl Stake by user id, Please Try Again!!!"};
        res.send(response);
    }
},
 
//-----------------------------------------------------------------------SET FUNCTIONS------------------------------------------------------------------------//


setBigPayDay: async (req, res) => {
    try {
    var gasPrice = '0x09184e72a000';
    var gasLimit = 55000;
    var count = await web3.eth.getTransactionCount(req.body.fromAddress);
    var contract = await new web3.eth.Contract(abi,contractAddress,{from: req.body.fromAddress});    
    var chainId = 0x01;

    var rawTx = {
        "from": req.body.fromAddress,
        "nonce": "0x" + count.toString(16),
        "gasPrice": gasPrice,
        "gasLimit": gasLimit,
        "to": contractAddress,
        "value": "0x0", // Indication that we are not sending any ethers but our own tokens
        "data": contract.methods.setBigPayDay(req.body.day).encodeABI(),
        "chainId": chainId
    };

    var privKeyBuffer = new Buffer(req.body.privateKey, 'hex');
    const tx = new Txs(rawTx,{'chain':'ropsten'});
    tx.sign(privKeyBuffer);
    web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'), function(error, tHash) {

    if (error){
    let response = '{"status":"false","hash":"","error":"'+error+'"}';
    res.send(JSON.parse(response));
    }
    else {
    let response = '{"status":"true","hash":"'+tHash+'","error":""}';
    res.send(JSON.parse(response));
    }});
    } catch(err){
        console.log(err)
        let response = {status:false, message:"Unable to set big pay day, Please Try Again!!!"};
        res.send(response);
    }
},

setBigPayDayPercentage: async (req, res) => {
    try {
    var gasPrice = '0x09184e72a000';
    var gasLimit = 55000;
    var count = await web3.eth.getTransactionCount(req.body.fromAddress);
    var contract = await new web3.eth.Contract(abi,contractAddress,{from: req.body.fromAddress});    
    var chainId = 0x01;

    var rawTx = {
        "from": req.body.fromAddress,
        "nonce": "0x" + count.toString(16),
        "gasPrice": gasPrice,
        "gasLimit": gasLimit,
        "to": contractAddress,
        "value": "0x0", // Indication that we are not sending any ethers but our own tokens
        "data": contract.methods.setBigPayDayPercentage(req.body.percentage).encodeABI(),
        "chainId": chainId
    };

    var privKeyBuffer = new Buffer(req.body.privateKey, 'hex');
    const tx = new Txs(rawTx,{'chain':'ropsten'});
    tx.sign(privKeyBuffer);
    web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'), function(error, tHash) {

    if (error){
    let response = '{"status":"false","hash":"","error":"'+error+'"}';
    res.send(JSON.parse(response));
    }
    else {
    let response = '{"status":"true","hash":"'+tHash+'","error":""}';
    res.send(JSON.parse(response));
    }});
    } catch(err){
        console.log(err)
        let response = {status:false, message:"Unable to set bigpay day percentage, Please Try Again!!!"};
        res.send(response);
    }
},

setTokenPoolAddress: async (req, res) => {
    try {
    var gasPrice = '0x09184e72a000';
    var gasLimit = 55000;
    var count = await web3.eth.getTransactionCount(req.body.fromAddress);
    var contract = await new web3.eth.Contract(abi,contractAddress,{from: req.body.fromAddress});    
    var chainId = 0x01;

    var rawTx = {
        "from": req.body.fromAddress,
        "nonce": "0x" + count.toString(16),
        "gasPrice": gasPrice,
        "gasLimit": gasLimit,
        "to": contractAddress,
        "value": "0x0", // Indication that we are not sending any ethers but our own tokens
        "data": contract.methods.setTokenPoolAddress(req.body.address).encodeABI(),
        "chainId": chainId
    };

    var privKeyBuffer = new Buffer(req.body.privateKey, 'hex');
    const tx = new Txs(rawTx,{'chain':'ropsten'});
    tx.sign(privKeyBuffer);
    web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'), function(error, tHash) {

    if (error){
    let response = '{"status":"false","hash":"","error":"'+error+'"}';
    res.send(JSON.parse(response));
    }
    else {
    let response = '{"status":"true","hash":"'+tHash+'","error":""}';
    res.send(JSON.parse(response));
    }});
    } catch(err){
        console.log(err)
        let response = {status:false, message:"Unable to set tokenpool address, Please Try Again!!!"};
        res.send(response);
    }
},

setpurchaseableTokenAddress: async (req, res) => {
    try {
    var gasPrice = '0x09184e72a000';
    var gasLimit = 55000;
    var count = await web3.eth.getTransactionCount(req.body.fromAddress);
    var contract = await new web3.eth.Contract(abi,contractAddress,{from: req.body.fromAddress});    
    var chainId = 0x01;

    var rawTx = {
        "from": req.body.fromAddress,
        "nonce": "0x" + count.toString(16),
        "gasPrice": gasPrice,
        "gasLimit": gasLimit,
        "to": contractAddress,
        "value": "0x0", // Indication that we are not sending any ethers but our own tokens
        "data": contract.methods.setpurchaseableTokenAddress(req.body.address).encodeABI(),
        "chainId": chainId
    };

    var privKeyBuffer = new Buffer(req.body.privateKey, 'hex');
    const tx = new Txs(rawTx,{'chain':'ropsten'});
    tx.sign(privKeyBuffer);
    web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'), function(error, tHash) {

    if (error){
    let response = '{"status":"false","hash":"","error":"'+error+'"}';
    res.send(JSON.parse(response));
    }
    else {
    let response = '{"status":"true","hash":"'+tHash+'","error":""}';
    res.send(JSON.parse(response));
    }});
    } catch(err){
        console.log(err)
        let response = {status:false, message:"Unable to set Purchaseable token address, Please Try Again!!!"};
        res.send(response);
    }
},

setPriceOfToken: async (req, res) => {
    try {
    var gasPrice = '0x09184e72a000';
    var gasLimit = 55000;
    var count = await web3.eth.getTransactionCount(req.body.fromAddress);
    var contract = await new web3.eth.Contract(abi,contractAddress,{from: req.body.fromAddress});    
    var chainId = 0x01;

    var rawTx = {
        "from": req.body.fromAddress,
        "nonce": "0x" + count.toString(16),
        "gasPrice": gasPrice,
        "gasLimit": gasLimit,
        "to": contractAddress,
        "value": "0x0", // Indication that we are not sending any ethers but our own tokens
        "data": contract.methods.setPriceOfToken(req.body.price).encodeABI(),
        "chainId": chainId
    };

    var privKeyBuffer = new Buffer(req.body.privateKey, 'hex');
    const tx = new Txs(rawTx,{'chain':'ropsten'});
    tx.sign(privKeyBuffer);
    web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'), function(error, tHash) {

    if (error){
    let response = '{"status":"false","hash":"","error":"'+error+'"}';
    res.send(JSON.parse(response));
    }
    else {
    let response = '{"status":"true","hash":"'+tHash+'","error":""}';
    res.send(JSON.parse(response));
    }});
    } catch(err){
        console.log(err)
        let response = {status:false, message:"Unable to set Price of token, Please Try Again!!!"};
        res.send(response);
    }
},

setRewardPercentage: async (req, res) => {
    try {
    var gasPrice = '0x09184e72a000';
    var gasLimit = 55000;
    var count = await web3.eth.getTransactionCount(req.body.fromAddress);
    var contract = await new web3.eth.Contract(abi,contractAddress,{from: req.body.fromAddress});    
    var chainId = 0x01;

    var rawTx = {
        "from": req.body.fromAddress,
        "nonce": "0x" + count.toString(16),
        "gasPrice": gasPrice,
        "gasLimit": gasLimit,
        "to": contractAddress,
        "value": "0x0", // Indication that we are not sending any ethers but our own tokens
        "data": contract.methods.setRewardPercentage(req.body.percentage).encodeABI(),
        "chainId": chainId
    };

    var privKeyBuffer = new Buffer(req.body.privateKey, 'hex');
    const tx = new Txs(rawTx,{'chain':'ropsten'});
    tx.sign(privKeyBuffer);
    web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'), function(error, tHash) {

    if (error){
    let response = '{"status":"false","hash":"","error":"'+error+'"}';
    res.send(JSON.parse(response));
    }
    else {
    let response = '{"status":"true","hash":"'+tHash+'","error":""}';
    res.send(JSON.parse(response));
    }});
    } catch(err){
        console.log(err)
        let response = {status:false, message:"Unable to set Reward Percentage, Please Try Again!!!"};
        res.send(response);
    }
},

setPenaltyPercentage: async (req, res) => {
    try {
    var gasPrice = '0x09184e72a000';
    var gasLimit = 55000;
    var count = await web3.eth.getTransactionCount(req.body.fromAddress);
    var contract = await new web3.eth.Contract(abi,contractAddress,{from: req.body.fromAddress});    
    var chainId = 0x01;

    var rawTx = {
        "from": req.body.fromAddress,
        "nonce": "0x" + count.toString(16),
        "gasPrice": gasPrice,
        "gasLimit": gasLimit,
        "to": contractAddress,
        "value": "0x0", // Indication that we are not sending any ethers but our own tokens
        "data": contract.methods.setPenaltyPercentage(req.body.percentage).encodeABI(),
        "chainId": chainId
    };

    var privKeyBuffer = new Buffer(req.body.privateKey, 'hex');
    const tx = new Txs(rawTx,{'chain':'ropsten'});
    tx.sign(privKeyBuffer);
    web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'), function(error, tHash) {

    if (error){
    let response = '{"status":"false","hash":"","error":"'+error+'"}';
    res.send(JSON.parse(response));
    }
    else {
    let response = '{"status":"true","hash":"'+tHash+'","error":""}';
    res.send(JSON.parse(response));
    }});
    } catch(err){
        console.log(err)
        let response = {status:false, message:"Unable to set Penalty Percentage, Please Try Again!!!"};
        res.send(response);
    }
},

setReferralAddress: async (req, res) => {
    try {
    var gasPrice = '0x09184e72a000';
    var gasLimit = 55000;
    var count = await web3.eth.getTransactionCount(req.body.fromAddress);
    var contract = await new web3.eth.Contract(abi,contractAddress,{from: req.body.fromAddress});    
    var chainId = 0x01;

    var rawTx = {
        "from": req.body.fromAddress,
        "nonce": "0x" + count.toString(16),
        "gasPrice": gasPrice,
        "gasLimit": gasLimit,
        "to": contractAddress,
        "value": "0x0", // Indication that we are not sending any ethers but our own tokens
        "data": contract.methods.setReferralAddress(req.body.referralAddress).encodeABI(),
        "chainId": chainId
    };

    var privKeyBuffer = new Buffer(req.body.privateKey, 'hex');
    const tx = new Txs(rawTx,{'chain':'ropsten'});
    tx.sign(privKeyBuffer);
    web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'), function(error, tHash) {

    if (error){
    let response = '{"status":"false","hash":"","error":"'+error+'"}';
    res.send(JSON.parse(response));
    }
    else {
    let response = '{"status":"true","hash":"'+tHash+'","error":""}';
    res.send(JSON.parse(response));
    }});
    } catch(err){
        console.log(err)
        let response = {status:false, message:"Unable to set Referral Address, Please Try Again!!!"};
        res.send(response);
    }
},

setReferralAmount: async (req, res) => {
    try {
    var gasPrice = '0x09184e72a000';
    var gasLimit = 55000;
    var count = await web3.eth.getTransactionCount(req.body.fromAddress);
    var contract = await new web3.eth.Contract(abi,contractAddress,{from: req.body.fromAddress});    
    var chainId = 0x01;

    var rawTx = {
        "from": req.body.fromAddress,
        "nonce": "0x" + count.toString(16),
        "gasPrice": gasPrice,
        "gasLimit": gasLimit,
        "to": contractAddress,
        "value": "0x0", // Indication that we are not sending any ethers but our own tokens
        "data": contract.methods.setReferralAmount(req.body.amount).encodeABI(),
        "chainId": chainId
    };

    var privKeyBuffer = new Buffer(req.body.privateKey, 'hex');
    const tx = new Txs(rawTx,{'chain':'ropsten'});
    tx.sign(privKeyBuffer);
    web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'), function(error, tHash) {

    if (error){
    let response = '{"status":"false","hash":"","error":"'+error+'"}';
    res.send(JSON.parse(response));
    }
    else {
    let response = '{"status":"true","hash":"'+tHash+'","error":""}';
    res.send(JSON.parse(response));
    }});
    } catch(err){
        console.log(err)
        let response = {status:false, message:"Unable to set Referral Amount, Please Try Again!!!"};
        res.send(response);
    }
},

setClaimTokens: async (req, res) => {
    try {
    var gasPrice = '0x09184e72a000';
    var gasLimit = 55000;
    var count = await web3.eth.getTransactionCount(req.body.fromAddress);
    var contract = await new web3.eth.Contract(abi,contractAddress,{from: req.body.fromAddress});    
    var chainId = 0x01;

    var rawTx = {
        "from": req.body.fromAddress,
        "nonce": "0x" + count.toString(16),
        "gasPrice": gasPrice,
        "gasLimit": gasLimit,
        "to": contractAddress,
        "value": "0x0", // Indication that we are not sending any ethers but our own tokens
        "data": contract.methods.setClaimTokens(req.body.token).encodeABI(),
        "chainId": chainId
    };

    var privKeyBuffer = new Buffer(req.body.privateKey, 'hex');
    const tx = new Txs(rawTx,{'chain':'ropsten'});
    tx.sign(privKeyBuffer);
    web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'), function(error, tHash) {

    if (error){
    let response = '{"status":"false","hash":"","error":"'+error+'"}';
    res.send(JSON.parse(response));
    }
    else {
    let response = '{"status":"true","hash":"'+tHash+'","error":""}';
    res.send(JSON.parse(response));
    }});
    } catch(err){
        console.log(err)
        let response = {status:false, message:"Unable to set Claim Token, Please Try Again!!!"};
        res.send(response);
    }
},

performStakingToken: async (req, res) => {
    try {
    var gasPrice = '0x09184e72a000';
    var gasLimit = 55000;
    var count = await web3.eth.getTransactionCount(req.body.fromAddress);
    var contract = await new web3.eth.Contract(abi,contractAddress,{from: req.body.fromAddress});    
    var chainId = 0x01;

    var rawTx = {
        "from": req.body.fromAddress,
        "nonce": "0x" + count.toString(16),
        "gasPrice": gasPrice,
        "gasLimit": gasLimit,
        "to": contractAddress,
        "value": "0x0", // Indication that we are not sending any ethers but our own tokens
        "data": contract.methods.performStaking(req.body.time,req.body.amount).encodeABI(),
        "chainId": chainId
    };

    var privKeyBuffer = new Buffer(req.body.privateKey, 'hex');
    const tx = new Txs(rawTx,{'chain':'ropsten'});
    tx.sign(privKeyBuffer);
    web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'), function(error, tHash) {

    if (error){
    let response = '{"status":"false","hash":"","error":"'+error+'"}';
    res.send(JSON.parse(response));
    }
    else {
    let response = '{"status":"true","hash":"'+tHash+'","error":""}';
    res.send(JSON.parse(response));
    }});
    } catch(err){
        console.log(err)
        let response = {status:false, message:"Unable to perform staking of token, Please Try Again!!!"};
        res.send(response);
    }
},

withdrawStakingToken: async (req, res) => {
    try {
    var gasPrice = '0x09184e72a000';
    var gasLimit = 55000;
    var count = await web3.eth.getTransactionCount(req.body.fromAddress);
    var contract = await new web3.eth.Contract(abi,contractAddress,{from: req.body.fromAddress});    
    var chainId = 0x01;

    var rawTx = {
        "from": req.body.fromAddress,
        "nonce": "0x" + count.toString(16),
        "gasPrice": gasPrice,
        "gasLimit": gasLimit,
        "to": contractAddress,
        "value": "0x0", // Indication that we are not sending any ethers but our own tokens
        "data": contract.methods.withdrawStakedTokens(req.body.stakingId).encodeABI(),
        "chainId": chainId
    };

    var privKeyBuffer = new Buffer(req.body.privateKey, 'hex');
    const tx = new Txs(rawTx,{'chain':'ropsten'});
    tx.sign(privKeyBuffer);
    web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'), function(error, tHash) {

    if (error){
    let response = '{"status":"false","hash":"","error":"'+error+'"}';
    res.send(JSON.parse(response));
    }
    else {
    let response = '{"status":"true","hash":"'+tHash+'","error":""}';
    res.send(JSON.parse(response));
    }});
    } catch(err){
        console.log(err)
        let response = {status:false, message:"Unable to withdraw Staking token, Please Try Again!!!"};
        res.send(response);
    }
},

withdrawPurchasedToken: async (req, res) => {
    try {
    var gasPrice = '0x09184e72a000';
    var gasLimit = 55000;
    var count = await web3.eth.getTransactionCount(req.body.fromAddress);
    var contract = await new web3.eth.Contract(abi,contractAddress,{from: req.body.fromAddress});    
    var chainId = 0x01;

    var rawTx = {
        "from": req.body.fromAddress,
        "nonce": "0x" + count.toString(16),
        "gasPrice": gasPrice,
        "gasLimit": gasLimit,
        "to": contractAddress,
        "value": "0x0", // Indication that we are not sending any ethers but our own tokens
        "data": contract.methods.withdrawPurchasedToken().encodeABI(),
        "chainId": chainId
    };

    var privKeyBuffer = new Buffer(req.body.privateKey, 'hex');
    const tx = new Txs(rawTx,{'chain':'ropsten'});
    tx.sign(privKeyBuffer);
    web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'), function(error, tHash) {

    if (error){
    let response = '{"status":"false","hash":"","error":"'+error+'"}';
    res.send(JSON.parse(response));
    }
    else {
    let response = '{"status":"true","hash":"'+tHash+'","error":""}';
    res.send(JSON.parse(response));
    }});
    } catch(err){
        console.log(err)
        let response = {status:false, message:"Unable to withdraw purchased token, Please Try Again!!!"};
        res.send(response);
    }
},

withdrawReferral: async (req, res) => {
    try {
    var gasPrice = '0x09184e72a000';
    var gasLimit = 55000;
    var count = await web3.eth.getTransactionCount(req.body.fromAddress);
    var contract = await new web3.eth.Contract(abi,contractAddress,{from: req.body.fromAddress});    
    var chainId = 0x01;

    var rawTx = {
        "from": req.body.fromAddress,
        "nonce": "0x" + count.toString(16),
        "gasPrice": gasPrice,
        "gasLimit": gasLimit,
        "to": contractAddress,
        "value": "0x0", // Indication that we are not sending any ethers but our own tokens
        "data": contract.methods.withdrawReferral(req.body.address).encodeABI(),
        "chainId": chainId
    };

    var privKeyBuffer = new Buffer(req.body.privateKey, 'hex');
    const tx = new Txs(rawTx,{'chain':'ropsten'});
    tx.sign(privKeyBuffer);
    web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'), function(error, tHash) {

    if (error){
    let response = '{"status":"false","hash":"","error":"'+error+'"}';
    res.send(JSON.parse(response));
    }
    else {
    let response = '{"status":"true","hash":"'+tHash+'","error":""}';
    res.send(JSON.parse(response));
    }});
    } catch(err){
        console.log(err)
        let response = {status:false, message:"Unable to withdraw referral by address, Please Try Again!!!"};
        res.send(response);
    }
},

}