const express= require('express');
const router = express.Router();
const genericApi = require('../controller/genericApi');
const contractApi = require('../controller/contractApi');
const BackendAPI = require('../controller/Backend')
//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------ROUTES FOR GENERIC FUNCTIONS---------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//

/**
* @typedef createAccount
*/
/**
* @route GET /api/eth/nexon/createAccount
* @group Generic_API
* @security Basic Auth
*/
router.get('/createAccount', genericApi.createAccount);

// /**
// * @typedef getAccount
// * @property {String} address.required - Add address - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
// */
// /**
// * @route GET /api/eth/nexon/getAccount
// * @param {getAccount.model} address.query
// * @group Generic_API
// * @security Basic Auth
// */
// router.get('/getAccount', genericApi.getAccount);

/**
* @typedef getETHBalance
* @property {String} address.required - Add address - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
*/
/**
* @route GET /api/eth/nexon/getETHBalance
* @param {getETHBalance.model} address.query
* @group Generic_API
* @security Basic Auth
*/
router.get('/getETHBalance', genericApi.getETHBalance);

/**
* @typedef getTransactionByHash
* @property {String} hash.required - Add hash - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
*/
/**
* @route GET /api/eth/nexon/getTransactionByHash
* @param {getTransactionByHash.model} hash.query
* @group Generic_API
* @security Basic Auth
*/
router.get('/getTransactionByHash', genericApi.getTransactionByHash);


// /**
// * @typedef getTransactionsByAddress
// * @property {String} address.required - Add address - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
// */
// /**
// * @route GET /api/eth/nexon/getTransactionsByAddress
// * @param {getTransactionsByAddress.model} address.query
// * @group Generic_API
// * @security Basic Auth
// */
// router.get('/getTransactionsByAddress', genericApi.getTransactionsByAddress);                                   

/**
* @typedef getTransactionByBlock
* @property {String} block.required - Add block - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
*/
/**
* @route GET /api/eth/nexon/getTransactionByBlock
* @param {getTransactionByBlock.model} block.query
* @group Generic_API
* @security Basic Auth
*/
router.get('/getTransactionByBlock', genericApi.getTransactionByBlock);                                              

/**
* @typedef ETH_Status
*/
/**
* @route GET /api/eth/nexon/getStatus
* @group Generic_API
* @security Basic Auth
*/
router.get('/getStatus', genericApi.getStatus);


//--------------------------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------ROUTES FOR ERC20 FUNCTIONALITY---------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------------------------//

    /**
    * @typedef getTokenOwner
    */
    /**
    * @route GET /api/eth/nexon/getTokenOwner
    * @group Smart_Contract_API
    * @security Basic Auth
    */
router.get('/getTokenOwner', contractApi.getTokenOwner);

    /**
    * @typedef getTokenOwnerBalance
    * @property {String} address.required - Add address - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    */
    /**
    * @route GET /api/eth/nexon/getTokenOwnerBalance
    * @param {getTokenOwnerBalance.model} address.query
    * @group Smart_Contract_API
    * @security Basic Auth
    */
router.get('/getTokenOwnerBalance', contractApi.getTokenOwnerBalance);

    /**
    * @typedef getTokenName
    */
    /**
    * @route GET /api/eth/nexon/getTokenName
    * @group Smart_Contract_API
    * @security Basic Auth
    */
router.get('/getTokenName', contractApi.getTokenName);

   /**
   * @typedef getTokenSymbol
   */
   /**
   * @route GET /api/eth/nexon/getTokenSymbol
   * @group Smart_Contract_API
   * @security Basic Auth
   */
router.get('/getTokenSymbol', contractApi.getTokenSymbol);

   /**
   * @typedef getTokenTotalSupply
   */
   /**
   * @route GET /api/eth/nexon/getTokenTotalSupply
   * @group Smart_Contract_API
   * @security Basic Auth
   */
router.get('/getTokenTotalSupply', contractApi.getTokenTotalSupply);

    /**
    * @typedef approveToken
    * @property {String} privateKey.required - Add privateKey - eg: 0x3e2b296f55b5768b0b6e28fa318e613a4c4bfa3a26142e89453eb6a89f7f5978
    * @property {String} fromAddress.required - Add fromAddress - eg: 0x98A000309527D55031238457A95b80B6AdD3CcaB
	* @property {String} toAddress.required - Add toAddress - eg: 0xf49ddDB0019ED8b03C03e75a9329a98746847dE5
	* @property {String} amount.required - Add amount - eg: 5
    */
    /**
    * @route POST /api/eth/nexon/approveToken
    * @param {approveToken.model} req.body
    * @group Smart_Contract_API
    * @security Basic Auth
    */
