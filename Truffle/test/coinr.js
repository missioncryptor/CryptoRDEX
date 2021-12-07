const CoinR = artifacts.require("CoinR");

contract('CoinR', (accounts) => {
    it('should put 10000 CoinR in the first account', async() => {
        const CoinRInstance = await CoinR.deployed();
        const balance = await CoinRInstance.getBalance.call(accounts[0]);

        assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    });
    it('should call a function that depends on a linked library', async() => {
        const CoinRInstance = await CoinR.deployed();
        const CoinRBalance = (await CoinRInstance.getBalance.call(accounts[0])).toNumber();
        const CoinREthBalance = (await CoinRInstance.getBalanceInEth.call(accounts[0])).toNumber();

        assert.equal(CoinREthBalance, 2 * CoinRBalance, 'Library function returned unexpected function, linkage may be broken');
    });
    it('should send coin correctly', async() => {
        const CoinRInstance = await CoinR.deployed();

        // Setup 2 accounts.
        const accountOne = accounts[0];
        const accountTwo = accounts[1];

        // Get initial balances of first and second account.
        const accountOneStartingBalance = (await CoinRInstance.getBalance.call(accountOne)).toNumber();
        const accountTwoStartingBalance = (await CoinRInstance.getBalance.call(accountTwo)).toNumber();

        // Make transaction from first account to second.
        const amount = 10;
        await CoinRInstance.sendCoin(accountTwo, amount, { from: accountOne });

        // Get balances of first and second account after the transactions.
        const accountOneEndingBalance = (await CoinRInstance.getBalance.call(accountOne)).toNumber();
        const accountTwoEndingBalance = (await CoinRInstance.getBalance.call(accountTwo)).toNumber();


        assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
        assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
    });
});