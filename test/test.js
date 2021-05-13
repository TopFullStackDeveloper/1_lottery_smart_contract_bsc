import { tokens, ether, ETHER_ADDRESS, ONLY_OWNER, EVM_REVERT, wait } from './helper.js'

const Lottery = artifacts.require('./Lottery')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Lottery', ([deployer, user]) => {
    let lottery
    // let admin_address

    console.log(deployer)
    console.log(user)

    beforeEach(async () => {
        lottery = await Lottery.new()
    })

    describe('testing lottery contract ...', function() {
        it('game should not be started ...', async () => {
            expect(await lottery.isGameEnded()).to.be.eq(true)
        });
    });

    describe('testing game start ...', function() {
        beforeEach(async () => {
            // price , amount
            await lottery.initialize(20, 10, { from: deployer });
        })

        it('game should be started ...', async () => {
            expect(await lottery.isGameEnded()).to.be.eq(false)
        });

        it('ticket price ...', async () => {
            expect(Number(await lottery.ticket_price())).to.eq(20)
        });

        it('ticket amount ...', async () => {
            expect(Number(await lottery.target_amount())).to.eq(10)
        });
    });

    describe('player enter ...', function() {
        beforeEach(async () => {
            // price , amount
            await lottery.initialize(20, 10, { from: deployer });
            await lottery.enter({ from: deployer, value: 20 });
            await lottery.enter({ from: deployer, value: 20 });
            await lottery.enter({ from: deployer, value: 20 });
            await lottery.enter({ from: deployer, value: 20 });
            await lottery.enter({ from: deployer, value: 20 });
            await lottery.enter({ from: deployer, value: 20 });
            await lottery.enter({ from: deployer, value: 20 });
            await lottery.enter({ from: deployer, value: 20 });
            await lottery.enter({ from: deployer, value: 20 });
            await lottery.enter({ from: deployer, value: 20 });
        })

        it('remain ticket amount...', async () => {
            expect(Number(await lottery.target_amount())).to.eq(0)
        });

        it('Number of player...', async () => {
            expect(Number(await lottery.getPlayerNumber())).to.eq(10)
        });

        it('balance of contract...', async () => {
            expect(Number(await lottery.balanceInPool())).to.eq(20 * 10)
        });

        it('Game should be ended...', async () => {
            expect(await lottery.isGameEnded()).to.eq(true);
        });
    });

    describe('pickup winner ...', function() {
        beforeEach(async () => {
            await lottery.initialize(20, 10, { from: deployer });
            await lottery.enter({ from: deployer, value: 20 });
            await lottery.enter({ from: deployer, value: 20 });
            await lottery.enter({ from: deployer, value: 20 });
            await lottery.enter({ from: deployer, value: 20 });
            await lottery.enter({ from: deployer, value: 20 });
            await lottery.enter({ from: deployer, value: 20 });
            await lottery.enter({ from: deployer, value: 20 });
            await lottery.enter({ from: deployer, value: 20 });
            await lottery.enter({ from: deployer, value: 20 });
            await lottery.enter({ from: deployer, value: 20 });
            await lottery.pickWinner({from: deployer});
        });
        
        it('pickWinner success...', async () => {
            expect(Number(await lottery.balanceInPool())).to.eq(0);
        });

        
        it('remain ticket amount...', async () => {
            expect(Number(await lottery.target_amount())).to.eq(0)
        });

        it('Number of player...', async () => {
            expect(Number(await lottery.getPlayerNumber())).to.eq(0)
        });
    });
});