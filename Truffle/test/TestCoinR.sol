pragma solidity >=0.4.25 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/CoinR.sol";

contract TestCoinR {

  function testInitialBalanceUsingDeployedContract() public {
    CoinR meta = CoinR(DeployedAddresses.CoinR());

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 CoinR initially");
  }

  function testInitialBalanceWithNewCoinR() public {
    CoinR meta = new CoinR();

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 CoinR initially");
  }

}