router.post('/approveToken', contractApi.approveToken);

   /**
   * @typedef transferToken
   * @property {String} privateKey.required - Add privateKey - eg: 0x3e2b296f55b5768b0b6e28fa318e613a4c4bfa3a26142e89453eb6a89f7f5978
   * @property {String} fromAddress.required - Add fromAddress - eg: 0x98A000309527D55031238457A95b80B6AdD3CcaB
   * @property {String} toAddress.required - Add toAddress - eg: 0xf49ddDB0019ED8b03C03e75a9329a98746847dE5
   * @property {String} amount.required - Add amount - eg: 5
   */
   /**
   * @route POST /api/eth/nexon/transferToken
   * @param {transferToken.model} req.body
   * @group Smart_Contract_API
   * @security Basic Auth
   */
router.post('/transferToken', contractApi.transferToken);

   /**
   * @typedef transferFrom
   * @property {String} privateKey.required - Add privateKey - eg: 0x3e2b296f55b5768b0b6e28fa318e613a4c4bfa3a26142e89453eb6a89f7f5978
   * @property {String} fromAddress.required - Add fromAddress - eg: 0x98A000309527D55031238457A95b80B6AdD3CcaB
   * @property {String} toAddress.required - Add toAddress - eg: 0xf49ddDB0019ED8b03C03e75a9329a98746847dE5
   * @property {String} amount.required - Add amount - eg: 5
   */
   /**
   * @route POST /api/eth/nexon/transferFrom
   * @param {transferFrom.model} req.body
   * @group Smart_Contract_API
   * @security Basic Auth
   */
router.post('/transferFrom', contractApi.transferFrom);

   /**
   * @typedef burnToken
   * @property {String} privateKey.required - Add privateKey - eg: 0x3e2b296f55b5768b0b6e28fa318e613a4c4bfa3a26142e89453eb6a89f7f5978
   * @property {String} fromAddress.required - Add fromAddress - eg: 0x98A000309527D55031238457A95b80B6AdD3CcaB
   * @property {String} amount.required - Add amount - eg: 5
   */
   /**
   * @route POST /api/eth/nexon/burnToken
   * @param {burnToken.model} req.body
   * @group Smart_Contract_API
   * @security Basic Auth
   */
router.post('/burnToken', contractApi.burnToken);

   /**
   * @typedef mintToken
   * @property {String} privateKey.required - Add privateKey - eg: 0x3e2b296f55b5768b0b6e28fa318e613a4c4bfa3a26142e89453eb6a89f7f5978
   * @property {String} fromAddress.required - Add fromAddress - eg: 0x98A000309527D55031238457A95b80B6AdD3CcaB
   * @property {String} amount.required - Add amount - eg: 5
   */
   /**
   * @route POST /api/eth/nexon/mintToken
   * @param {mintToken.model} req.body
   * @group Smart_Contract_API
   * @security Basic Auth
   */
router.post('/mintToken', contractApi.mintToken);

   /**
   * @typedef transferOwnership
   * @property {String} privateKey.required - Add privateKey - eg: 0x3e2b296f55b5768b0b6e28fa318e613a4c4bfa3a26142e89453eb6a89f7f5978
   * @property {String} fromAddress.required - Add fromAddress - eg: 0x98A000309527D55031238457A95b80B6AdD3CcaB
   * @property {String} newAddress.required - Add newAddress - eg: asdfghjkkkjhgfd
   */
   /**
   * @route POST /api/eth/nexon/transferOwnership
   * @param {transferOwnership.model} req.body
   * @group Smart_Contract_API
   * @security Basic Auth
   */
router.post('/transferOwnership', contractApi.transferOwnership);


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------ROUTES FOR NEXON FUNCTIONALITY------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

   /**
   * @typedef getBigPayDay
   */
   /**
   * @route GET /api/eth/nexon/getBigPayDay
   * @group Nexon_API
   * @security Basic Auth
   */
router.get('/getBigPayDay', contractApi.getBigPayDay);

   /**
   * @typedef getBigPayDayPercentage
   */
   /**
   * @route GET /api/eth/nexon/getBigPayDayPercentage
   * @group Nexon_API
   * @security Basic Auth
   */
router.get('/getBigPayDayPercentage', contractApi.getBigPayDayPercentage);

   /**
   * @typedef getTokenpoolAddress
   */
   /**
   * @route GET /api/eth/nexon/getTokenpoolAddress
   * @group Nexon_API
   * @security Basic Auth
   */
router.get('/getTokenpoolAddress', contractApi.getTokenpoolAddress);

   /**
   * @typedef getPurchaseableTokenAddress
   */
   /**
   * @route GET /api/eth/nexon/getPurchaseableTokenAddress
   * @group Nexon_API
   * @security Basic Auth
   */
