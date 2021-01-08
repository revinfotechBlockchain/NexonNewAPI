var express = require('express');
var config = require('../routes/config.json');
var Txs = require('ethereumjs-tx').Transaction;
var request = require("request");
var Web3 = require('web3');
var cron = require('node-cron');
const httpEndPoint = config.connectionURL;
var web3 = new Web3(new Web3.providers.HttpProvider(httpEndPoint));
const contractAddress = config.contractAddress;
const etherscanEndPoint = config.etherscanEndPoint;
const abi = require('../controller/abi.json');
const axios = require('axios');
const mongoose = require('mongoose');
var db = require('../db/db.js');
const cryptoRandomString = require('crypto-random-string');

//DataBase Models
const BTCDatabase = mongoose.model('BTCDatabase');
const UserAddressAndStakeID = mongoose.model('UserAddressAndStakeID');
const TransformTokens = mongoose.model('TransformTokens');
const referalManager = mongoose.model('ReferalManager');
const NexDatabase = mongoose.model('NexDatabase');

const funct = {
    async getTotalStakedAmount (){
        let totalStakeAmount = 0;
        try{
            await UserAddressAndStakeID.find({}, (err, docs) => {
                if (!err) {
                    docs.forEach(element => {
                        console.log(element.TokenTransactionstatus)
                        
                        totalStakeAmount=totalStakeAmount + parseFloat(element.StakerTokens)
                    });
                }
                else {
                    //console.log({error :'Error in getting details :' + err});
                    totalStakeAmount = 0
                }
            });
        }
        catch(err){
            console.log("Error: ", err);
            return 0;
        }

        return totalStakeAmount;
    }
}

//Modules exporter

// cron.schedule('30 * * * * *', async () => {
//     console.log("Cron for Staker executed")
//     var startUpdatesIndex = 1;
//     var newContract = await new web3.eth.Contract(abi, contractAddress);
//     await newContract && newContract.methods.getStakingCount().call().then(async output => {
//         for (i = startUpdatesIndex; i <= output.toString(); i++) {
//             var id = i;
//             await newContract.methods.getTokenLockstatus(id).call().then(async out => {
//                 await newContract.methods.getStakingTokenById(id).call().then(async out1 => {
//                     await newContract.methods.getStakingStartTimeById(id).call().then(async out2 => {
//                         await newContract.methods.getStakingEndTimeById(id).call().then(async out3 => {
//                             await newContract.methods.getActiveStakesById(id).call().then(async out4 => {
//                                 if (out4.toString() != '', out3.toString() != '', out2.toString() != '', out1.toString() != '', out.toString() != '')
//                                     var obj = { StakeId: id, StakerAddress: out4.toString(), StakingStartTime: out2.toString(), StakingEndTime: out3.toString(), StakerTokens: (out1.toString() / 1000000000000000000).toFixed(6), TokenTransactionstatus: out.toString(), Amount: 0, Interest: 0, BigPayDay: 0, Shares: 0 };
//                                     console.log("obj: ", obj.StakingStartTime, obj.StakingEndTime)
//                                     if( obj.StakingEndTime - obj.StakingStartTime ==31536000){
//                                         console.log("here")
//                                         await NexDatabase.findOneAndUpdate({ StakeId: id }, obj, { new: true, upsert: true }, (err, doc) => {
//                                             if (!err) {
//                                                 startUpdatesIndex = 1;
//                                                 console.log("New Entry Added in performClaim Corn")
//                                             }
//                                             else {
//                                                 console.log({ error: 'Error during Json insertion insertion performClaim : ' + err });
//                                             }
//                                         });

//                                     } else {
//                                         console.log("mmhere")
//                                         await UserAddressAndStakeID.findOneAndUpdate({ StakeId: id }, obj, { new: true, upsert: true }, (err, doc) => {
//                                             if (!err) {
//                                                 startUpdatesIndex = 1;
//                                                 console.log("New Entry Added in Staker Corn")
//                                             }
//                                             else {
//                                                 console.log({ error: 'Error during Json insertion insertion normal stake : ' + err });
//                                             }
//                                         });

//                                     }
                                    
//                             }).catch(err => {
//                                 console.log(err);
//                             });
//                         }).catch(err => {
//                             console.log(err);
//                         });
//                     }).catch(err => {
//                         console.log(err);
//                     });
//                 }).catch(err => {
//                     console.log(err);
//                 });
//             }).catch(err => {
//                 console.log(err);
//             });
//         }
//     }).catch(err => {
//         console.log(err);
//     });
// });

