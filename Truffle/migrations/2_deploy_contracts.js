const ConvertLib = artifacts.require("ConvertLib");
const CoinR = artifacts.require("CoinR");

module.exports = function(deployer) {
    deployer.deploy(ConvertLib);
    deployer.link(ConvertLib, CoinR);
    deployer.deploy(CoinR);
};