router.get('/getPurchaseableTokenAddress', contractApi.getPurchaseableTokenAddress);

   /**
   * @typedef getPriceOfToken
   */
   /**
   * @route GET /api/eth/nexon/getPriceOfToken
   * @group Nexon_API
   * @security Basic Auth
   */
router.get('/getPriceOfToken', contractApi.getPriceOfToken);

   /**
   * @typedef getRewardPercentage
   */
   /**
   * @route GET /api/eth/nexon/getRewardPercentage
   * @group Nexon_API
   * @security Basic Auth
   */
router.get('/getRewardPercentage', contractApi.getRewardPercentage);

   /**
   * @typedef getPenaltyPercentage
   */
   /**
   * @route GET /api/eth/nexon/getPenaltyPercentage
   * @group Nexon_API
   * @security Basic Auth
   */
router.get('/getPenaltyPercentage', contractApi.getPenaltyPercentage);

    /**
    * @typedef getPenaltyIfWithdrawToday
    * @property {String} id.required - Add id - eg: 1
    */
    /**
    * @route GET /api/eth/nexon/getPenaltyIfWithdrawToday
    * @param {getPenaltyIfWithdrawToday.model} id.query
    * @group Nexon_API
    * @security Basic Auth
    */
router.get('/getPenaltyIfWithdrawToday', contractApi.getPenaltyIfWithdrawToday);

   /**
   * @typedef getReferralAddress
   */
   /**
   * @route GET /api/eth/nexon/getReferralAddress
   * @group Nexon_API
   * @security Basic Auth
   */
router.get('/getReferralAddress', contractApi.getReferralAddress);

   /**
   * @typedef getReferralAmount
   */
   /**
   * @route GET /api/eth/nexon/getReferralAmount
   * @group Nexon_API
   * @security Basic Auth
   */
router.get('/getReferralAmount', contractApi.getReferralAmount);

   /**
   * @typedef getClaimTokens
   */
   /**
   * @route GET /api/eth/nexon/getClaimTokens
   * @group Nexon_API
   * @security Basic Auth
   */
router.get('/getClaimTokens', contractApi.getClaimTokens);

    /**
    * @typedef getRewardsDetailsOfUserById
    * @property {String} id.required - Add id - eg: 1
    */
    /**
    * @route GET /api/eth/nexon/getRewardsDetailsOfUserById
    * @param {getRewardsDetailsOfUserById.model} id.query
    * @group Nexon_API
    * @security Basic Auth
    */
router.get('/getRewardsDetailsOfUserById', contractApi.getRewardsDetailsOfUserById);

   /**
   * @typedef getTotalETH
   */
   /**
   * @route GET /api/eth/nexon/getTotalETH
   * @group Nexon_API
   * @security Basic Auth
   */
router.get('/getTotalETH', contractApi.getTotalETH);

   /**
   * @typedef getStakingCount
   */
   /**
   * @route GET /api/eth/nexon/getStakingCount
   * @group Nexon_API
   * @security Basic Auth
   */
router.get('/getStakingCount', contractApi.getStakingCount);

    /**
    * @typedef getMyPurchasedTokens
    * @property {String} address.required - Add address - eg: 1
    */
    /**
    * @route GET /api/eth/nexon/getMyPurchasedTokens
    * @param {getMyPurchasedTokens.model} address.query
    * @group Nexon_API
    * @security Basic Auth
    */
router.get('/getMyPurchasedTokens', contractApi.getMyPurchasedTokens);

    /**
    * @typedef getETHAmountByAddress
    * @property {String} address.required - Add address - eg: 1
    */
    /**
    * @route GET /api/eth/nexon/getETHAmountByAddress
    * @param {getETHAmountByAddress.model} address.query
    * @group Nexon_API
    * @security Basic Auth
    */
router.get('/getETHAmountByAddress', contractApi.getETHAmountByAddress);

    /**
    * @typedef getFinalWithdrawlStake
    * @property {String} id.required - Add id - eg: 1
    */
    /**
    * @route GET /api/eth/nexon/getFinalWithdrawlStake
    * @param {getFinalWithdrawlStake.model} id.query
    * @group Nexon_API
    * @security Basic Auth
    */
router.get('/getFinalWithdrawlStake', contractApi.getFinalWithdrawlStake);

