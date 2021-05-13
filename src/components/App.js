import './App.css';
import React, { useEffect, useState} from 'react';

// component
import Header from './Header'

// bootstrap
import { Container, Row, Col, Card, Button, Table} from 'react-bootstrap'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Modal from 'react-bootstrap/Modal'

// react-icons
// import { FiExternalLink } from "react-icons/fi";
import COIN1 from '../images/COIN_01.png'
import COIN2 from '../images/COIN_02.png'
import COIN3 from '../images/COIN_03.png'
import MACHINE from '../images/lottery_machine.png'

// chain
import Web3 from 'web3'
import Lottery from '../abis/Lottery.json'

const METAMAST_BASE64_URL = "data:image/svg+xml;utf8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMTIiIGhlaWdodD0iMTg5IiB2aWV3Qm94PSIwIDAgMjEyIDE4OSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cG9seWdvbiBmaWxsPSIjQ0RCREIyIiBwb2ludHM9IjYwLjc1IDE3My4yNSA4OC4zMTMgMTgwLjU2MyA4OC4zMTMgMTcxIDkwLjU2MyAxNjguNzUgMTA2LjMxMyAxNjguNzUgMTA2LjMxMyAxODAgMTA2LjMxMyAxODcuODc1IDg5LjQzOCAxODcuODc1IDY4LjYyNSAxNzguODc1Ii8+PHBvbHlnb24gZmlsbD0iI0NEQkRCMiIgcG9pbnRzPSIxMDUuNzUgMTczLjI1IDEzMi43NSAxODAuNTYzIDEzMi43NSAxNzEgMTM1IDE2OC43NSAxNTAuNzUgMTY4Ljc1IDE1MC43NSAxODAgMTUwLjc1IDE4Ny44NzUgMTMzLjg3NSAxODcuODc1IDExMy4wNjMgMTc4Ljg3NSIgdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwIDEgMjU2LjUgMCkiLz48cG9seWdvbiBmaWxsPSIjMzkzOTM5IiBwb2ludHM9IjkwLjU2MyAxNTIuNDM4IDg4LjMxMyAxNzEgOTEuMTI1IDE2OC43NSAxMjAuMzc1IDE2OC43NSAxMjMuNzUgMTcxIDEyMS41IDE1Mi40MzggMTE3IDE0OS42MjUgOTQuNSAxNTAuMTg4Ii8+PHBvbHlnb24gZmlsbD0iI0Y4OUMzNSIgcG9pbnRzPSI3NS4zNzUgMjcgODguODc1IDU4LjUgOTUuMDYzIDE1MC4xODggMTE3IDE1MC4xODggMTIzLjc1IDU4LjUgMTM2LjEyNSAyNyIvPjxwb2x5Z29uIGZpbGw9IiNGODlEMzUiIHBvaW50cz0iMTYuMzEzIDk2LjE4OCAuNTYzIDE0MS43NSAzOS45MzggMTM5LjUgNjUuMjUgMTM5LjUgNjUuMjUgMTE5LjgxMyA2NC4xMjUgNzkuMzEzIDU4LjUgODMuODEzIi8+PHBvbHlnb24gZmlsbD0iI0Q4N0MzMCIgcG9pbnRzPSI0Ni4xMjUgMTAxLjI1IDkyLjI1IDEwMi4zNzUgODcuMTg4IDEyNiA2NS4yNSAxMjAuMzc1Ii8+PHBvbHlnb24gZmlsbD0iI0VBOEQzQSIgcG9pbnRzPSI0Ni4xMjUgMTAxLjgxMyA2NS4yNSAxMTkuODEzIDY1LjI1IDEzNy44MTMiLz48cG9seWdvbiBmaWxsPSIjRjg5RDM1IiBwb2ludHM9IjY1LjI1IDEyMC4zNzUgODcuNzUgMTI2IDk1LjA2MyAxNTAuMTg4IDkwIDE1MyA2NS4yNSAxMzguMzc1Ii8+PHBvbHlnb24gZmlsbD0iI0VCOEYzNSIgcG9pbnRzPSI2NS4yNSAxMzguMzc1IDYwLjc1IDE3My4yNSA5MC41NjMgMTUyLjQzOCIvPjxwb2x5Z29uIGZpbGw9IiNFQThFM0EiIHBvaW50cz0iOTIuMjUgMTAyLjM3NSA5NS4wNjMgMTUwLjE4OCA4Ni42MjUgMTI1LjcxOSIvPjxwb2x5Z29uIGZpbGw9IiNEODdDMzAiIHBvaW50cz0iMzkuMzc1IDEzOC45MzggNjUuMjUgMTM4LjM3NSA2MC43NSAxNzMuMjUiLz48cG9seWdvbiBmaWxsPSIjRUI4RjM1IiBwb2ludHM9IjEyLjkzOCAxODguNDM4IDYwLjc1IDE3My4yNSAzOS4zNzUgMTM4LjkzOCAuNTYzIDE0MS43NSIvPjxwb2x5Z29uIGZpbGw9IiNFODgyMUUiIHBvaW50cz0iODguODc1IDU4LjUgNjQuNjg4IDc4Ljc1IDQ2LjEyNSAxMDEuMjUgOTIuMjUgMTAyLjkzOCIvPjxwb2x5Z29uIGZpbGw9IiNERkNFQzMiIHBvaW50cz0iNjAuNzUgMTczLjI1IDkwLjU2MyAxNTIuNDM4IDg4LjMxMyAxNzAuNDM4IDg4LjMxMyAxODAuNTYzIDY4LjA2MyAxNzYuNjI1Ii8+PHBvbHlnb24gZmlsbD0iI0RGQ0VDMyIgcG9pbnRzPSIxMjEuNSAxNzMuMjUgMTUwLjc1IDE1Mi40MzggMTQ4LjUgMTcwLjQzOCAxNDguNSAxODAuNTYzIDEyOC4yNSAxNzYuNjI1IiB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAgMSAyNzIuMjUgMCkiLz48cG9seWdvbiBmaWxsPSIjMzkzOTM5IiBwb2ludHM9IjcwLjMxMyAxMTIuNSA2NC4xMjUgMTI1LjQzOCA4Ni4wNjMgMTE5LjgxMyIgdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwIDEgMTUwLjE4OCAwKSIvPjxwb2x5Z29uIGZpbGw9IiNFODhGMzUiIHBvaW50cz0iMTIuMzc1IC41NjMgODguODc1IDU4LjUgNzUuOTM4IDI3Ii8+PHBhdGggZmlsbD0iIzhFNUEzMCIgZD0iTTEyLjM3NTAwMDIsMC41NjI1MDAwMDggTDIuMjUwMDAwMDMsMzEuNTAwMDAwNSBMNy44NzUwMDAxMiw2NS4yNTAwMDEgTDMuOTM3NTAwMDYsNjcuNTAwMDAxIEw5LjU2MjUwMDE0LDcyLjU2MjUgTDUuMDYyNTAwMDgsNzYuNTAwMDAxMSBMMTEuMjUsODIuMTI1MDAxMiBMNy4zMTI1MDAxMSw4NS41MDAwMDEzIEwxNi4zMTI1MDAyLDk2Ljc1MDAwMTQgTDU4LjUwMDAwMDksODMuODEyNTAxMiBDNzkuMTI1MDAxMiw2Ny4zMTI1MDA0IDg5LjI1MDAwMTMsNTguODc1MDAwMyA4OC44NzUwMDEzLDU4LjUwMDAwMDkgQzg4LjUwMDAwMTMsNTguMTI1MDAwOSA2My4wMDAwMDA5LDM4LjgxMjUwMDYgMTIuMzc1MDAwMiwwLjU2MjUwMDAwOCBaIi8+PGcgdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwIDEgMjExLjUgMCkiPjxwb2x5Z29uIGZpbGw9IiNGODlEMzUiIHBvaW50cz0iMTYuMzEzIDk2LjE4OCAuNTYzIDE0MS43NSAzOS45MzggMTM5LjUgNjUuMjUgMTM5LjUgNjUuMjUgMTE5LjgxMyA2NC4xMjUgNzkuMzEzIDU4LjUgODMuODEzIi8+PHBvbHlnb24gZmlsbD0iI0Q4N0MzMCIgcG9pbnRzPSI0Ni4xMjUgMTAxLjI1IDkyLjI1IDEwMi4zNzUgODcuMTg4IDEyNiA2NS4yNSAxMjAuMzc1Ii8+PHBvbHlnb24gZmlsbD0iI0VBOEQzQSIgcG9pbnRzPSI0Ni4xMjUgMTAxLjgxMyA2NS4yNSAxMTkuODEzIDY1LjI1IDEzNy44MTMiLz48cG9seWdvbiBmaWxsPSIjRjg5RDM1IiBwb2ludHM9IjY1LjI1IDEyMC4zNzUgODcuNzUgMTI2IDk1LjA2MyAxNTAuMTg4IDkwIDE1MyA2NS4yNSAxMzguMzc1Ii8+PHBvbHlnb24gZmlsbD0iI0VCOEYzNSIgcG9pbnRzPSI2NS4yNSAxMzguMzc1IDYwLjc1IDE3My4yNSA5MCAxNTMiLz48cG9seWdvbiBmaWxsPSIjRUE4RTNBIiBwb2ludHM9IjkyLjI1IDEwMi4zNzUgOTUuMDYzIDE1MC4xODggODYuNjI1IDEyNS43MTkiLz48cG9seWdvbiBmaWxsPSIjRDg3QzMwIiBwb2ludHM9IjM5LjM3NSAxMzguOTM4IDY1LjI1IDEzOC4zNzUgNjAuNzUgMTczLjI1Ii8+PHBvbHlnb24gZmlsbD0iI0VCOEYzNSIgcG9pbnRzPSIxMi45MzggMTg4LjQzOCA2MC43NSAxNzMuMjUgMzkuMzc1IDEzOC45MzggLjU2MyAxNDEuNzUiLz48cG9seWdvbiBmaWxsPSIjRTg4MjFFIiBwb2ludHM9Ijg4Ljg3NSA1OC41IDY0LjY4OCA3OC43NSA0Ni4xMjUgMTAxLjI1IDkyLjI1IDEwMi45MzgiLz48cG9seWdvbiBmaWxsPSIjMzkzOTM5IiBwb2ludHM9IjcwLjMxMyAxMTIuNSA2NC4xMjUgMTI1LjQzOCA4Ni4wNjMgMTE5LjgxMyIgdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwIDEgMTUwLjE4OCAwKSIvPjxwb2x5Z29uIGZpbGw9IiNFODhGMzUiIHBvaW50cz0iMTIuMzc1IC41NjMgODguODc1IDU4LjUgNzUuOTM4IDI3Ii8+PHBhdGggZmlsbD0iIzhFNUEzMCIgZD0iTTEyLjM3NTAwMDIsMC41NjI1MDAwMDggTDIuMjUwMDAwMDMsMzEuNTAwMDAwNSBMNy44NzUwMDAxMiw2NS4yNTAwMDEgTDMuOTM3NTAwMDYsNjcuNTAwMDAxIEw5LjU2MjUwMDE0LDcyLjU2MjUgTDUuMDYyNTAwMDgsNzYuNTAwMDAxMSBMMTEuMjUsODIuMTI1MDAxMiBMNy4zMTI1MDAxMSw4NS41MDAwMDEzIEwxNi4zMTI1MDAyLDk2Ljc1MDAwMTQgTDU4LjUwMDAwMDksODMuODEyNTAxMiBDNzkuMTI1MDAxMiw2Ny4zMTI1MDA0IDg5LjI1MDAwMTMsNTguODc1MDAwMyA4OC44NzUwMDEzLDU4LjUwMDAwMDkgQzg4LjUwMDAwMTMsNTguMTI1MDAwOSA2My4wMDAwMDA5LDM4LjgxMjUwMDYgMTIuMzc1MDAwMiwwLjU2MjUwMDAwOCBaIi8+PC9nPjwvZz48L3N2Zz4="



