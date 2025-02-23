/* eslint-disable no-undef */
import '../App.css'
import React, { useEffect, useMemo, useState } from 'react';
import { Web3Button, Web3Modal, useWeb3Modal } from '@web3modal/react';
import { mainnet, useDisconnect, useAccount, useContractRead, useContractReads, useContractWrite, useNetwork, usePublicClient, useSwitchNetwork } from 'wagmi';
import { createPublicClient, formatEther, http, parseEther } from 'viem';
//import { optimism } from 'wagmi/chains'
import pic from '../assets/file.png';
import $ from "jquery";
import { Web3 } from "web3";
import axios from 'axios';
import warning from '../assets/warning.png';
import arrow from '../assets/right-arrow.png';
import Auctions from '../Components/Auctions';

const renderer = ({ days, hours, minutes, seconds, completed }) => {
	/*	if (completed) {
			// Render a completed state
			return <Completionist />;
		} else {*/
	// Render a countdowns

	if (days == 0 && hours == 0 && minutes == 0 && seconds == 0) {

		window.location.reload(true);
		console.log("Mint Begins");
	}


	return <div class="counterBlock"><div class="days">{days}</div><div class="dots">:</div><div class="days">{hours}</div><div class="dots">:</div><div class="days">{minutes}</div><div class="dots">:</div><div class="sec">{seconds}</div></div>;
	/*	}*/
};

const terms = () => {
	window.open("https://treepoetry.org/pages/terms-of-use-for-apps");
}

const tpLink = () => {
	window.open("https://treepoets.com/");
}

let ABI = [
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "index",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "nonprofit",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "donationAmount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "poet",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "illustrator",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "notes",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "propertyRights",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "metadataURL",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "imageURL",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "walletAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isDeleted",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isMinted",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "tokenID",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "bonus",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "associatedWallet",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "collectionName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "counter",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isListed",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "highestBid",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "highestBidderAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "endTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "duration",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "bidCount",
						"type": "uint256"
					}
				],
				"internalType": "struct TreePoetsDonations.entries",
				"name": "entryData",
				"type": "tuple"
			}
		],
		"name": "addEntry",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "index",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "nonprofit",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "donationAmount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "poet",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "illustrator",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "notes",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "propertyRights",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "metadataURL",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "imageURL",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "walletAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isDeleted",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isMinted",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "tokenID",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "bonus",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "associatedWallet",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "collectionName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "counter",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isListed",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "highestBid",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "highestBidderAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "endTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "duration",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "bidCount",
						"type": "uint256"
					}
				],
				"internalType": "struct TreePoetsDonations.entries",
				"name": "entryData",
				"type": "tuple"
			}
		],
		"name": "addEntryAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "bid",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "donateAndMint",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "entryId",
				"type": "uint256"
			}
		],
		"name": "mintWinningNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_symbol",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "OperatorNotAllowed",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "entryId",
				"type": "uint256"
			}
		],
		"name": "deleteEntry",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "metadataURL",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "donorWallet",
				"type": "address"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_MAX_SUPPLY",
				"type": "uint256"
			}
		],
		"name": "setMAX_SUPPLY",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_metadataURI",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "setMetadataURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_royaltyAddress",
				"type": "address"
			}
		],
		"name": "setRoyaltyAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_receiver",
				"type": "address"
			},
			{
				"internalType": "uint96",
				"name": "_royaltyFeesInBips",
				"type": "uint96"
			}
		],
		"name": "setRoyaltyInfo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenContract",
				"type": "address"
			}
		],
		"name": "setTokenContractMinting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenDecimals",
				"type": "uint256"
			}
		],
		"name": "setTokenDecimals",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenContract",
				"type": "address"
			}
		],
		"name": "setTokenPOETTREEContractTransfering",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenWithdrawal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "entryId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_collection_name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_associatedWallet",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_donatedAmount",
				"type": "uint256"
			}
		],
		"name": "update_associatedWallet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "entryId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_metadataURI",
				"type": "string"
			}
		],
		"name": "update_metadata",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "entryId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_URL",
				"type": "string"
			}
		],
		"name": "update_metadataURL",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "entryId",
				"type": "uint256"
			}
		],
		"name": "updateAuctionList",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "bidCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_salePrice",
				"type": "uint256"
			}
		],
		"name": "calculateRoyalty",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "counter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllAuctionEntries",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "index",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "nonprofit",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "donationAmount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "poet",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "illustrator",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "notes",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "propertyRights",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "metadataURL",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "imageURL",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "walletAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isDeleted",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isMinted",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "tokenID",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "bonus",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "associatedWallet",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "collectionName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "counter",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isListed",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "highestBid",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "highestBidderAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "endTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "duration",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "bidCount",
						"type": "uint256"
					}
				],
				"internalType": "struct TreePoetsDonations.entries[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllEntries",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "index",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "nonprofit",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "donationAmount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "poet",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "illustrator",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "notes",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "propertyRights",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "metadataURL",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "imageURL",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "walletAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isDeleted",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isMinted",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "tokenID",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "bonus",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "associatedWallet",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "collectionName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "counter",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isListed",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "highestBid",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "highestBidderAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "endTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "duration",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "bidCount",
						"type": "uint256"
					}
				],
				"internalType": "struct TreePoetsDonations.entries[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "entryId",
				"type": "uint256"
			}
		],
		"name": "getAssociatedWallet",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "entryId",
				"type": "uint256"
			}
		],
		"name": "getCollectionName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "entryId",
				"type": "uint256"
			}
		],
		"name": "getDonationAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenID",
				"type": "uint256"
			}
		],
		"name": "getTokenStatus",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "HighestBidAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "HighestBidderAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "indexCounterMatcher",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "indexMinted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MAX_SUPPLY",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "metadataURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "OPERATOR_FILTER_REGISTRY",
		"outputs": [
			{
				"internalType": "contract IOperatorFilterRegistry",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_db_index",
				"type": "uint256"
			}
		],
		"name": "returnCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_salePrice",
				"type": "uint256"
			}
		],
		"name": "royaltyInfo",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "contract POETTREE",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenDecimals",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenPOETTREE",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let address = "0xD21a26054e5b7E81452d65D7827D6014580b3Ec3";

let NFTABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_initBaseURI",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "ApprovalCallerNotOwnerNorApproved",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ApprovalQueryForNonexistentToken",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ApprovalToCurrentOwner",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ApproveToCaller",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "BalanceQueryForZeroAddress",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "MintToZeroAddress",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "MintZeroQuantity",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "OwnerIndexOutOfBounds",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "OwnerQueryForNonexistentToken",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TokenIndexOutOfBounds",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TransferCallerNotOwnerNorApproved",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TransferFromIncorrectOwner",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TransferToNonERC721ReceiverImplementer",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TransferToZeroAddress",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "URIQueryForNonexistentToken",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "MAX_SUPPLY",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "cost",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_state",
				"type": "bool"
			}
		],
		"name": "pause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newBaseURI",
				"type": "string"
			}
		],
		"name": "setBaseURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_cost",
				"type": "uint256"
			}
		],
		"name": "setMintRate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
];

let NFTAddress = "0xD53EEAF08dAebA65e99e5E925D2381410FF11276"

let bonusABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_initBaseURI",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "ApprovalCallerNotOwnerNorApproved",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ApprovalQueryForNonexistentToken",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ApprovalToCurrentOwner",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ApproveToCaller",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "BalanceQueryForZeroAddress",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "MintToZeroAddress",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "MintZeroQuantity",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "OwnerIndexOutOfBounds",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "OwnerQueryForNonexistentToken",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TokenIndexOutOfBounds",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TransferCallerNotOwnerNorApproved",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TransferFromIncorrectOwner",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TransferToNonERC721ReceiverImplementer",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TransferToZeroAddress",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "URIQueryForNonexistentToken",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "MAX_SUPPLY",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "cost",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_state",
				"type": "bool"
			}
		],
		"name": "pause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newBaseURI",
				"type": "string"
			}
		],
		"name": "setBaseURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_cost",
				"type": "uint256"
			}
		],
		"name": "setMintRate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
];

let bonusAddress = "0xD53EEAF08dAebA65e99e5E925D2381410FF11276";

