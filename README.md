
# Lottery smart contract
### install truffle to deploy on local development, testnet, mainnet, etc
```shell
yarn add truffle
```

### install ganache module to set up local development environment
```shell
npm install -g ganache
```

### install node modules
```shell
yarn install
```

### if you want to deploy the smart contract on the local
```shell
truffle migrate --reset --network development
```

### if you want to deploy the smart contract on bsc-testnet
```shell
truffle migrate --reset --network testnet
```

### if you want to deploy the smart contract on bsc-mainnet
```shell
truffle migrate --reset --network bsc
```

### after you deployed the smart contract successfully
```shell
yarn start
```

### if you want to deploy this lottery site to cloud
```shell
yarn build
```

### note
after running `yarn build`, you need to copy abi directory from `src/abi` to `build/abi`