//----------------------------------------set api-----------------------//

    /**
    * @typedef setBigPayDay
    * @property {String} privateKey.required - Add privateKey - eg: 90d6bfe121ca841b624028284687917843a03f88b84943d1d4d20336ab67fbb6
    * @property {String} fromAddress.required - Add fromAddress - eg: asdfghjkhgdsasfhjk
    * @property {String} day.required - Add day - eg: 12
    */
    /**
    * @route POST /api/eth/nexon/setBigPayDay
    * @param {setBigPayDay.model} req.body
    * @group Nexon_API
    * @security Basic Auth
    */
router.post('/setBigPayDay', contractApi.setBigPayDay); 

    /**
    * @typedef setBigPayDayPercentage
    * @property {String} privateKey.required - Add privateKey - eg: 90d6bfe121ca841b624028284687917843a03f88b84943d1d4d20336ab67fbb6
    * @property {String} fromAddress.required - Add fromAddress - eg: asdfghjkhgdsasfhjk
    * @property {String} percentage.required - Add percentage - eg: 1
    */
    /**
    * @route POST /api/eth/nexon/setBigPayDayPercentage
    * @param {setBigPayDayPercentage.model} req.body
    * @group Nexon_API
    * @security Basic Auth
    */
router.post('/setBigPayDayPercentage', contractApi.setBigPayDayPercentage); 

    /**
    * @typedef setTokenPoolAddress
    * @property {String} privateKey.required - Add privateKey - eg: 90d6bfe121ca841b624028284687917843a03f88b84943d1d4d20336ab67fbb6
    * @property {String} fromAddress.required - Add fromAddress - eg: asdfghjkhgdsasfhjk
    * @property {String} address.required - Add address - eg: zxcvbnmnbvxzxcvbnm
    */
    /**
    * @route POST /api/eth/nexon/setTokenPoolAddress
    * @param {setTokenPoolAddress.model} req.body
    * @group Nexon_API
    * @security Basic Auth
    */
router.post('/setTokenPoolAddress', contractApi.setTokenPoolAddress); 

    /**
    * @typedef setpurchaseableTokenAddress
    * @property {String} privateKey.required - Add privateKey - eg: 90d6bfe121ca841b624028284687917843a03f88b84943d1d4d20336ab67fbb6
    * @property {String} fromAddress.required - Add fromAddress - eg: asdfghjkhgdsasfhjk
    * @property {String} address.required - Add address - eg: zxcvbnmnbvxzxcvbnm
    */
    /**
    * @route POST /api/eth/nexon/setpurchaseableTokenAddress
    * @param {setpurchaseableTokenAddress.model} req.body
    * @group Nexon_API
    * @security Basic Auth
    */
router.post('/setpurchaseableTokenAddress', contractApi.setpurchaseableTokenAddress); 

    /**
    * @typedef setPriceOfToken
    * @property {String} privateKey.required - Add privateKey - eg: 90d6bfe121ca841b624028284687917843a03f88b84943d1d4d20336ab67fbb6
    * @property {String} fromAddress.required - Add fromAddress - eg: asdfghjkhgdsasfhjk
    * @property {String} price.required - Add price - eg: 1
    */
    /**
    * @route POST /api/eth/nexon/setPriceOfToken
    * @param {setPriceOfToken.model} req.body
    * @group Nexon_API
    * @security Basic Auth
    */
router.post('/setPriceOfToken', contractApi.setPriceOfToken);

    /**
    * @typedef setRewardPercentage
    * @property {String} privateKey.required - Add privateKey - eg: 90d6bfe121ca841b624028284687917843a03f88b84943d1d4d20336ab67fbb6
    * @property {String} fromAddress.required - Add fromAddress - eg: asdfghjkhgdsasfhjk
    * @property {String} percentage.required - Add percentage - eg: 1
    */
    /**
    * @route POST /api/eth/nexon/setRewardPercentage
    * @param {setRewardPercentage.model} req.body
    * @group Nexon_API
    * @security Basic Auth
    */
router.post('/setRewardPercentage', contractApi.setRewardPercentage);

    /**
    * @typedef setPenaltyPercentage
    * @property {String} privateKey.required - Add privateKey - eg: 90d6bfe121ca841b624028284687917843a03f88b84943d1d4d20336ab67fbb6
    * @property {String} fromAddress.required - Add fromAddress - eg: asdfghjkhgdsasfhjk
    * @property {String} percentage.required - Add percentage - eg: 1
    */
    /**
    * @route POST /api/eth/nexon/setPenaltyPercentage
    * @param {setPenaltyPercentage.model} req.body
    * @group Nexon_API
    * @security Basic Auth
    */
