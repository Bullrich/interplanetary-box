# Interplanetary Box

Store your files safely and secure inside IPFS.

![Continuous testing](https://github.com/Bullrich/interplanetary-box/workflows/Continuous%20testing/badge.svg?event=push)

Interplanetary Box is a system which allows users to encrypt their files and store them in IPFS, while keeping an index of their files inside a smart contract deployed by them. 

## How to set up development environment

First of all, you need to get an api key from [nft.storage](https://nft.storage/)

Run an instance of Postgresql in Docker:
`docker run -p 5455:5432 -e POSTGRES_USER=user -e POSTGRES_PASSWORD=pass -e POSTGRES_DB=myDb postgres`

and then create a `.env` file with the following:
```
DATABASE_URL="postgresql://user:pass@localhost:5455/myDb"

NFT_STORAGE_API_KEY="nft.storage api key goes here"
```

After that you need to run two commands:
```
npm install
npm run build
```

If you want to start the development server run: 
`npm run dev`

Or, to run the production server: 
`npm start`