// cron.schedule('30 * * * * *', async () => {
//     console.log("Cron for BTC Claim tokens")
//     var startUpdatesIndex = 1;
//     var newContract = await new web3.eth.Contract(abi, contractAddress);
//     await newContract && newContract.methods.getBTCClaimCount().call().then(async output => {
//         for (i = startUpdatesIndex; i <= output.toString(); i++) {
//             var id = i;
//             await newContract.methods.getUserAddressForClaimBTC(id).call().then(async out => {
//                 await newContract.methods.getClaimedBTCAddress(id).call().then(async out1 => {
//                     await newContract.methods.getRawBTCAmount(id).call().then(async out2 => {
//                         await newContract.methods.getClaimedAmountByBTC(id).call().then(async out3 => {
//                             await newContract.methods.getDateOfClaimBTC(id).call().then(async out4 => {
//                                 if (out4 != '', out3 != '', out2 != '', out1 != '', out != '')
//                                     var obj = { Id: id, Day: out4.toString(), BTCAddress: out1, BTCAmount: out2.toString(), ClaimRYZ: out3.toString(), UserTronAddress: out }
//                                 await BTCDatabase.findOneAndUpdate({ Id: id }, obj, { new: true, upsert: true }, (err, doc) => {
//                                     if (!err) {
//                                         startUpdatesIndex = 1;
//                                         console.log("New Entry Added in BTC claim")
//                                     }
//                                     else {
//                                         console.log({ error: 'Error during Json insertion insertion : ' + err });
//                                     }
//                                 });
//                             }).catch(err => {
//                                 console.log(err);
//                             });
//                         }).catch(err => {
//                             console.log(err);
//                         });
//                     }).catch(err => {
//                         console.log(err);
//                     });
//                 }).catch(err => {
//                     console.log(err);
//                 });
//             }).catch(err => {
//                 console.log(err);
//             });
//         }
//     }).catch(err => {
//         console.log(err);
//     });
// });


// cron.schedule('30 * * * * *', async () => {
//     console.log("Cron for BTC Claim tokens")
//     var startUpdatesIndex = 1;
//     var newContract = await new web3.eth.Contract(abi, contractAddress);
//     await newContract && newContract.methods.getBTCClaimCount().call().then(async output => {
//         for (i = startUpdatesIndex; i <= output.toString(); i++) {
//             var id = i;
//             await newContract.methods.getUserAddressForClaimBTC(id).call().then(async out => {
//                 await newContract.methods.getClaimedBTCAddress(id).call().then(async out1 => {
//                     await newContract.methods.getRawBTCAmount(id).call().then(async out2 => {
//                         await newContract.methods.getClaimedAmountByBTC(id).call().then(async out3 => {
//                             await newContract.methods.getDateOfClaimBTC(id).call().then(async out4 => {
//                                 if (out4 != '', out3 != '', out2 != '', out1 != '', out != '')
//                                     var obj = { Id: id, Day: out4.toString(), BTCAddress: out1, BTCAmount: out2.toString(), ClaimRYZ: out3.toString(), UserTronAddress: out }
//                                 await BTCDatabase.findOneAndUpdate({ Id: id }, obj, { new: true, upsert: true }, (err, doc) => {
//                                     if (!err) {
//                                         startUpdatesIndex = 1;
//                                         console.log("New Entry Added in BTC claim")
//                                     }
//                                     else {
//                                         console.log({ error: 'Error during Json insertion insertion : ' + err });
//                                     }
//                                 });
//                             }).catch(err => {
//                                 console.log(err);
//                             });
//                         }).catch(err => {
//                             console.log(err);
//                         });
//                     }).catch(err => {
//                         console.log(err);
//                     });
//                 }).catch(err => {
//                     console.log(err);
//                 });
//             }).catch(err => {
//                 console.log(err);
//             });
//         }
//     }).catch(err => {
//         console.log(err);
//     });
// });

// cron.schedule('0 0 0 * * *', async () => {
//     let date_ob = new Date();
//     var indexDate = 0;
//     await TransformTokens.find().sort({ Day: -1 }).limit(1).then(
//         async function (doc) {
//             if (doc != '') {
//                 var raw = doc[0].Day
//                 indexDate = parseInt(raw) + 1;
//             }
//             else {
//                 indexDate = 0;
//             }
//             var newContract = await new web3.eth.Contract(abi, contractAddress);
//             await newContract && newContract.methods.getpurchaseableTokensAddress().call().then(async out3 => {
//                 await newContract.methods.balanceOf(out3.toString()).call().then(async out4 => {
//                     await newContract.methods.getTotalETH().call().then(async out1 => {
//                         await newContract.methods.getPriceToken().call().then(async out2 => {
//                             var transformTokens = new TransformTokens();
//                             transformTokens.Day = indexDate;
//                             transformTokens.NEXONAvailable = (parseInt(out4) / 1000000000000000000).toFixed(6);
//                             transformTokens.TotalETH = (parseInt(out1) / 1000000000000000000).toFixed(6);
//                             transformTokens.NEXONETH = parseInt(out2);
//                             transformTokens.Closing = 0;
//                             transformTokens.YourNEXON = 0;
//                             transformTokens.YourETH = 0;
//                             await transformTokens.save({ Day: indexDate }, (err, doc) => {
//                                 if (!err) {
//                                     startUpdatesIndex = 0;
//                                     console.log({ response: 'update successful for transform cron!!' });
//                                 }
//                                 else {
//                                     console.log({ error: 'Error during Json insertion insertion : ' + err });
//                                 }
//                             });
//                         });
//                     });
//                 });
//             });
//         });
// });