router.post('/setPenaltyPercentage', contractApi.setPenaltyPercentage);

    /**
    * @typedef setReferralAddress
    * @property {String} privateKey.required - Add privateKey - eg: 90d6bfe121ca841b624028284687917843a03f88b84943d1d4d20336ab67fbb6
    * @property {String} fromAddress.required - Add fromAddress - eg: asdfghjkhgdsasfhjk
    * @property {String} referralAddress.required - Add referralAddress - eg: zxvxzxcvx
    */
    /**
    * @route POST /api/eth/nexon/setReferralAddress
    * @param {setReferralAddress.model} req.body
    * @group Nexon_API
    * @security Basic Auth
    */
router.post('/setReferralAddress', contractApi.setReferralAddress);

    /**
    * @typedef setReferralAmount
    * @property {String} privateKey.required - Add privateKey - eg: 90d6bfe121ca841b624028284687917843a03f88b84943d1d4d20336ab67fbb6
    * @property {String} fromAddress.required - Add fromAddress - eg: asdfghjkhgdsasfhjk
    * @property {String} amount.required - Add amount - eg: 1
    */
    /**
    * @route POST /api/eth/nexon/setReferralAmount
    * @param {setReferralAmount.model} req.body
    * @group Nexon_API
    * @security Basic Auth
    */
router.post('/setReferralAmount', contractApi.setReferralAmount);

    /**
    * @typedef setClaimTokens
    * @property {String} privateKey.required - Add privateKey - eg: 90d6bfe121ca841b624028284687917843a03f88b84943d1d4d20336ab67fbb6
    * @property {String} fromAddress.required - Add fromAddress - eg: asdfghjkhgdsasfhjk
    * @property {String} token.required - Add token - eg: 1
    */
    /**
    * @route POST /api/eth/nexon/setClaimTokens
    * @param {setClaimTokens.model} req.body
    * @group Nexon_API
    * @security Basic Auth
    */
router.post('/setClaimTokens', contractApi.setClaimTokens);

    /**
    * @typedef performStakingToken
    * @property {String} privateKey.required - Add privateKey - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    * @property {String} fromAddress.required - Add fromAddress - eg: asdfghjkhgdsasfhjk
    * @property {String} amount.required - Add amount - eg: 1234
    * @property {String} time.required - Add time - eg: 2
    */
    /**
    * @route POST /api/eth/nexon/performStakingToken
    * @param {performStakingToken.model} req.body
    * @group Nexon_API
    * @security Basic Auth
    */
router.post('/performStakingToken', contractApi.performStakingToken);

    /**
    * @typedef withdrawStakingToken
    * @property {String} privateKey.required - Add privateKey - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    * @property {String} fromAddress.required - Add fromAddress - eg: asdfghjkhgdsasfhjk
    * @property {String} stakingId.required - Add stakingId - eg: 2
    */
    /**
    * @route POST /api/eth/nexon/withdrawStakingToken
    * @param {withdrawStakingToken.model} req.body
    * @group Nexon_API
    * @security Basic Auth
    */
router.post('/withdrawStakingToken', contractApi.withdrawStakingToken);

    /**
    * @typedef withdrawPurchasedToken
    * @property {String} privateKey.required - Add privateKey - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    * @property {String} fromAddress.required - Add fromAddress - eg: asdfghjkhgdsasfhjk
    */
    /**
    * @route POST /api/eth/nexon/withdrawPurchasedToken
    * @param {withdrawPurchasedToken.model} req.body
    * @group Nexon_API
    * @security Basic Auth
    */
router.post('/withdrawPurchasedToken', contractApi.withdrawPurchasedToken);

    /**
    * @typedef withdrawReferral
    * @property {String} privateKey.required - Add privateKey - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    * @property {String} fromAddress.required - Add fromAddress - eg: asdfghjkhgdsasfhjk
    * @property {String} address.required - Add address - eg: asdfghjkhgdsasfhjk
    */
    /**
    * @route POST /api/eth/nexon/withdrawReferral
    * @param {withdrawReferral.model} req.body
    * @group Nexon_API
    * @security Basic Auth
    */
router.post('/withdrawReferral', contractApi.withdrawReferral);