function App() {
  // modal
  const [show, setShow] = useState(false);
  // web3
  const [web3, setWeb3] = useState('undefined')
  const [account, setAccount] = useState(null)
  const [accountBalance, setAccountBalance] = useState(0)

  const [lottery, setLottery] = useState(null)
  const [lotteryAddress, setLotteryAddress] = useState(null)
  const [lotteryBalance, setLotteryBalance] = useState(0)
  
  const [manager, setManager] = useState(null)  
  const [ticketPrice, setTicketPrice] = useState(0)
  const [ticketAmount, setTicketAmount] = useState(0)
  const [isGameEnded, setIsGameEnded] = useState(true)
  const [pickReady, setPickReady] = useState(false)
  const [playerCount, setPlayerCount] = useState(0)
  const [players, setPlayers] = useState([])
  const [winners, setWinners] = useState([])
  const [startedTime, setStartedTime] = useState(0)
  const [progress, setProgress] = useState(0)

  const [formPrice, setFormPrice] = useState(0.01)
  const [formAmount, setFormAmount] = useState(1)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect( ()  => {
    
    const loadBlockchainData = async() => {
      if(typeof window.ethereum!=='undefined'){
        const web3 = new Web3(window.ethereum)
        setWeb3(web3)
        
        const netId = await web3.eth.net.getId()
        const accounts = await web3.eth.getAccounts()
        //load balance
        if(typeof accounts[0] !=='undefined'){
          const balance = await web3.eth.getBalance(accounts[0])          
          // console.log(await web3.eth.getCoinbase());
          setAccount(accounts[0])
          setAccountBalance(web3.utils.fromWei(balance))
        } else {
          // Notify to login
          handleShow();        
        }

        //load contracts
        try {
          const lottery = new web3.eth.Contract(Lottery.abi, Lottery.networks[netId].address)
          const lotteryAddress = Lottery.networks[netId].address

          const manager = await lottery.methods.manager().call()
          const lotteryBalance = await lottery.methods.balanceInPool().call()
          const ticketPrice = await lottery.methods.ticket_price().call()
          const isGameEnded = await lottery.methods.isGameEnded().call()
          const ticketAmount = await lottery.methods.target_amount().call()
          const playerCount = await lottery.methods.getPlayerNumber().call()
          const players = await lottery.methods.getPlayers().call()
          const winners = await lottery.methods.getWinners().call()
          const pickReady = await lottery.methods.isReadyPickWinner().call()
          const progress = await lottery.methods.getPercent().call()
          let startedTime = await lottery.methods.getStartedTime().call()
          if(isGameEnded) startedTime = 0
          
          setProgress(progress)
          setStartedTime(startedTime)
          setLotteryBalance(web3.utils.fromWei(lotteryBalance))
          setTicketPrice(web3.utils.fromWei(ticketPrice))
          setTicketAmount(ticketAmount)
          setIsGameEnded(isGameEnded)
          setPickReady(pickReady)
          setPlayers(players)
          setWinners(winners)
          setPlayerCount(playerCount)
          setLottery(lottery)
          setLotteryAddress(lotteryAddress)
          setManager(manager)
        } catch (e) {
          console.log('Error', e)
          console.log('Contracts not deployed to the current network')
        }
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying Metamask!')
      }
    }
    // Load 
    loadBlockchainData()
  },[]);

  const loadContractData = async () => {
    // console.log(lottery)
    try {
      const lotteryBalance = await lottery.methods.balanceInPool().call()
      const ticketPrice = await lottery.methods.ticket_price().call()
      const isGameEnded = await lottery.methods.isGameEnded().call()
      const ticketAmount = await lottery.methods.target_amount().call()
      const playerCount = await lottery.methods.getPlayerNumber().call()
      const players = await lottery.methods.getPlayers().call()
      const pickReady = await lottery.methods.isReadyPickWinner().call()
      const startedTime = await lottery.methods.getStartedTime().call()
      const progress = await lottery.methods.getPercent().call()

      setProgress(progress)
      setStartedTime(startedTime)
      setLotteryBalance(web3.utils.fromWei(lotteryBalance))
      setTicketPrice(web3.utils.fromWei(ticketPrice))
      setTicketAmount(ticketAmount)
      setIsGameEnded(isGameEnded)
      setPickReady(pickReady)
      setPlayers(players)
      setPlayerCount(playerCount)
    } catch (e) {
      console.log('Error', e)
      console.log('Contracts not deployed to the current network')
    }
  }

  // connect wallet 
  const connectWallet = async() => {
    const isEnabled = await window.ethereum.enable();
    if(isEnabled) {
      const accounts = await web3.eth.getAccounts()   

      if(typeof accounts[0] !=='undefined'){
        const balance = await web3.eth.getBalance(accounts[0])
        setAccount(accounts[0])
        setAccountBalance(web3.utils.fromWei(balance))
      } else window.alert("something went wrong")
    } else {
      alert("Connection has been refused")
    }
    handleClose()
  }

  // buy ticket
  const buyTicket = async()=>{
    if(account == null || account == '') {
      handleShow();
      return;
    }
    
    if(lottery && lottery !== 'undefined') {
      if(isGameEnded) {
        window.alert("Game has not been started yet");
      } else {
        try {
          var wei_price = ticketPrice * 10 ** 18
          
          const buyApp = await lottery.methods.enter().send({value: wei_price.toString(), from: account})
          await loadContractData()
        } catch (e) {
          console.log('Error, buy ticket: ', e)
        }
      }
    } else {
      alert("contract has not deployed yet.")
    }
  }

  const pickWinner = async()=>{
    if(account == null || account == '') {
      handleShow();
      return;
    }

    if(lottery && lottery !== 'undefined') {
      if(pickReady) {
        try {
          await lottery.methods.pickWinner().send({from: account})
          await loadContractData()
        } catch (e) {
          console.log('Error, pick ready : ', e)
        }
      }
    } else {
      alert("contract has not deployed yet.")
    }
  }

  // create new lottery
  const createLottery = async (amount, price) => {
    if(account == null || account == '') {
      handleShow();
      return;
    }

    if(lottery && lottery !== 'undefined') {
      if(!manager || manager !== account) {
        window.alert("You have no access role")
        return;
      }

      if(!isGameEnded) {
        window.alert("Game is running now");
        return;
      }

      try {
        // console.log("create lottery : ", amount, price, account)
        var wei_price = web3.utils.toWei(price.toString(), 'Ether');
        const initLottery = await lottery.methods.initialize(wei_price, amount).send({from: account})
        await loadContractData()
      } catch (e) {
        console.log('Error, creat ticket: ', e)
      }
    } else {
      alert("contract has not deployed yet.")
    }
  }

  const handleConnectCallBack = async() => {
    await connectWallet()
    await loadContractData()
  }

  const handleDisconnectCallBack = async() => {
    // await web3.eth.accounts.wallet.clear();
    // await loadContractData()
  }

  const handlePriceChange = (e) => {
    setFormPrice( e.target.value );
  }

  const handleAmountChange = (e) => {
    setFormAmount( e.target.value );
  }
  const secondsToHms = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay; 
  }

  return (
    <>
      <Header 
        handleConnectCallBack={handleConnectCallBack} 
        account={account}
        handleDisconnectCallBack={handleDisconnectCallBack}
      />
      <Modal
        show={show}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title>Welcome to our Lottery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={METAMAST_BASE64_URL} width="80px" height="80px" alt="meta mask icon"/>
          <p>Please connect your wallet on this site to enter the lottery.</p>
        </Modal.Body>
        <Modal.Footer >
          <Button variant="secondary" onClick={handleClose}>
            Skip it now
          </Button>
          <Button variant="primary" onClick={connectWallet}>Connect wallet</Button>
        </Modal.Footer>
      </Modal>

        <div style={{float: 'right'}}>
          <img src={MACHINE} alt="machine"/>
        </div>
      <Container>      
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h4 style={{margin:'20px'}}>Welcome to Lottery. Please enjoy the day here. ✌️</h4>
          </Col>
        </Row>
        <div>
          <img src={COIN1} alt="coin1"  style={{width: '40px', height: '40px'}}/>
          <i>Your Balance : {accountBalance} </i>
        </div>
        
        
        {
          manager === account ? 
            isGameEnded ?
            <Card style={{marginTop:'50px', marginBottom:'50px'}}>
              <Card.Body>
                <Card.Title>Create the new Lottery</Card.Title>
                <form 
                  className="form-inline row" 
                  onSubmit={(e) => {
                    e.preventDefault()
                    createLottery(formAmount, formPrice)
                  }                      
                }>
                  <div className="col-md-7">
                    <div className='form-group mb-2'>
                      <label htmlFor="price" className="sr-only">Ticket Price (BNB)</label>
                      <input
                        id='price'
                        step="0.01"
                        type='number'
                        className="form-control"
                        placeholder='price... ex: 0.01'
                        value={formPrice}
                        onChange={handlePriceChange}
                        required />
                    </div>
                    <div className='form-group mb-2'>
                      <label htmlFor="amount" className="sr-only">Ticket Amount</label>
                      <input
                        id='amount'
                        step="1"
                        type='number'
                        className="form-control"
                        placeholder='amount... ex: 1'
                        value={formAmount}
                        onChange={handleAmountChange}
                        required />
                    </div>
                    <Button variant="primary" type="submit">Create new Lottery</Button>
                  </div>
                  <div className="col-md-5 text-center" style={{paddingTop:'20px'}}>
                    <img src={COIN2} alt="coin2" className="icon2"/>
                  </div>
                  {/* <button type='submit' className='btn btn-primary'>DEPOSIT</button> */}
                </form>
                {/* <Button variant="primary" onClick={createLottery}>Create new Lottery</Button> */}
              </Card.Body>
            </Card>
            : pickReady ?
            <Card style={{marginTop:'50px', marginBottom:'50px'}}>
              <Card.Body>
                <Card.Title>Game has been ended! Pick up winner.</Card.Title>
                <form 
                  className="form-inline" 
                  onSubmit={(e) => {
                    e.preventDefault()
                    pickWinner()
                  }                      
                }>
                  <Button variant="primary" type="submit">Pick Winner</Button>
                </form>
              </Card.Body>
            </Card>
            : <></>
          : <></>
        }
        <ProgressBar max={100} now={progress} label={`${progress}%`} animated srOnly/>
        <Card>
          <Card.Body className="row">
            <Card.Title>Current Lottery Room : {lotteryAddress}</Card.Title>
            <div className="col-md-7">
            <Card.Text>
              <i><small>Started at : {startedTime === '0'? "0s" : secondsToHms(startedTime)} </small></i>
            </Card.Text>
            <Card.Text>
              Current balance : { lotteryBalance }
            </Card.Text>
            
            <Card.Text>
              Available Ticket Count : { ticketAmount }
            </Card.Text>

            <Card.Text>
              Please buy the ticket with <b> {ticketPrice} BNB</b> and be a winner!
            </Card.Text>
            {
              isGameEnded || pickReady ? 
              <div>
                <p>Lottery round has not been started newly</p>
                <Button variant="primary" disabled>Buy Ticket</Button>
              </div>
              : <Button variant="primary" onClick={buyTicket}>Buy Ticket</Button>
            }
            </div>
            <div className="col-md-5" style={{ paddingTop: '30px'}}>
              <img src={COIN3} alt="icon3" className="icon3"/>
            </div>
          </Card.Body>
        </Card>

        {/* Current Player */}

        <Row style={{marginTop: '50px'}}>
          <Col md="6">
            Current Players : {playerCount}
            <Table responsive>
              <tbody>
                {
                  players.map((player, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{idx+1}</td>
                        <td>{player}</td>
                      </tr>
                    )
                  })    
                }
              </tbody>
            </Table>
          </Col>
          <Col md="6">
            Previous winners
            <Table responsive>
              <tbody>
                {
                  winners.map((winner, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{idx+1}</td>
                        <td>{winner}</td>
                      </tr>
                    )
                  })    
                }
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;


  /* 
  <Accordion>
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey="0">
        address
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        <Card.Body>
          <p>date<a href="/" style={{float:'right'}}><FiExternalLink/></a></p>
          <p>winner</p>
        
        </Card.Body>
      </Accordion.Collapse>
    </Card>
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey="1">
        Click me!
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="1">
        <Card.Body>Hello! I'm another body</Card.Body>
      </Accordion.Collapse>
    </Card>
  </Accordion> */