function Home() {

	const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

	const { open } = useWeb3Modal()
	const { chain } = useNetwork()
	const { switchNetwork } = useSwitchNetwork()
	const clientID = "2f8f716d-b303-481b-80ef-febaf341524b";
	const web3 = new Web3("https://go.getblock.io/2f7f084a1dcc473e8a410a11c627378e");

	const [_totalSupply, settotalSupply] = useState(0);
	const [statusError, setstatusError] = useState("");
	const [statusLoading, setstatusLoading] = useState(false);
	const [_owner, set_owner] = useState("");
	const [_myTokens, setmyNFTWallet] = useState(0);
	const [_public_mint_status, set_public_mint_status] = useState("");
	const [_navbarOpen, set_navbarOpen] = useState(0);
	const [_connected, setConnected] = useState(false);
	const [_registerDiv, set_registerDiv] = useState(0);
	const [_dashboardDiv, set_dashboardDiv] = useState(0);
	const [_notificationDiv, set_notificationDiv] = useState(0);
	const [_name, set_name] = useState("");
	const { disconnect } = useDisconnect();
	const [_success1, setSuccessMsg1] = useState("");
	const [_loading1, setLoadingMsg1] = useState("");
	const [_ErrorMsg1, setErrorMsg1] = useState("");
	const [success, setsuccess] = useState("");
	const [nfts, setNfts] = useState([]);
	const [selectedContractIndex, setSelectedContractIndex] = useState(0);
	const [userInfo, setUserInfo] = useState(null);
	const [userNFTs, setUserNFTs] = useState([]);
	const [nft1Collection, setUserInfoForNFT1] = useState([]);
	const [nft2Collection, setUserInfoForNFT2] = useState([]);
	const [nft3Collection, setUserInfoForNFT3] = useState([]);
	const [_viewUser, set_getUser] = useState("");
	const [_users, set_users] = useState("");
	const [_getIdByAddress, set_getIdByAddress] = useState(0);

	const [_totalUsers, set_totalUsers] = useState("");
	const [_totalCommissions, setTotalCommissions] = useState(0);
	const [_totalCommissions2, setTotalCommissions2] = useState(0);
	const [_totalCommissions3, setTotalCommissions3] = useState(0);

	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(0);
	const [_auctionOpen, set_auctionOpen] = useState(0);
	const [error, setError] = useState(null);
	const [_Donation, set_Donation] = useState('');
	const [_Nonprofit, set_Nonprofit] = useState('');
	const [_Notes, set_Notes] = useState('');
	const [_Illustrator, set_Illustrator] = useState('');
	const [_Poet, set_Poet] = useState('');
	const [_Radio1, set_Radio1] = useState('None');
	const [_Radio2, set_Radio2] = useState('');
	const [_Radio3, set_Radio3] = useState('');
	const [_Radio4, set_Radio4] = useState('');
	const [_Radio5, set_Radio5] = useState('');

	const [selectedFile, setSelectedFile] = useState(null);

	const [_getRefferalCount, set_getRefferalCount] = useState(0);
	const [_walletOpenWindow, set_walletOpenWindow] = useState(0);
	const [_notification, set_notification] = useState(0);

	const [_isUserRegsitered, setisUserRegsitered] = useState(false);
	const slideContainer = document.getElementById("slideContainer");

	const [responseMessage, setResponseMessage] = useState('');
	const [file, setFile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [_balanceOfContractBonus, setBalanceOfContractBonus] = useState(0);
	const [hasConnected, setHasConnected] = useState(false); // New state variable

	const [nftAmount, setNftAmount] = useState(null);
	const [walletAddress2, setWalletAddress] = useState(null);
	const [errorImg, setErrorImg] = useState("");
	const [preview, setPreview] = useState(null);

	const { address: walletAddress } = useAccount({
		async onConnect() {
			await handleConnect(); // Call handleConnect when connected
		}
	});

	const publicClient = createPublicClient({
		chain: mainnet,
		transport: http()
	})

	async function auctionOpen() {
		set_auctionOpen(1);
	}

	async function navbarOpen() {
		set_navbarOpen(1);
	}

	var contract = {
		address: address,
		abi: ABI
	}

	var NFTContract = {
		address: NFTAddress,
		abi: NFTABI
	}

	var bonusContract = {
		address: bonusAddress,
		abi: bonusABI
	}

	async function handleConnect() {

		setConnected(true);
		await new Promise(resolve => setTimeout(resolve, 2000));

		if (localStorage.getItem('opBtnClicked') !== 'opBtn' && localStorage.getItem('opConnected') !== 'op') {
			if (chain.id !== 1) {
				switchNetwork(1);
			}

			console.log("I'm in if");
		} else {
			console.log("I'm in else");
		}

		var data = await getBalance();
		setmyNFTWallet(Number(data.data));
		console.log("myNFTWallet :" + data.data);

		if (localStorage.getItem('opConnected') !== 'op') {
			localStorage.setItem('nftAmount', Number(data.data));
			localStorage.setItem('getWalletAddress', walletAddress);
		}

	}


	useEffect(() => {


		const storedNftAmount = localStorage.getItem('nftAmount');
		const storedWalletAddress = localStorage.getItem('getWalletAddress');
		setNftAmount(storedNftAmount);
		setWalletAddress(storedWalletAddress);

		$(document).ready(() => {
			$('#photo').change(function () {
				const file = this.files[0];
				console.log(file);
				//setSelectedFile(file);
				if (file) {
					let reader = new FileReader();
					reader.onload = function (event) {
						console.log(event.target.result);
						$('#imgPreview').attr('src', event.target.result);
					}
					reader.readAsDataURL(file);
				}
			});
		});

		console.log("Selected //// File :" + selectedFile);

		async function fetchOwner() {

			var data4 = await getOwner();
			set_owner(data4.data);
			console.log("OWNER" + data4.data);

		}

		async function fetchBalanceOfContractBonus() {
			var data = await getBalanceOfContractBonus();

			setBalanceOfContractBonus(Number(data.data));
			console.log("BalanceOfWallet : " + data.data);

		}

		if (_connected) {
			fetchOwner();
			fetchBalanceOfContractBonus();
		}else{
			console.log("NOT CONNECTED");
		}

	}, [_connected, walletAddress, selectedFile]);

	const { refetch: getBalanceOfContractBonus } = useContractRead({
		...bonusContract,
		functionName: 'balanceOf',
		args: [walletAddress]
	})

	const { writeAsync } = useContractWrite({
		onError(error) {
			if (error.message.includes("balance")) {
				setstatusError(true);
				setstatusLoading(false);
			}
		},
	});

	function shortenAddress(walletAddress) {
		try {
			return _connected
				? walletAddress.slice(0, 3) + "..." + walletAddress.slice(-4)
				: "Connect";
		} catch (error) {
			console.log(error);
		}
	}


	const shortenAddressNew = (address) => {
		if (!address) return '';
		return `${address.slice(0, 3)}...${address.slice(-4)}`;
	};


	function shortenAddress2(walletAddress) {
		try {
			return _connected
				? walletAddress.slice(0, 10) + "..." + walletAddress.slice(-9)
				: "Connect";
		} catch (error) {
			console.log(error);
		}
	}

	async function disconnectWallet() {
		setConnected(false);
		disconnect();
	}

	const mintNFT = async (event) => {
		event.preventDefault(); // Prevent default form submission behavior
		setResponseMessage(''); // Clear any previous response message
		setIsLoading(true); // Set loading to true

		try {
			if (file) {
				const fileName = file.name;

				// Convert the file to base64 encoding
				const fileReader = new FileReader();
				fileReader.onload = async () => {
					const base64String = fileReader.result.split(',')[1];
					console.log("getWallet : " + localStorage.getItem('getWalletAddress'));
					console.log("getWallet__connected : " + _connected);

					try {
						const payload = {
							radio1: _Radio1,
							notes: _Notes,
							illustrator: _Illustrator,
							poet: _Poet,
							donation: _Donation,
							nonprofit: _Nonprofit,
							bonus: Number(_myTokens),
							file: base64String,
							fileName: fileName,
						};

						if (localStorage.getItem('getWalletAddress') != null) {
							payload.wallet = localStorage.getItem('getWalletAddress');
						}

						const response = await axios.post('https://treepoets.com:3001/api/_mintnft', payload);
						console.log('File sent successfully.');
						console.log(response.data);
						setResponseMessage(response.data || 'Success');
					} catch (error) {
						console.log('Error sending file.', error);
						setResponseMessage('Error sending file.');
					} finally {
						setIsLoading(false); // Set loading to false
					}
				};

				fileReader.onerror = () => {
					console.log('Error reading file.');
					setResponseMessage('Error reading file.');
					setIsLoading(false); // Set loading to false
				};

				fileReader.readAsDataURL(file);
			} else {
				setResponseMessage('Please select a file.');
				setIsLoading(false); // Set loading to false
			}
		} catch (err) {
			console.log(err);
			setResponseMessage('Error occurred.');
			setIsLoading(false); // Set loading to false
		}
	};

	useEffect(() => {
		if (!file) {
			setPreview(null);
			return;
		}

		const objectUrl = URL.createObjectURL(file);
		setPreview(objectUrl);

		// Cleanup to avoid memory leaks
		return () => URL.revokeObjectURL(objectUrl);
	}, [file]);
	
	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
		const maxSize = 5 * 1024 * 1024; // 5MB
	
		if (selectedFile) {
			if (!allowedTypes.includes(selectedFile.type)) {
				setErrorImg("❌ Invalid file type. Please upload a PNG, JPG, or JPEG image.");
				setFile(null);
				return;
 			} 
			if (selectedFile.size > maxSize) {
				setErrorImg("❌ File size too large. Please upload an image smaller than 5MB.");
				setFile(null);
				return;
			}
	 
			setErrorImg("");
	
			// Convert image to square
			const reader = new FileReader();
			reader.readAsDataURL(selectedFile);
			reader.onload = (e) => {
				const img = new Image();
				img.src = e.target.result;
				img.onload = () => {
					const size = Math.min(img.width, img.height); // Get the smallest dimension for square crop
	
					const canvas = document.createElement("canvas");
					const ctx = canvas.getContext("2d");
	
					canvas.width = size;
					canvas.height = size;
	
					ctx.drawImage(
						img,
						(img.width - size) / 2, // Crop x-axis center
						(img.height - size) / 2, // Crop y-axis center
						size,
						size,
						0,
						0,
						size,
						size
					);
	
					// Convert canvas to Blob and create a new file
					canvas.toBlob((blob) => {
						const file = new File([blob], selectedFile.name, { type: selectedFile.type });
						setFile(file);
						console.log("✅ File converted to square:", file);
					}, selectedFile.type);
				};
			};
		}
	};
	

	const { refetch: getOwner } = useContractRead({
		...contract,
		functionName: 'owner', args: []
	})

	const { refetch: getBalance } = useContractRead({
		...NFTContract,
		functionName: 'balanceOf',
		args: [walletAddress ? walletAddress : '0x']
	})

	async function closedivN() {
		window.location.reload(true);
	}

	async function walletOpen() {
		set_walletOpenWindow(1);

		if (localStorage.getItem('opBtnClicked') !== 'opBtn' && localStorage.getItem('opConnected') !== 'op') {
			console.log("walletOpen if");

		} else {
			console.log("First disconnect from auction");
			set_notification(1);
			set_walletOpenWindow(0);
		}

	}


	async function walletClose() {

		localStorage.removeItem('nftAmount');
		localStorage.removeItem('getWalletAddress');

		// Optionally clear all localStorage items
		// localStorage.clear();

		// Clear state
		setWalletAddress(null);
		setNftAmount(null);
	}


	async function walletConnect() {
		open();
		window.location.reload(true);
	}

	async function closediv() {
		set_walletOpenWindow(0);
		disconnectWallet();
	}

	async function closeNoti_1() {
		set_notification(0);
	}

	async function closeNoti_2() {
		set_notification(0);
		disconnectWallet();

		localStorage.removeItem('opConnected');
		localStorage.removeItem('opBtnClicked');

		window.location.reload(true);

	}

	return (
		<div class="allWrap">
			<div class="light">
				<div class="headerPicAndTitle">
					<div class="nb">Tree Poet Publishing</div>
				</div>

				<form class="form" onSubmit={mintNFT} method="post" encType="multipart/form-data">
					<div class="step2Con">
						<div class="step2">SUBMISSION FORM</div>
						<div class="picAndConMain">
							<div class="imageBar2">
								{/*<img id="imgPreview" src={pic} alt="Preview Here" />*/}
								{preview ? (
									<img id="imgPreview" src={pic} alt="Preview" />
								) : (
									<img id="imgPreview" src={pic} alt="Preview Here" />
								)}

								{loading == 1 ? (
									<div class="upload">
										<div id="block_container">
											<div class="fileBtn">
												<input class="choosebtn" type="file" onChange={handleFileChange} name="file" accept="image/png, image/jpeg, image/jpg"
													id="photo" required />
											</div>

										</div>
									</div>
								) : (
									<div >
										<div id="block_container">
											<div class="fileBtn">
												<input class="choosebtn" type="file" onChange={handleFileChange} name="file" accept="image/png, image/jpeg, image/jpg"
													id="photo" required />
											</div>

										</div>

									</div>

								)}
								{errorImg && <p style={{ color: "red", fontSize: "14px" }}>{errorImg}</p>}
							</div>

							<div>
								<div>
									<div class="contentBar">

										<div class="textFieldHome">
											<div><input name="_Nonprofit" value={_Nonprofit}
												onChange={event => set_Nonprofit(event.target.value)} type="text" class="comment" placeholder="Organization to receive donation" /></div>
											Nonprofit
										</div>

										<div class="textFieldHome">
											<div><input name="_Donation" value={_Donation}
												onChange={event => set_Donation(event.target.value)} type="number" class="comment" placeholder="Starting Bid" /></div>
											Donation Amount US$
										</div>
									</div>
								</div>

								<div>
									<div class="contentBar">

										<div class="textFieldHome">
											<div><input name="_Poet" value={_Poet}
												onChange={event => set_Poet(event.target.value)} type="text" class="comment" placeholder="Poetic Creator" /></div>
											Poet
										</div>

										<div class="textFieldHome">
											<div><input name="_Illustrator" value={_Illustrator}
												onChange={event => set_Illustrator(event.target.value)} type="text" class="comment" placeholder="Illustrative Creator" /></div>
											Illustrator
										</div>
									</div>
								</div>

								<div>
									<div class="textFieldHome">
										<div><textarea name="_Notes" value={_Notes}
											onChange={event => set_Notes(event.target.value)} type="text" required class="comment2" placeholder="Description about creation or whatever’s clever" /></div>
										Notes
									</div>
								</div>
							</div>

						</div>

						<div class="descriptionMain">

							<div class="agreeBtn">
								<input name="_Radio1" value={_Radio1}
									checked={_Radio1 === "None"}
									onChange={event => set_Radio1("None")} class="tic" type="radio" required id="agreeBtn" />
								<div class="agree">No Intellectual Property rights are transferred</div>
							</div>

							<div class="agreeBtn2">
								<div class="agreeBtn4">
									<div class="agree">I transfer my intellectual property rights and certify I am the original creator of </div>
								</div>

								<div class="agreeBtn3">
									<div class="agreeBtn">
										<input name="_Radio1" value={_Radio1}
											checked={_Radio1 === "Poetry"}
											onChange={event => set_Radio1("Poetry")} class="tic" required type="radio" id="agreeBtn" />
										<div class="agree">Poetry</div>
									</div>
									<div class="agreeBtn">
										<input name="_Radio1" value={_Radio1}
											checked={_Radio1 === "Illustration"}
											onChange={event => set_Radio1("Illustration")} class="tic" required type="radio" id="agreeBtn" />
										<div class="agree">Illustration</div>
									</div>
									<div class="agreeBtn">
										<input name="_Radio1" value={_Radio1}
											checked={_Radio1 === "Art (Both)"}
											onChange={event => set_Radio1("Art (Both)")} class="tic" required type="radio" id="agreeBtn" />
										<div class="agree">Art (Both)</div>
									</div>
								</div>

							</div>
						</div>
					</div>

					<div className='disclaimer'>
						⚠️ NFT will be minted and sent to the donor once the donation to the Nonprofit is verified but if found to be in violation of copyright or Terms then the submission will be canceled.
					</div>

					<div class="rewardsSection">
						<div class="step2">REWARDS</div>
						<div className='rewardsNote'>It is not required but if you would like to receive rewards then connect your
							{walletAddress2 ?
								<span className='wltBTN' onClick={walletClose}>{shortenAddressNew(walletAddress2)}</span> :
								<span className='wltBTN' onClick={walletOpen}>Wallet</span>}

						</div>
						<div className='rewardsNote2'>
							Your <span className='tpLink' onClick={tpLink}>TreePoets</span> Bonus is {nftAmount && !isNaN(nftAmount) ? nftAmount : "0"} X
						</div>
					</div>

					{_walletOpenWindow > 0 ?
						<div class="popup-containerMain_1">
							<div class="popup-container_1">
								<div class="rewardsSection2">

									<div className='rewardsNote'>Connect your NFT wallet
										{_connected ? (
											<span className='wltBTN' onClick={closediv}>
												{walletAddress === "" ? "Connect Wallet" : shortenAddress(walletAddress)}
											</span>
										) : (
											<span className='wltBTN' onClick={() => { open(); }}>Connect</span>
										)}
									</div>
									<p></p>
									<div className='rewardsNote2'>
										Your TreePoets NFT balance - {_connected && !isNaN(_myTokens) ? <>{_myTokens}</> : "0"}
									</div>

									<div className="arrowC" onClick={closediv}><img src={arrow} /></div>

								</div>
							</div>
						</div>
						: null}


					{_notification > 0 ?
						<div class="popup-containerMain">
							<div class="popup-container">
								<div class="popup errorDiv">
									<div className="close" onClick={closeNoti_1}>✖</div>
									<img className='gif2' src={warning} />
									<p className='responseSuccess'>Please disconnect the wallet from auction and try again!</p>
									<div className='review2'><span className='dis' onClick={closeNoti_2}>Disconnect</span></div>
								</div>
							</div>
						</div> : null}

					<div class="step4Con">
						<div>
							<p className='termsDiv'>
								<label>
									<input type="checkbox" name="terms" required value="agree" />
									<span className='terms'>I submit this art to be a free gift as specified above and agree to the Tree Poetry <span className='termsHL' onClick={terms}>Terms.</span></span>
								</label>
							</p>
							<button class="approve" type="submit">SUBMIT</button>
						</div>
					</div>

					{!_auctionOpen > 0 ?
						<div class="step4Con">
							<div>
								<div class="step2">AUCTIONS</div>
								<div class="approve" onClick={auctionOpen}>ENTER</div>
							</div>

						</div> : null}

				</form>

				{_auctionOpen > 0 ?
					<Auctions /> :
					null}

				<p></p>
				<p></p>


				{isLoading &&
					<div class="popup-containerMain">
						<div class="popup-container">
							<div class="popup loading">
								<div class="loader"></div>
								<p>Loading...</p>
							</div>
						</div>
					</div>
				}


				{responseMessage == '' ?
					<div></div> :
					<div>
						{responseMessage.includes("Error") ?

							<div class="popup-containerMain">
								<div class="popup-container">
									<div class="popup errorDiv">
										<div className="close" onClick={closedivN}>✖</div>
										<img className='gif2' src={warning} />
										<p className='responseSuccess'>{responseMessage}</p>
										<div className='review2'>An error occurred while processing your request. Please try again.</div>
									</div>
								</div>
							</div> :
							<div class="popup-containerMain">
								<div class="popup-container">
									<div class="popup success">
										<div className="close" onClick={closedivN}>✖</div>
										<p className='responseSuccess'>Thank You!</p>
										<div className='review'>for creating a donation gift The NFT will be minted and sent to the donor once their donation is verified.</div>
									</div>
								</div>
							</div>
						}
					</div>
				}

			</div>

		</div>
	)

}
export default Home;