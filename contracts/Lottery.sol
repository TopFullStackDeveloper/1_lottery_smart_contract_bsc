// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

// lottery contract
contract Lottery {
    // manager address
    address public manager;
    // lottery players
    address[] public  players;
    // target amount of tickets
    uint public target_amount;
    // price of ticket
    uint public ticket_price;
    // max price of ticket
    uint public max_ticket_price;
    // check if game finished
    bool public isGameEnded = true;

    // add mapping
    // mapping(address => bool) playerEntered;

    // add event
    event PickWinner(address indexed winner, uint balance);

    // constructor
    constructor() {
        // define administrator with deployer
        manager = msg.sender;
        isGameEnded = true;
    }

    // role middleware
    modifier restricted() {
        require(msg.sender == manager,"only manager has access");
        _;
    }
    // middleware to check if game is on or off
    modifier onGame() {
        require(!isGameEnded, "Game has not started yet.");
        _;
    }

    // Get Balance of pool
    function balanceInPool()public view returns(uint){
        return address(this).balance;
    }

    // enter the game
    function enter() public payable onGame{
        // require(!playerEntered[msg.sender], "You have already taken the ticket");
        require(msg.value == ticket_price,"the price doesnot match with standard price");
        players.push(msg.sender);

        target_amount = target_amount - 1;
        if(target_amount == 0) {
            isGameEnded = true;
        }
        // playerEntered[msg.sender] = true;
    }

    // initialize the game
    function initialize(
        uint _ticketPrice,
        uint _ticketAmount
    ) public restricted {
        // before init newly, previous game should be finished.
        require(isGameEnded, "Game is running now.");

        ticket_price = _ticketPrice;
        target_amount = _ticketAmount;
        isGameEnded = false;
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp,players)));
    }

    function pickWinner() public restricted {
        require(isGameEnded, "Game is running now.");

        uint index = random() % players.length;
        address payable winner = payable(players[index]);
        players = new address[](0);
        uint winBalance = address(this).balance;
        winner.transfer(address(this).balance);

        emit PickWinner(winner, winBalance);
    }

    function getPlayers()public view returns(address[] memory){
        return players;
    }

    function getPlayerNumber() public view returns(uint) {
        return players.length;
    }
}