/////////////////////////////////////////////////BACKEND-API///////////////////////////////////////////////////////////
    /**
    * @typedef getBTCBalance
    * @property {String} address.required - Add address - eg: 0xabcdefghijklmnopqrstuvwxyz
    */
    /**
    * @route GET /api/eth/nexon/getBTCBalance
    * @param {getBTCBalance.model} address.query
    * @group Frontend_API
    * @security Basic Auth
    */
   router.get('/getBTCBalance', BackendAPI.getBTCBalance);

    /**
    * @typedef validateBitcoinSignature
    * @property {String} signature.required - Add signature - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    * @property {String} signature.required - Add address - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    */
    /**
    * @route GET /api/eth/nexon/validateBitcoinSignature
    * @param {validateBitcoinSignature.model} signature.query
    * @param {validateBitcoinSignature.model} address.query
    * @group Frontend_API
    * @security Basic Auth
    */
    router.get('/validateBitcoinSignature', BackendAPI.validateBitcoinSignature);

    /**
    * @typedef genrateBitcoinMessage
    */
    /**
    * @route GET /api/eth/nexon/genrateBitcoinMessage
    * @group Frontend_API
    * @security Basic Auth
    */
    router.get('/genrateBitcoinMessage', BackendAPI.genrateBitcoinMessage);





    /**
    * @typedef getTokenTransactionsByAddress
    * @property {String} address.required - Add address - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    */
    /**
    * @route GET /api/eth/nexon/getTokenTransactionsByAddress
    * @param {getTokenTransactionsByAddress.model} address.query
    * @group Frontend_API
    * @security Basic Auth
    */
   router.get('/getTokenTransactionsByAddress', BackendAPI.getTokenTransactionsByAddress);

//    /**
//     * @typedef getStakingTokensByAddress
//     * @property {String} address.required - Add address - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
//     */
//     /**
//     * @route GET /api/eth/nexon/getStakingTokensByAddress
//     * @param {getStakingTokensByAddress.model} address.query
//     * @group Frontend_API
//     * @security Basic Auth
//     */
//    router.get('/getStakingTokensByAddress', BackendAPI.getStakingTokensByAddress); 


//     /**
//     * @typedef getreferalLinkforAddress
//     * @property {String} address.required - Add address - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
//     */
//     /**
//     * @route GET /api/eth/nexon/getreferalLinkforAddress
//     * @param {getreferalLinkforAddress.model} address.query
//     * @group Frontend_API
//     * @security Basic Auth
//     */
//    router.get('/getreferalLinkforAddress', BackendAPI.getreferalLinkforAddress);
   
   /**
    * @typedef getAllReferalsByAddress
    * @property {String} address.required - Add address - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    */
    /**
    * @route GET /api/eth/nexon/getAllReferalsByAddress
    * @param {getAllReferalsByAddress.model} address.query
    * @group Frontend_API
    * @security Basic Auth
    */
   router.get('/getAllReferalsByAddress', BackendAPI.getAllReferalsByAddress); 

      /**
    * @typedef addBigPayDayDate
    * @property {String} Date.required - Add Date - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    * @property {String} BonusPercentage.required - Add BonusPercentage - eg: 10
    * @property {String} amount.required - Add amount  - eg: 10
    */
    /**
    * @route POST /api/eth/nexon/addBigPayDayDate
    * @param {addBigPayDayDate.model} req.body
    * @group Frontend_API
    * @security Basic Auth
    */
