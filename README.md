# ERC721

[![license-mit](https://img.shields.io/badge/License-MIT-teal.svg)](https://opensource.org/license/mit/)
[![build-test](https://github.com/veeso-dev/erc721-template/actions/workflows/build-test.yml/badge.svg)](https://github.com/veeso-dev/erc721-template/actions/workflows/build-test.yml)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)

## Get started

### Setup env

```sh
cp .env.github .env
nano .env
```

- DEV_PRIVATE_KEY: should be set to deploy on devnet
- PROD_PRIVATE_KEY: should be set to deploy on production (KEEP IT SECRET!!!)
- OWNER_ADDRESS: must be set to initial owner of the contract

### Compile

Run

```sh
yarn
yarn compile
```

### Deploy

```sh
yarn deploy:localhost
yarn deploy:goerli
yarn deploy:ethereum
```

### Mint and administrate NFT

Enter directory `./app`

and run the NFT Web UI

```sh
yarn
# get web3.min.js
mkdir -p node_modules/web3/dist/
wget -O node_modules/web3/dist/web3.min.js "https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"
# run
yarn dev
```

Now browse to <http://localhost:1234/>.

## How to setup code from template

## IPFS upload

This repo comes with a built-in IPFS upload tool.

Read more in this [README](./tools/ipfs-upload/README.md)

## License

ERC721 template is licensed under the MIT license.

See the full license [HERE](./LICENSE)