module.exports = {

    //API for Transform
    getServerTime: async (req, res) => {
        let date_ob = new Date();
        res.send({ Hours: 24 - date_ob.getHours(), Min: 60 - date_ob.getMinutes(), Sec: 60 - date_ob.getSeconds() });
    },
    getContractAddress: async (req, res) => {
        res.send({ status: true, address: contractAddress });
    },
    getAvailableNEXONForTransform: async (req, res) => {
        var newContract = await new web3.eth.Contract(abi, contractAddress);
        await newContract && newContract.methods.getpurchaseableTokens().call().then(async output => {
            console.log(output)
            let response = { status: true, purchaseableTokens: output.toString() };
            res.send(response);
        }).catch(err => {
            let response = { status: false, message: "Unable to get purchaseable Tokens, Try Again!!!" };
            res.send(response);
        });
    },
    getTokenTransactionsByAddress: async (req, res) => {
        var newContract = await new web3.eth.Contract(abi,contractAddress);
        //var ourTokenSymbol = await newContract.methods.symbol().call();
        var returnData = [];
        if (req.query.address && !req.query.address == "") {
            axios.get('http://'+etherscanEndPoint+'/api?module=account&action=tokentx&address=' + req.query.address + '&startblock=0&endblock=999999999&sort=asc&apikey=USNTIVWHFS61PXX3NA4ZGJ4EE7ITT2SHDU').then(output => {
                //console.log(output.data)
                var out = output.data.result;
                // res.send(out)
                var dataArray = [];
                out.forEach(element => {
                if(element.contractAddress == contractAddress){
                    if(web3.utils.toChecksumAddress(element.from) == req.query.address){
                        var final =   {
                            from:element.from,
                            address:element.to,
                            day:element.timeStamp,
                            amount:(element.value/1000000000000000000).toFixed(20),
                            type:"Transfer",
                            txid:element.hash
                            }
                             dataArray.push(final)   
                    } else if(web3.utils.toChecksumAddress(element.to) == req.query.address) {
                        var final =   {
                            from:element.from,
                            address:element.to,
                            day:element.timeStamp,
                            amount:(element.value/1000000000000000000).toFixed(20),
                            type:"Recieve",
                            txid:element.hash
                            }
                             dataArray.push(final)   
                    } else {
                        var final =   {
                            from:element.from,
                            address:element.to,
                            day:element.timeStamp,
                            amount:(element.value/1000000000000000000).toFixed(20),
                            type:"Unknown",
                            txid:element.hash
                            }
                             dataArray.push(final)   
                    }
                 
                }
                });
                // dataArray = [{
                //     from: '0xDA8e0A7e294e902446CA352CCB7B08e3E2E8F3EA',
                //     address: '0xDA8e0A7e294e902446C5332CCB7B08e3E2E8F3EA',
                //     day: 1602055327,
                //     amount: 1000000000000000000,
                //     type: "Transfer",
                //     txid: '0xDA8e0A7e294e902446CA335CCB7B08e3E2E8F3EA'
                // }]
                res.send({ status: true, address: req.query.address, data: dataArray })
            }).catch(err => {
                let response = { status: false, message: "Unable to get Transaction Details, Try Again!!!" };
                res.send(response);
            });
        } else {
            let response = { status: false, message: "Enter valid Address & Try Again!!!" };
            res.send(response);
        }
    },
    getTotalEth: async (req, res) => {
        var newContract = await new web3.eth.Contract(abi, contractAddress);
        await newContract && newContract.methods.getTotalEth().call().then(async output => {
            let response = { status: true, address: output.toString() };
            res.send(response);
        }).catch(err => {
            let response = { status: false, message: "Unable to get total ETH, Please Try Again!!!" };
            res.send(response);
        });
    },
    getTrxBalance: async (req, res) => {
        if (req.query.address && !req.query.address == "") {
            res.send({ balance: await web3.eth.getBalance(req.query.address) / 1000000000000000000 })
        } else {
            let response = { status: false, message: "Enter valid Address & Try Again!!!" };
            res.send(response);
        }
    },
    getTokenBalance: async (req, res) => {
        var newContract = await new web3.eth.Contract(abi, contractAddress);
        if (req.query.address && !req.query.address == "") {
            await newContract && newContract.methods.balanceOf(req.query.address).call().then(async output => {
                let response = { status: true, address: req.query.address, balance: output.toString() / 1000000000000000000 };
                res.send(response);
            }).catch(err => {
                let response = { status: false, message: "Unable to get Owner balance, Try Again!!!" };
                res.send(response);
            });
        } else {
            let response = { status: false, message: "Enter valid Address & Try Again!!!" };
            res.send(response);
        }
    },
    getTokenPrice: async (req, res) => {
        var newContract = await new web3.eth.Contract(abi, contractAddress);
        await newContract && newContract.methods.getPriceToken().call().then(async output => {
            let response = { status: true, priceOfToken: output / 100 };
            res.send(response);
        }).catch(err => {
            let response = { status: false, message: "Unable to get price of Tokens, Try Again!!!" };
            res.send(response);
        });
    },
    withdrawMyPurchasedTokens: async (req, res) => {
        if (req.body.privateKey && !req.body.privateKey == "") {
            var newContract = await new web3.eth.Contract(abi, contractAddress);
            await newContract && newContract.methods.getMyPurchasedTokens().send().then(async output => {
                res.send(output);
            }).catch(err => {
                let response = { status: false, message: "Unable to get purchased token, Please Try Again!!!" };
                res.send(response);
            });
        } else {
            let response = { status: false, message: "Enter Valid Private Key & Try Again!!!" };
            res.send(response);
        }
    },


    //API for Referral
    getReferalLinkByAddress: async (req, res) => {
        var referalCode = cryptoRandomString({ length: 32, type: 'numeric' });
        var ReferalManager = new referalManager();
        if (req.query.address != "") {
            ReferalManager.UserAddress = req.query.address;
            ReferalManager.Used = false;
            ReferalManager.Date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            ReferalManager.UsedAddress = "0";
            ReferalManager.ReferalCode = referalCode;
            ReferalManager.Amount = 0;
            ReferalManager.Details = "Not Used"
            ReferalManager.save((err, doc) => {
                if (!err)
                    console.log({ response: 'update successful!!' });
                else {
                    console.log({ error: 'Error during Json insertion insertion : ' + err });
                }
            });
        }
        res.send({ referralLink: "https://www.nexon.io?r=" + req.query.address + "/" + referalCode })
    },
    getAllReferalsByAddress: async (req, res) => {
        let obj = [];
        referalManager.find((err, docs) => {
            if (!err) {
                res.send(docs);
            }
            else {
            }
        });
    },

    getReferralAmount: async (req, res) => {
        var newContract = await new web3.eth.Contract(abi, contractAddress);
        await newContract && newContract.methods.getReferralAmount().call().then(async output => {
            let response = { status: true, amount: output.toString() };
            res.send(response);
        }).catch(err => {
            let response = { status: false, message: "Unable to get Referral Amount, Try Again!!!" };
            res.send(response);
        });
    },
    getReferralHistory: async (req, res) => {
        var obj = [];
        var query = { UserAddress: req.query.address }
        referalManager.find(query).then(data => {
            if (data == null) {
                res.send({ status: false, response: "No referral" })
            }
            else if (data != null) {
                res.send({ status: true, response: data })
            }
            //console.log(data);
        });
    },
    withdrawReferral: async (req, res) => {
        try {
            var obj = [];
            var address = req.body.referralLink;
            var spl = (address.split("="));
            var spl2 = spl[1].split("/");
            var addr = spl2[0];
            var query = { ReferalCode: spl2[1] }
            var query2 = { UsedAddress: addr }
            referalManager.findOne(query).then(async data => {
                referalManager.findOne(query2).then(async data2 => {
                    console.log("This is data and data2", data, data2, req.body.address)
                    if (!data || addr == req.body.address) {
                        res.send({ status: false, response: "Invalid Referral Code" });
                    }
                    else if (data.Used == true) {
                        res.send({ status: false, response: "Referral Link Already Used" });
                    }
                    else if (data.Used == false) {
                        console.log("Here you are1")
                        var newContract = await new web3.eth.Contract(abi, contractAddress);
                        if (addr && !addr == "") {
                            await newContract && newContract.methods.getReferralAmount().call().then(async amnt => {
                                referalManager.updateOne(query, {
                                    UserAddress: data.UserAddress,
                                    Used: true,
                                    Date: data.Date,
                                    UsedAddress: req.body.address,
                                    ReferalCode: data.ReferalCode,
                                    Amount: amnt,
                                    Details: 'Used',
                                }, function (err, resp) {
                                    if (!err) {
                                        let response = { status: true, message: "You can proceed with the refer!!!", ReferralAddress: addr };
                                        console.log(response)
                                        res.send(response);
                                        console.log("1 document updated");
                                    }
                                    else {
                                        console.log(err)
                                        let response = { status: false, message: "Invalid or Expired Referral Code!!!" };
                                        console.log(response)
                                        res.send(response);
                                    }
                                });

                            }).catch(err => {
                                let response = { status: false, message: "Unable to Withdraw Referral Amount, Please Try Again!!!" };
                                console.log(response, err)
                                res.send(response);
                            });
                        } else {
                            let response = { status: false, message: "Invalid or Expired Referral Code!!!" };
                            console.log(response)
                            res.send(response);
                        }
                    }
                    else {
                        res.send({ status: false, response: "Invalid or Expired Referral Code or Code already used!!!" })
                    }
                    console.log(data);
                });
            });
        }
        catch (err) {
            console.log(err)
            res.send({ status: false, response: "Invalid or Expired Referral Code!!!" })
        }
    },

    deleteRecord: async (req, res) => {
        referalManager.remove((err, doc) => {
            if (!err) { res.send({ response: 'Deleted Successful' }); }
            else {
            }
        })
    },





    //API for Stakes and addresses
    getAllStakesById: async (req, res) => {
        let obj = [];
        UserAddressAndStakeID.find((err, docs) => {
            if (!err) {
                res.send(docs);
            }
            else {
                //console.log({error :'Error in getting details :' + err});
            }
        });
    },
    getAllStakesCount: async (req, res) => {
        let obj = [];
        let i=0,j=0, totalStakeAmount=0, totalUnstakeAmount=0;
        UserAddressAndStakeID.find((err, docs) => {
            if (!err) {
                docs.forEach(element => {
                    console.log(element.TokenTransactionstatus)
                    if (element.TokenTransactionstatus == 'false') {
                        i++;
                        if(element.StakingStartTime>Date.now()/1000 - 604800){
                            totalStakeAmount+=element.StakerTokens;
                        }
                    } else {
                        j++;
                        if(element.StakingEndTime>Date.now()/1000 - 604800){
                            totalUnstakeAmount+=element.StakerTokens;
                        }
                    }
                });
                return res.status(200).json({
                    success:true,
                    totalActiveStakes: i,
                    totalStakesHistory: j,
                    totalUsersStakes: i+j,
                    totalStakeAmountWeekly: totalStakeAmount,
                    totalUnstakeAmountWeekly: totalUnstakeAmount
                })
            }
            else {
                console.log({error :'Error in getting details :' + err});
                return res.status(200).json({
                    error:true,
                    message: err
                })
            }
        });
    },
    getTradingVolume: async (req, res) => {
        try{
            let dailyOutput =await axios.get('https://api.coingecko.com/api/v3/coins/ethereum/contract/'+contractAddress+'/market_chart/?vs_currency=usd&days=1')
            let weeklyOutput =await axios.get('https://api.coingecko.com/api/v3/coins/ethereum/contract/'+contractAddress+'/market_chart/?vs_currency=usd&days=7')
            let fullOutput =await axios.get('https://api.coingecko.com/api/v3/coins/ethereum/contract/'+contractAddress+'/market_chart/?vs_currency=usd&days=30')
            //console.log(output.data.total_volumes[0][1]);
                res.status(200).json({
                    tradeVolumeDaily: dailyOutput.data.total_volumes[0][1],
                    tradeVolumeMonthly: weeklyOutput.data.total_volumes[0][1],
                    tradeVolumeFull: fullOutput.data.total_volumes[0][1]
                });

        } catch (error) {
            console.log(error, "error in getTradingVolume");
            res.status(200).json({
                success: false,
                message: error.toString(),
                reason: 'Could not find coin with the given id',
                tradeVolumeDaily: 0,
                tradeVolumeMonthly: 0,
                tradeVolumeFull: 0
            })
        }
    },
    deleteRecordByStakeId: async (req, res) => {
        UserAddressAndStakeID.remove((err, doc) => {
            if (!err) { res.send({ response: 'Deleted Successful' }); }
            else {
                //console.log({error :'Error during record update : ' + err});
            }
        })
    },

    getActiveStakesByUserAddress: async (req, res) => {
        let totalStakeAmount = await funct.getTotalStakedAmount();
        var newContract = await new web3.eth.Contract(abi, contractAddress);
        await newContract && newContract.methods.getRewardPercentage().call().then(async output => {
            let obj = [];
            let i =0;
            UserAddressAndStakeID.find({ StakerAddress: req.query.address }, (err, docs) => {
                if (!err) {
                    docs.forEach(element => {
                        console.log(element.TokenTransactionstatus)
                        if (element.TokenTransactionstatus == 'false') {
                            i++;
                            //element.Interest = (parseFloat(output) / 100).toFixed(6);
                            element.Shares = (parseFloat(element.StakerTokens)*100/parseFloat(totalStakeAmount)).toFixed(6);
                            element.Interest = ((parseFloat(element.StakerTokens) * (parseFloat(output)).toFixed(6)) / 10000 * (element.StakingEndTime - element.StakingStartTime) / 86400).toFixed(6);
                            // element.Amount = (((parseInt(element.StakerTokens) * output )/10000) * Math.floor((parseInt(element.StakingEndTime) - Math.floor(new Date() / 1000))/86400)).toFixed(6)
                            if (element.StakingEndTime / 86400 > Date.now() / 86400000)
                                element.Amount = (parseFloat(element.StakerTokens) + (parseFloat(element.StakerTokens) * (parseFloat(output)).toFixed(6)) / 10000 * (element.StakingEndTime - Date.now() / 1000) / 86400).toFixed(6);
                            else
                                element.Amount = (parseFloat(element.StakerTokens) + (parseFloat(element.StakerTokens) * (parseFloat(output)).toFixed(6)) / 10000 * (element.StakingEndTime - element.StakingStartTime) / 86400).toFixed(6);
                            obj.push(element)
                        }
                    });
                    //let totalActiveStakes = i;
                    return res.status(200).json({
                        success:true,
                        obj: obj,
                        totalActiveStakes: i
                    })
                }
                else {
                    //console.log({error :'Error in getting details :' + err});
                    return res.status(200).json({
                        success:false,
                        obj: err
                        })
                }
            });
        });
    },

    getStakeHistoryByUserAddress: async (req, res) => {
        try {
            console.log("hehehoo")
            let totalStakeAmount = await funct.getTotalStakedAmount();
            var newContract = await new web3.eth.Contract(abi, contractAddress);
            await newContract && newContract.methods.getRewardPercentage().call().then(async output => {
                UserAddressAndStakeID.find({ StakerAddress: req.query.address }, async (err, docs) => {
                    console.log("docs: ", docs)
                    if (!err) {
                        let obj = [];
                        var itx = 0;
                        let i = 0;
                        docs.forEach(async element => {
                            console.log("new docs new ")
                            if (element.TokenTransactionstatus != 'false') {
                                i++;
                                newContract && newContract.methods.getFinalWithdrawlStake(element.StakeId).call().then(async out2 => {
                                    element.Interest = ((parseFloat(element.StakerTokens) * (parseFloat(output)).toFixed(6)) / 10000 * (element.StakingEndTime - element.StakingStartTime) / 86400).toFixed(6);
                                    element.Shares = (parseFloat(element.StakerTokens)*100/parseFloat(totalStakeAmount)).toFixed(6);
                                    element.Amount = out2.toString() / 1000000000000000000;
                                    //   element.Amount = (parseFloat(element.StakerTokens) + ((element.StakerTokens * output)/10000) * (element.StakingEndTime - element.StakingStartTime)/86400).toFixed(6);
                                    //   element.Amount = (element.StakerTokens * output.toString()/100 * (element.StakingEndTime - element.StakingStartTime)/86400).toFixed(6);
                                    // console.log("This is the element", element)
                                    obj.push(element);
                                    console.log(obj)
                                    console.log(docs.length, parseInt(itx) + 1)
                                    // if (docs.length == parseInt(itx) + 1) {
                                    //     // console.log(obj)

                                    //     res.send(obj);
                                    // }
                                    itx = parseInt(itx) + 1;
                                }).catch(err => {
                                    console.log(err)
                                });
                            }
                            else {
                                itx = parseInt(itx) + 1;
                            }
                        });

                        return res.status(200).json({
                        success:true,
                        obj: obj,
                        totalStakesHistory: i
                        })
                        
                    }
                    else {
                        console.log({ error: 'Error in getting details :' + err });
                        return res.status(200).json({
                            success:false,
                            obj: err
                            })
                    }
                });
                // 
            });
        }
        catch (err) {
            console.log(err)
            return res.status(200).json({
                success:false,
                obj: err
                })
        }
    },
    getClaimsByUserAddress: async (req, res) => {
        var newContract = await new web3.eth.Contract(abi, contractAddress);
        await newContract && newContract.methods.getRewardPercentage().call().then(async output => {
            let obj = [];
            NexDatabase.find({ StakerAddress: req.query.address }, (err, docs) => {
                if (!err) {
                    docs.forEach(element => {
                        console.log(element.TokenTransactionstatus)
                        //if (element.TokenTransactionstatus == 'false') {
                            element.Interest = ((parseFloat(element.StakerTokens) * (parseFloat(output)).toFixed(6)) / 10000 * (element.StakingEndTime - element.StakingStartTime) / 86400).toFixed(6);

                            // element.Amount = (((parseInt(element.StakerTokens) * output )/10000) * Math.floor((parseInt(element.StakingEndTime) - Math.floor(new Date() / 1000))/86400)).toFixed(6)
                            // if (element.StakingEndTime / 86400 > Date.now() / 86400000)
                            //     element.Amount = (parseFloat(element.StakerTokens) + (parseFloat(element.StakerTokens) * (parseFloat(output)).toFixed(6)) / 10000 * (element.StakingEndTime - Date.now() / 1000) / 86400).toFixed(6);
                            // else
                                element.Amount = (parseFloat(element.StakerTokens) + (parseFloat(element.StakerTokens) * (parseFloat(output)).toFixed(6)) / 10000 * (element.StakingEndTime - element.StakingStartTime) / 86400).toFixed(6);
                            obj.push(element)
                        //}
                    });
                    res.send(obj);
                }
                else {
                    //console.log({error :'Error in getting details :' + err});
                }
            });
        });
    },
    


    getStakeDetails: async (req, res) => {
        console.log(Math.floor(parseFloat(req.query.endTime)));
        console.log(Math.floor((Math.floor(req.query.endTime) - Math.floor(new Date() / 1000)) / 86400))
        let now = 0;
        let totalStakeAmount = await funct.getTotalStakedAmount();
        if (req.query.endTime != "", req.query.amount != "") {
            await TransformTokens.find().sort({ Day: -1 }).limit(1).then(
                async function (doc) {
                    if (doc != '') {
                        var now = parseInt(doc[0].Day);
                        var newContract = await new web3.eth.Contract(abi, contractAddress);
                        await newContract && newContract.methods.calculateBigPayDayReward((req.query.amount*1000000000000000000).toString(), Math.floor((req.query.endTime))).call().then(async output => {
                            await newContract.methods.getRewardPercentage().call().then(async out1 => {
                                console.log("This is output", parseFloat(output));
                                let stakeBonus = (((parseFloat(req.query.amount) * out1) / 10000).toFixed(6) * Math.floor((Math.floor(req.query.endTime) - Math.floor(new Date() / 1000)) / 86400)).toFixed(6);
                                let amountAfterStake = (parseFloat(req.query.amount) + parseFloat(stakeBonus)).toFixed(6);
                                let bigPayDay = (parseFloat(output)/1000000000000000000).toFixed(6);
                                let stakeShares = (parseFloat(req.query.amount)/parseFloat(totalStakeAmount) * 100).toFixed(6);
                                let stakeRate = totalStakeAmount;
                                let startDay = now;
                                let lastDay = now + Math.floor((Math.floor(req.query.endTime) - Math.floor(new Date() / 1000)) / 86400);
                                let endDay = lastDay + 1;
                                res.send({ stakeRate: stakeRate, stakeBonus: stakeBonus, finalAmount: amountAfterStake, bigPayDay: bigPayDay, stakeShares: stakeShares, startDay: startDay, lastDay: lastDay, endDay: endDay })
                            });
                        });
                    }
                });
        }
        else {
            res.send("err")
        }
    },

    checkNowStakesBalance: async (req, res) => {
        console.log(req.query.address)
        var newContract = await new web3.eth.Contract(abi, contractAddress);
        await newContract && newContract.methods.checkNowStakesBalance(req.query.address).call().then(async output => {
            let response = { status: true, amount: output.toString() };
            res.send(response);
        }).catch(err => {
            let response = { status: false, message: "Unable to get Stakes Balance for hex, Try Again!!!" };
            res.send(response);
        });
    },

    checkHoldingBalance: async (req, res) => {
        console.log(req.query.address)
        var newContract = await new web3.eth.Contract(abi, contractAddress);
        await newContract && newContract.methods.checkHoldingBalance(req.query.address).call().then(async output => {
            let response = { status: true, amount: output.toString() };
            res.send(response);
        }).catch(err => {
            let response = { status: false, message: "Unable to get Holding Balance for hex, Try Again!!!" };
            res.send(response);
        });
    },









    //API for TransformTable
    DeleteTransformTable: async (req, res) => {
        let obj = [];
        TransformTokens.remove((err, doc) => {
            if (!err) { res.send({ response: 'Deleted Successful' }); }
            else {
                console.log({ error: 'Error during record update : ' + err });
            }
        })
    },
    getAllTransformTableDataByAddress: async (req, res) => {
        try {
            let obj = [];
            var newContract = await new web3.eth.Contract(abi, contractAddress);
            await newContract && newContract.methods.getMyPurchasedTokens(req.query.address).call().then(async output => {
                console.log(output)
                await newContract.methods.getowner().call().then(async out2 => {
                    console.log(out2)
                    await newContract.methods.balanceOf(out2.toString()).call().then(async out3 => {
                        console.log(out3)
                        await newContract.methods.getOpenOrderETHAmountByAddress(req.query.address).call().then(async out1 => {
                            TransformTokens.find((err, docs) => {
                                console.log(docs)
                                if (!err && docs) {
                                    // console.log(output.toString(), out1.toString())
                                    // console.log(req.query.address);
                                    docs[docs.length - 1].NEXONAvailable = (parseFloat(out3) / 1000000000000000000).toFixed(6)
                                    docs[docs.length - 1].YourNEXON = (parseFloat(output) / 1000000000000000000).toFixed(6);
                                    docs[docs.length - 1].YourETH = (parseFloat(out1) / 1000000000000000000).toFixed(6);
                                    res.send(docs);
                                    // console.log(docs[docs.length-1])
                                }
                                else {
                                    console.log({ error: 'Error in getting details :' + err });
                                }
                            });
                        }).catch(err => { console.log(err) });
                    }).catch(err => { console.log(err) });
                }).catch(err => { console.log(err) });
            }).catch(err => { console.log(err) });
        }
        catch (err) {
            console.log("Error from getAllTransformTableDataByAddress", err.message)
        }
    },
    purchaseRYZ: async (req, res) => {
        if (req.body.privateKey && !req.body.privateKey == "") {
            var newContract = await new web3.eth.Contract(abi, contractAddress);
            await newContract && newContract.methods.purchaseTokens().send({ callValue: req.body.value * 1000000000000000000 }).then(async output => {
                res.send({ status: true, message: output });
            }).catch(err => {
                console.log(err)
                let response = { status: false, message: "Unable to purchase token, Please Try Again!!!" };
                res.send(response);
            });
        } else {
            let response = { status: false, message: "Enter Valid Private Key & Try Again!!!" };
            res.send(response);
        }
    },
    withdrawPurchasedRYZ: async (req, res) => {
        if (req.body.privateKey && !req.body.privateKey == "") {
            var newContract = await new web3.eth.Contract(abi, contractAddress);
            await newContract && newContract.methods.withdrawPurchasedToken().send().then(async output => {
                res.send(output);
            }).catch(err => {
                let response = { status: false, message: "Unable to withdraw purchased token, Please Try Again!!!" };
                res.send(response);
            });
        } else {
            let response = { status: false, message: "Enter Valid Private Key & Try Again!!!" };
            res.send(response);
        }
    },






    // //API for Stakes and addresses
    // getAllStakesById: async (req, res) => {
    //     let obj = [];
    //     UserAddressAndStakeID.find((err, docs) => {
    //         if (!err) {
    //             res.send(docs);
    //         }
    //         else {
    //             //console.log({error :'Error in getting details :' + err});
    //         }
    //     });
    // },
    // deleteRecordByStakeId: async (req, res) => {
    //     UserAddressAndStakeID.remove((err, doc) => {
    //         if (!err) { res.send({ response: 'Deleted Successful' }); }
    //         else {
    //             //console.log({error :'Error during record update : ' + err});
    //         }
    //     })
    // },

    //BTC Claim Functions
    checkBTCAddress: async (req, res) => {
        if (req.query.address && !req.query.address == "") {
            await axios.get('https://api.blockcypher.com/v1/btc/main/addrs/' + req.query.address + '/balance').then(output => {
                if (output.data.final_balance / 100000000 < 0.1) {
                    res.send({ status: false, message: "Insufficient UTXO in this address to claim!!!" })
                }
                else {
                    res.send({ status: true, message: "You can claim your RYZ with this address!!!" })
                }
            }).catch(err => {
                console.log(err.message)
                let response = { status: false, message: "Insufficient UTXO in this address to claim!!!" };
                res.send(response);
            });
        } else {
            let response = { status: false, message: "Insufficient UTXO in this address to claim!!!" };
            res.send(response);
        }
    },
    getAllBTCRewardsByAddress: async (req, res) => {
        let obj = [];
        BTCDatabase.find({ UserTronAddress: req.query.address }, (err, docs) => {
            if (!err) {
                res.send(docs);
            }
            else {
                console.log({ error: 'Error in getting details :' + err });
            }
        });
    },
    getAllBTCRewards: async (req, res) => {
        let obj = [];
        BTCDatabase.find((err, docs) => {
            if (!err) {
                res.send(docs);
            }
            else {
                console.log({ error: 'Error in getting details :' + err });
            }
        });
    },
    resetAllBTCRewardsByAddress: async (req, res) => {
        let obj = [];
        BTCDatabase.remove((err, doc) => {
            if (!err) { res.send({ response: 'Deleted Successful' }); }
            else {
                console.log({ error: 'Error during record update : ' + err });
            }
        })
    },
    genrateBitcoinMessage: async (req, res) => {
        const encodedTx = req.body.tx;
        let response = { status: true, message: "RYZCLAIMBTCVERIFICATIONMESSAGE" };
        res.send(response);
    },
    validateBitcoinSignature: async (req, res) => {
        try {
            var status = btcMsgVerifier.verifyMessage(req.query.address, req.query.signature, "NEXONCLAIMBTCVERIFICATIONMESSAGE");
            console.log(status)
            if (req.query.signature && status == true) {
                let response = { status: true, message: "Proceed to withdraw" };
                res.send(response);
            }
            else {
                let response = { status: false, message: "Invalid Signature To Claim RYZ" };
                res.send(response);
            }
        }
        catch (err) {
            //console.log(err)
            let response = { status: false, message: "Invalid Signature To Claim RYZ" };
            res.send(response);
        }
    },
    getBTCBalance: async (req, res) => {
        try {
            if (req.query.address && !req.query.address == "") {
                await axios.get('https://api.blockcypher.com/v1/btc/main/addrs/' + req.query.address + '/balance').then(output => {
                    var balance = output.data.final_balance;
                    res.send({ status: true, balance: balance, message: '' });
                });
            }
            else {
                res.send({ status: false, balance: '', message: "Unable to fetch balance" })
            }
        }
        catch (err) {
            res.send({ status: false, balance: '', message: "Unable to fetch balance" })
        }
    },

    getABI: async (req, res) => {
        res.send({ key: abi })
    }
}