//    router.post('/addBigPayDayDate', BackendAPI.addBigPayDayDate); 

   /**
    * @typedef getServerTime
    */
    /**
    * @route GET /api/eth/nexon/getServerTime
    * @group Frontend_API
    * @security Basic Auth
    */
   router.get('/getServerTime', BackendAPI.getServerTime); 

    /**
    * @typedef getAvailableNEXONForTransform
    */
    /**
    * @route GET /api/eth/nexon/getAvailableNEXONForTransform
    * @group Frontend_API
    * @security Basic Auth
    */
    router.get('/getAvailableNEXONForTransform', BackendAPI.getAvailableNEXONForTransform); 


    /**
    * @typedef getTotalEth
    */
    /**
    * @route GET /api/eth/nexon/getTotalEth
    * @group Frontend_API
    * @security Basic Auth
    */
    router.get('/getTotalEth', BackendAPI.getTotalEth);

    /**
    * @typedef getTrxBalance
    * @property {String} address.required - Add address - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    */
    /**
    * @route GET /api/eth/nexon/getTrxBalance
    * @param {getTrxBalance.model} address.query
    * @group Frontend_API
    * @security Basic Auth
    */
    router.get('/getTrxBalance', BackendAPI.getTrxBalance);

    /**
    * @typedef getTokenBalance
    * @property {String} address.required - Add address - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    */
    /**
    * @route GET /api/eth/nexon/getTokenBalance
    * @param {getTokenBalance.model} address.query
    * @group Frontend_API
    * @security Basic Auth
    */
    router.get('/getTokenBalance', BackendAPI.getTokenBalance);

    /**
    * @typedef getTokenPrice
    */
    /**
    * @route GET /api/eth/nexon/getTokenPrice
    * @group Frontend_API
    * @security Basic Auth
    */
    router.get('/getTokenPrice', BackendAPI.getTokenPrice);

    /**
    * @typedef withdrawMyPurchasedTokens
    * @property {String} privateKey.required - Add privateKey - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    */
    /**
    * @route POST /api/eth/nexon/withdrawMyPurchasedTokens
    * @param {withdrawMyPurchasedTokens.model} address.body
    * @group Frontend_API
    * @security Basic Auth
    */
   router.post('/withdrawMyPurchasedTokens', BackendAPI.withdrawMyPurchasedTokens);
   
    /**
    * @typedef getReferalLinkByAddress
    * @property {String} address.required - Add address - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    */
    /**
    * @route GET /api/eth/nexon/getReferalLinkByAddress
    * @param {getReferalLinkByAddress.model} address.query
    * @group Frontend_API
    * @security Basic Auth
    */
    router.get('/getReferalLinkByAddress', BackendAPI.getReferalLinkByAddress);

     /**
    * @typedef getReferralAmount
    */
    /**
    * @route GET /api/eth/nexon/getReferralAmount
    * @group Frontend_API
    * @security Basic Auth
    */
    router.get('/getReferralAmount', BackendAPI.getReferralAmount);

    /**
    * @typedef getReferralHistory
    * @property {String} address.required - Add address - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    */
    /**
    * @route GET /api/eth/nexon/getReferralHistory
    * @param {getReferralHistory.model} address.query
    * @group Frontend_API
    * @security Basic Auth
    */
    router.get('/getReferralHistory', BackendAPI.getReferralHistory);

    /**
    * @typedef withdrawReferral
    * @property {String} address.required - Add address - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    * @property {String} referralLink.required - Add referralLink - eg: qwertyuioopoiuytr
    */
    /**
    * @route POST /api/eth/nexon/withdrawReferral
    * @param {withdrawReferral.model} req.body
    * @group Frontend_API
    * @security Basic Auth
    */
    router.post('/withdrawReferral', BackendAPI.withdrawReferral);

    /**
    * @typedef deleteRecord
    * @property {String} address.required - Add address - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    */
    /**
    * @route GET /api/eth/nexon/deleteRecord
    * @param {deleteRecord.model} address.query
    * @group Frontend_API
    * @security Basic Auth
    */
   router.get('/deleteRecord', BackendAPI.deleteRecord);

   /**
    * @typedef getAllStakesById
    */
    /**
    * @route GET /api/eth/nexon/getAllStakesById
    * @group Frontend_API
    * @security Basic Auth
    */
   router.get('/getAllStakesById', BackendAPI.getAllStakesById);
   
    /**
    * @typedef deleteRecordByStakeId
    * @property {String} id.required - Add id - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    */
    /**
    * @route GET /api/eth/nexon/deleteRecordByStakeId
    * @param {deleteRecordByStakeId.model} id.query
    * @group Frontend_API
    * @security Basic Auth
    */
   router.get('/deleteRecordByStakeId', BackendAPI.deleteRecordByStakeId);

   /**
    * @typedef getActiveStakesByUserAddress
    * @property {String} address.required - Add address - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    */
    /**
    * @route GET /api/eth/nexon/getActiveStakesByUserAddress
    * @param {getActiveStakesByUserAddress.model} address.query
    * @group Frontend_API
    * @security Basic Auth
    */
   router.get('/getActiveStakesByUserAddress', BackendAPI.getActiveStakesByUserAddress);

   /**
    * @typedef getStakeHistoryByUserAddress
    * @property {String} address.required - Add address - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    */
    /**
    * @route GET /api/eth/nexon/getStakeHistoryByUserAddress
    * @param {getStakeHistoryByUserAddress.model} address.query
    * @group Frontend_API
    * @security Basic Auth
    */
   router.get('/getStakeHistoryByUserAddress', BackendAPI.getStakeHistoryByUserAddress);

    /**
    * @typedef getAllTransformTableDataByAddress
    * @property {String} address.required - Add address - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    */
    /**
    * @route GET /api/eth/nexon/getAllTransformTableDataByAddress
    * @param {getAllTransformTableDataByAddress.model} address.query
    * @group Frontend_API
    * @security Basic Auth
    */
   router.get('/getAllTransformTableDataByAddress', BackendAPI.getAllTransformTableDataByAddress);

    /**
    * @typedef DeleteTransformTable
    */
    /**
    * @route GET /api/eth/nexon/DeleteTransformTable
    * @group Frontend_API
    * @security Basic Auth
    */
   router.get('/DeleteTransformTable', BackendAPI.DeleteTransformTable)
   
    /**
    * @typedef checkBTCAddress
    * @property {String} address.required - Add address - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    */
    /**
    * @route GET /api/eth/nexon/checkBTCAddress
    * @param {checkBTCAddress.model} address.query
    * @group Frontend_API
    * @security Basic Auth
    */
    router.get('/checkBTCAddress', BackendAPI.checkBTCAddress);

    // /**
    // * @typedef transferRYZ
    // * @property {String} privateKey.required - Add privateKey - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    // * @property {String} toAddress.required - Add toaddress - eg: qehdhakdajdoadh
    // * @property {String} amount.required - Add amount - eg: 10000
    // */
    // /**
    // * @route POST /api/eth/nexon/transferRYZ
    // * @param {transferRYZ.model} req.body
    // * @group Frontend_API
    // * @security Basic Auth
    // */
    // router.post('/transferRYZ', BackendAPI.transferRYZ);

  /**
    * @typedef purchaseRYZ
    * @property {String} privateKey.required - Add privateKey - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    */
    /**
    * @route POST /api/eth/nexon/purchaseRYZ
    * @param {purchaseRYZ.model} req.body
    * @group Frontend_API
    * @security Basic Auth
    */
    router.post('/purchaseRYZ', BackendAPI.purchaseRYZ);

  /**
    * @typedef transferRYZ
    * @property {String} privateKey.required - Add privateKey - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    */
    /**
    * @route POST /api/eth/nexon/withdrawPurchasedRYZ
    * @param {withdrawPurchasedRYZ.model} req.body
    * @group Frontend_API
    * @security Basic Auth
    */
    router.post('/withdrawPurchasedRYZ', BackendAPI.withdrawPurchasedRYZ);
    
    /**
    * @typedef getContractAddress
    */
    /**
    * @route GET /api/eth/nexon/getContractAddress
    * @group Frontend_API
    * @security Basic Auth
    */
    router.get('/getContractAddress', BackendAPI.getContractAddress);

    /**
    * @typedef getAllBTCRewardsByAddress
    * @property {String} address.required - Add address - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    */
    /**
    * @route GET /api/eth/nexon/getAllBTCRewardsByAddress
    * @param {checkBTCAddress.model} address.query
    * @group Frontend_API
    * @security Basic Auth
    */
    router.get('/getAllBTCRewardsByAddress', BackendAPI.getAllBTCRewardsByAddress);

    /**
    * @typedef resetAllBTCRewardsByAddress
    */
    /**
    * @route GET /api/eth/nexon/resetAllBTCRewardsByAddress
    * @group Frontend_API
    * @security Basic Auth
    */
    router.get('/resetAllBTCRewardsByAddress', BackendAPI.resetAllBTCRewardsByAddress);
    
    /**
    * @typedef getAllBTCRewards
    */
    /**
    * @route GET /api/eth/nexon/getAllBTCRewards
    * @group Frontend_API
    * @security Basic Auth
    */
    router.get('/getAllBTCRewards', BackendAPI.getAllBTCRewards);

    /**
    * @typedef genrateBitcoinMessage
    */
    /**
    * @route GET /api/eth/nexon/genrateBitcoinMessage
    * @group Frontend_API
    * @security Basic Auth
    */
    router.get('/genrateBitcoinMessage', BackendAPI.genrateBitcoinMessage);

    /**
    * @typedef validateBitcoinSignature
    * @property {String} signature.required - Add signature - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    * @property {String} signature.required - Add address - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    */
    /**
    * @route GET /api/eth/nexon/validateBitcoinSignature
    * @param {validateBitcoinSignature.model} signature.query
    * @param {validateBitcoinSignature.model} address.query
    * @group Frontend_API
    * @security Basic Auth
    */
    router.get('/validateBitcoinSignature', BackendAPI.validateBitcoinSignature);

    /**
    * @typedef getBTCBalance
    * @property {String} signature.required - Add address - eg: XdAUmwtig27HBG6WfYyHAzP8n6XC9jESEw
    */
    /**
    * @route GET /api/eth/nexon/getBTCBalance
    * @param {getBTCBalance.model} address.query
    * @group Frontend_API
    * @security Basic Auth
    */
    router.get('/getBTCBalance', BackendAPI.getBTCBalance);

    /**
    * @typedef getStakeDetails
    * @property {String} endTime.required - Add endTime - eg: 156778433
    * @property {String} amount.required - Add amount - eg: 100000
    */
    /**
    * @route GET /api/eth/nexon/getStakeDetails
    * @param {getStakeDetails.model} endTime.query
    * @param {getStakeDetails.model} amount.query
    * @group Frontend_API
    * @security Basic Auth
    */
   router.get('/getStakeDetails', BackendAPI.getStakeDetails);
    
   /**
    * @typedef getABI
    */
    /**
    * @route GET /api/eth/nexon/getABI
    * @security Basic Auth
    */
   router.get('/getABI', BackendAPI.getABI);
   

    

module.exports= router
