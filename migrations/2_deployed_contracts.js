
const Lottery = artifacts.require("Lottery");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(Lottery);
};
