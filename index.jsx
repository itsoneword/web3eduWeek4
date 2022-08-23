import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { NFTCard } from "./components/nftCard"


//import { Button } from "reactstrap";

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);
  const startToken = 0;



  //======get NFT for address only, w/o collection====//
  const fetchNFTs = async () => {
    let nfts;
    console.log("fetching nfts");
    const api_key = "EnterAPIHere"
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;
    var requestOptions = {
      method: 'GET'
    };

    if (!collection.length) {

      const fetchURL = `${baseURL}?owner=${wallet}`;

      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
      console.log("fetching nfts for collection owned by address")
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    }

    if (nfts) {
      console.log("nfts:", nfts)
      setNFTs(nfts.ownedNfts)
    }
  }
  //======get NFT for address with collection ====//

  const fetcNFTsforCollection = async () => {
    if (collection.length) {

      var requestOptions = {
        method: 'GET'

      };

      const api_key = "EnterAPIHere"
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}&startToken=${startToken}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if (nfts) {
        console.log("NFTs in collection:", nfts)
        setNFTs(nfts.nfts)
      }
    }
  }


  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">

        <input disabled={fetchForCollection} className="w-3/5 rounded-md focus:outlinr-blue-400 bg-gray-100 disabled:bg-state-50" onChange={(e) => { setWalletAddress(e.target.value) }} value={wallet} type={"text"} placeholder="Enter wallet address"></input>
        <input className="w-3/5 rounded-md focus:outlinr-blue-400 bg-gray-100 disabled:bg-state-50" onChange={(e) => { setCollectionAddress(e.target.value) }} value={collection} type={"text"} placeholder="Enter the collection address"></input>
        <label className='text-blue-600'> <input onChange={(e) => { setFetchForCollection(e.target.checked) }} type={"checkbox"} className="mr-2"></input> Fetch for collection</label>

        <button
          className={"disabled:bg-slate-500 text-white bg-blue-400 px-6 py-2 mt-3 rounded-2xl w-1/4 "}
          type="submit"
          onClick={
            () => {
              if (fetchForCollection) {
                fetcNFTsforCollection()
              } else {
                fetchNFTs()
              }
            }
          }>Show NFTs!</button>

        <div className='px-6 gap-x-2 flex'>
          <button
            className={"disabled:bg-slate-500 text-white bg-blue-400 px-6 py-2 mt-3 w-4/6"}
            type="submit"
            onClick={() => {
              startToken -= 100
              if (fetchForCollection) {
                fetcNFTsforCollection()
              } else {
                fetchNFTs()
              }
            }
            }> Previous 100 NFTs! </button>
          <button
            className={"disabled:bg-slate-500 text-white bg-blue-400 px-6 py-2 mt-3 w-4/6"}
            type="submit"
            onClick={() => {
              startToken += 100
              if (fetchForCollection) {
                fetcNFTsforCollection()
              } else {
                fetchNFTs()
              }
            }
            }> Next 100 NFTs! </button>

        </div>
      </div>

      <div className="flex flex-wrap gap-y-12 mt-4 gap-x-2 justify-center">
        {
          NFTs.length && NFTs.map(nft => {

            return (
              <NFTCard nft={nft}></NFTCard>
            )
          })
        }
      </div>
    </div>

  )
}

export default Home


/*  HW: 
1. add button to copy NFT owner address. 
2. add button to list next\previous 100 NFTs */