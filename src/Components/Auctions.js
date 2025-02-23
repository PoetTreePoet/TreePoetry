/* eslint-disable no-undef */
import '../App.css'
import React, { useEffect, useMemo, useState } from 'react';
import { Web3Button, Web3Modal, useWeb3Modal } from '@web3modal/react';
import { mainnet, useDisconnect, useAccount, useContractRead, useContractReads, useContractWrite, useNetwork, usePublicClient, useSwitchNetwork } from 'wagmi';
import { createPublicClient, formatEther, http, parseEther, webSocket } from 'viem';
import { optimism } from 'wagmi/chains'
import { Web3 } from "web3";
import axios from 'axios';
import { parseUnits } from 'ethers';
import warning from '../assets/warning.png';
import checked from '../assets/checked.png';

const renderer = ({ days, hours, minutes, seconds, completed }) => {

	if (days == 0 && hours == 0 && minutes == 0 && seconds == 0) {

		window.location.reload(true);
		console.log("Mint Begins");
	}


	return <div class="counterBlock"><div class="days">{days}</div><div class="dots">:</div><div class="days">{hours}</div><div class="dots">:</div><div class="days">{minutes}</div><div class="dots">:</div><div class="sec">{seconds}</div></div>;
	/*	}*/
};

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


let tokenABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
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
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
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
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burnFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
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
		"name": "mint",
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
		"name": "ownerMint",
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
		"name": "pause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Paused",
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
				"name": "_donationContract",
				"type": "address"
			}
		],
		"name": "setDonationContract",
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
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
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
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
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
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
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
		"name": "unpause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Unpaused",
		"type": "event"
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
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
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
				"name": "account",
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
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "donationContract",
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

let tokenAddress = "0x0e77a250b298e6422Fe0d5f1a211BeD94566Baf3";

function Auctions() {

	const { open } = useWeb3Modal()
	const { chain } = useNetwork()
	const { switchNetwork } = useSwitchNetwork()
	const clientID = "2f8f716d-b303-481b-80ef-febaf341524b";
	const web3 = new Web3("https://go.getblock.io/3a42b9c03a1747baa5ea4471062e352f");

	const [_totalSupply, settotalSupply] = useState(0);
	const [_deleteEntry, setDeleteEntry] = useState("");
	const [statusError, setstatusError] = useState("");
	const [statusLoading, setstatusLoading] = useState(false);
	const [statusLoadingDE, setstatusLoadingDE] = useState(false);

	const [statusError2, setstatusError2] = useState("");
	const [statusLoading2, setstatusLoading2] = useState(false);

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
	const [success2, setsuccess2] = useState("");
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
	const [_OpenEdits, setOpenEdits] = useState(0);

	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(0);
	const [error, setError] = useState(null);
	const [_Donation, set_Donation] = useState('');
	const [_Nonprofit, set_Nonprofit] = useState('');
	const [_Notes, set_Notes] = useState('');
	const [_Illustrator, set_Illustrator] = useState('');
	const [_Poet, set_Poet] = useState('');
	const [_Radio1, set_Radio1] = useState('');
	const [_Radio2, set_Radio2] = useState('');
	const [_Radio3, set_Radio3] = useState('');
	const [_Radio4, set_Radio4] = useState('');
	const [_Radio5, set_Radio5] = useState('');
	const [_allEntries, setAllEntries] = useState([]);
	const [_getAllEntries, set_getAllEntries] = useState([]);

	const [selectedFile, setSelectedFile] = useState(null);

	const [_getRefferalCount, set_getRefferalCount] = useState(0);

	const [_isUserRegsitered, setisUserRegsitered] = useState(false);
	const [isMinted, setIsMinted] = useState(false);
	const [isMinted2, setIsMinted2] = useState(false);
	const [_associatedWallet, set_associateWallet] = useState('');
	const [_collectionName, set_collectionName] = useState('');
	const [_amountDonate, set_amountDonated] = useState('');
	const [_SelectedIndexForUpdate, setSelectedIndexForUpdate] = useState('');
	const [_endTime, set_endTime] = useState('');
	const [_SelectedURLForUpdate, setSelectedURLForUpdate] = useState('');
	const [_addAuction, set_addAuction] = useState('');
	const [_getAllAuctionEntries, set_getAllAuctionEntries] = useState([]);
	const [_increaseAllowanceAmount, setIncreaseAllowanceAmount] = useState(0);
	const [_currentAllowance, setCurrentAllowance] = useState(0);
	const [_allowanceStatus, setAllowanceStatus] = useState(false);
	const [_highestBid, setHighestBid] = useState(0);
	const [_auctionIndex, setAuctionIndex] = useState(0);
	const [_amount, set_amount] = useState(0);
	const [statusHighestBid, set_statusHighestBid] = useState(false);
	const websocketUrl = process.env.REACT_APP_WEBSOCKET_URL;
	const httpsUrl = process.env.REACT_APP_HTTPS_URL;

	const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
	const [txnHash, setTxnHash] = useState('');
	const [_noData, setNoData] = useState(false);
	const [_dataLength, setDataLength] = useState(0);
	const [activePage, setActivePage] = useState(1);
	const [_loaded, setLoaded] = useState(0);
	const [_pageNo, setPageNo] = useState(1);
	const [_o, setO] = useState(0);
	const [_hitFilter, set_hitFilter] = useState(false);
	const [_active_auction, set_active_auction] = useState(false);
	const [_loader, set_loader] = useState(0);
	const [selectedImage, setSelectedImage] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(null);
	const [statusLoadingMint, setstatusLoadingMint] = useState(false);
	const [statusErrorMint, setstatusErrorMint] = useState("");
	const [isMinted3, setisMinted3] = useState(false);

	const [_meta, setMetadata] = useState('');
	const [_index, setIndex] = useState('');
	const [_collection, set_collection] = useState('');
	const [_illustrator, set_illustrator] = useState('');
	const [_imageUrl, set_imageUrl] = useState('');
	const [_nonprofit, set_nonprofit] = useState('');
	const [_poet, set_poet] = useState('');
	const [_radio1, set_radio1] = useState('');
	const [_donation, set_donation] = useState('');
	const [_notes, set_notes] = useState('');
	const [_walletAddress, set_walletAddress] = useState('');
	const [_bonus, set_bonus] = useState('');
	const [_timestamp, set_timestamp] = useState('');
	const [_associatedWalletAddress, set_associatedWalletAddress] = useState('');
	const [_associatedWalletUpdate, setAssociatedWalletUpdate] = useState('0x0000000000000000000000000000000000000000');
	const [responseMessage, setResponseMessage] = useState('');
	const [isDelete, setisDelete] = useState(false);
	const [_bidCount, setBidCount] = useState(0);
	const [_balanceOf, setBalanceOf] = useState(0);
	const [fetching, setFetching] = useState([]);
	const [_balanceOfContract, setBalanceOfContract] = useState(0);
	const [_insufficientFunds, setInsufficientFunds] = useState(false);

	const [selectedImageTable, setSelectedImageTable] = useState(null);

	const handleImageClick = (imageURL) => {
		setSelectedImage(imageURL);
	};

	const closeModal = () => {
		setSelectedImage(null);
	};

	async function handleImageSelect(allAuctionEntries, localIndex) {
		if (localIndex === selectedIndex) {
			// If the same image is clicked again, deselect it
			setSelectedImage(null);
			setSelectedIndex(null);
			console.log("handleImageSelect Index : " + allAuctionEntries.index);
			console.log("handleImageSelect localIndex : " + localIndex);
		} else {
			// Otherwise, select the new image
			setSelectedImage(allAuctionEntries);
			setSelectedIndex(localIndex);

			console.log('handleImageSelect section');
			console.log('Index----' + allAuctionEntries.index);

			let _params = allAuctionEntries.index;

			try {
				console.log("_params :" + _params);
				// Send the GET request with the index as a query parameter
				const response = await axios.get(`https://treepoets.com:3001/api/getDetailsByIndex?index=${_params}`, {
					//params:  {_params} 
				});

				console.log('Fetched data2:', response.data); // Log the fetched data
				// You can now use response.data as needed



				setMetadata(response.data.MetadataUrl);
				console.log("response.data.MetadataUrl : " + response.data.MetadataUrl);
				setIndex(response.data.Index);
				set_collection(response.data.CollectionName);
				console.log("response.data.CollectionName : " + response.data.CollectionName);

				set_illustrator(response.data.Illustrator);
				set_imageUrl(response.data.Image);
				set_nonprofit(response.data.Nonprofit);
				set_poet(response.data.Poet);
				set_radio1(response.data.Radio1);
				set_donation(response.data.Donation);
				set_walletAddress(response.data.Wallet);
				set_bonus(response.data.Bonus);
				set_associatedWalletAddress(response.data.DonorWallet);
				set_notes(response.data.Notes);
				set_timestamp(response.data.EpochTime);



			} catch (error) {
				console.error('Error fetching details:', error);
			}
		}
	}

	const { address: walletAddress } = useAccount({
		async onConnect() {
			handleConnect()
		}
	})

	const transport = http(httpsUrl);

	const publicClient = createPublicClient({
		chain: optimism,
		transport
	})

	var contract = {
		address: address,
		abi: ABI
	}

	var contractToken = {
		address: tokenAddress,
		abi: tokenABI
	}

	async function handleConnect() {
		if (chain.id !== 10) {
			switchNetwork(10);
		}

		setConnected(true);
		localStorage.setItem('opConnected', 'op');

	}


	useEffect(() => {

		async function fetchData4() {
			try {
				const data = await getAllowance();
				setCurrentAllowance(Number(data.data));
				console.log("Allowance : " + Number(data.data));

				const amountInWei = parseUnits(_amount.toString(), 'ether');
				console.log("amountInWei" + amountInWei);

				console.log("_amount : " + amountInWei)

				console.log("amount-allowance:" + Number(Number(amountInWei) - Number(data.data)))

				if (Number(Number(amountInWei) - Number(data.data)) <= 0) {
					setAllowanceStatus(true);
					console.log("allowanceStatus : " + "true");
				} else {
					setAllowanceStatus(false);
					console.log("allowanceStatus : " + "false");
					console.log("allowanceStatus : " + _allowanceStatus);
				}

				if (Number(_highestBid) >= Number(_amount)) {
					set_statusHighestBid(true);
					console.log("VALUE_highestBid_true : " + _highestBid);
					console.log("VALUE_amountInWei_true : " + _amount);
					console.log("statusHighestBid : true");
				} else {
					set_statusHighestBid(false);
					console.log("VALUE_highestBid_false : " + _highestBid);
					console.log("VALUE_amountInWei_false : " + _amount);
					console.log("statusHighestBid : false");
				}

			} catch (err) {
				console.log(err);
			}
		}

		async function fetchData() {
			var data = await getTotalSupply();

			settotalSupply(Number(data.data))
			console.log("totalSupplyFromUseffect : " + data.data)

		}

		async function fetchBalanceOf() {
			var data = await getBalanceOf();

			setBalanceOf(Number(data.data));
			console.log("BalanceOfWallet : " + data.data);

		}

		async function fetchBalanceOfContract() {
			var data = await getBalanceOfContract();

			setBalanceOfContract(Number(data.data));
			console.log("BalanceOfWallet : " + data.data);

		}

		if (_connected) {
			allEntries(_pageNo);
			fetchData4();
			fetchData();
		}

		fetchBalanceOf();
		fetchBalanceOfContract();

	}, [_connected, walletAddress, selectedFile, _amount, _highestBid, _allowanceStatus]);


	const { writeAsync } = useContractWrite({
		...contract,
		onError(error) {
			if (error.message.includes('balance')) {
				setstatusError(true)
				setstatusLoading(false)
			}
		}
	})

	function shortenAddress(walletAddress) {
		try {
			return _connected
				? walletAddress.slice(0, 3) + "..." + walletAddress.slice(-4)
				: "Connect";
		} catch (error) {
			console.log(error);
		}
	}

	async function addEntry(index, _Nonprofit, _Donation, _Poet, _Illustrator, _Notes, _Radio1,
		meta, imageURL, walletAddress, timestamp, bonus, _associatedWallet,
		_collectionName) {

		const epochTimestamp = Math.floor(new Date(timestamp).getTime() / 1000);

		setMetadata(meta);
		setIndex(index);
		setAssociatedWalletUpdate(_associatedWallet);

		console.log("index : " + index);
		console.log("_Nonprofit : " + _Nonprofit);
		console.log("_Donation : " + _Donation);
		console.log("_Poet : " + _Poet);
		console.log("_Illustrator : " + _Illustrator);
		console.log("_Notes : " + _Notes);
		console.log("_Radio1 : " + _Radio1);
		console.log("imageURL : " + imageURL);
		console.log("walletAddress : " + walletAddress);
		console.log("timestamp : " + timestamp);
		console.log("_associatedWallet : " + _associatedWallet);
		console.log("_collectionName : " + _collectionName);
		console.log("epochTimestamp : " + epochTimestamp);
		console.log("timestamp : " + timestamp);
		console.log("bonus : " + bonus);

		let entryData = [index, _Nonprofit, _Donation * 1e18, _Poet, _Illustrator, _Notes, _Radio1,
			meta, imageURL, walletAddress, epochTimestamp, false, false, 0, bonus, _associatedWallet,
			_collectionName, 0, false, 0, "0x0000000000000000000000000000000000000000", 0, 0, 0, 0
		]

		setstatusLoadingDE(true);
		setstatusError(false);

		try {

			var res = await writeAsync({
				functionName: 'addEntry',
				args: [entryData]
			})

			var result = await publicClient.waitForTransactionReceipt(res);
			if (result.status === 'success') {
				setstatusError(false);
				setIsMinted(true);
				setstatusLoadingDE(false);

			} else {
				setIsMinted(false);
				setstatusError(true);
				setstatusLoadingDE(false);
			}

		} catch (e) {
			console.error("Transaction failed:", e);
			if (e.message.includes("Transaction with hash")) {

				setIsMinted(true);

				console.log("adkiuyhsalofdjalkhfjdalskhf");
				console.log('ADD ENTRY 1');
			}
			else if (e.message.includes("err: insufficient funds for gas")) {
				//setshowErrorDiv(false);
				console.log("insufficient funds for gas");
				setstatusError(false);
				setstatusLoadingDE(false);
				setInsufficientFunds(true);
				console.log('ADD ENTRY 2');

			} else if (e.message.includes("User rejected the request")) {
				setstatusError(false);
				setstatusLoadingDE(false);
				//setshowErrorDiv(false);
				console.log('ADD ENTRY 3');
			} else {
				console.log(e);
				setstatusError(false);
				setstatusLoadingDE(false);
				console.log('ADD ENTRY 4');
			}
		}
	}

	async function allEntries(pageNo) {
		try {

			set_loader(1);
			setActivePage(pageNo);

			// Fetch data from getAllEntries
			console.log("I'm in all entries");

			const data4 = await axios.get('https://treepoets.com:3001/api/getAllBidDetails');

			console.log("Fetched auction data:", data4.data);

			await new Promise((resolve) => setTimeout(resolve, 2000));

			// Filter out entries where _isDeleted is true
			const filteredData = data4.data.filter(entries => !entries._isDeleted).filter(entries => !entries._isMinted);

			console.log("Filtered data:", filteredData);

			const result2 = await Promise.all(filteredData.map(async (entries) => {
				setDataLength(filteredData.length);
				console.log("datalength : " + filteredData.length);
				//const result2 = await Promise.all(data4.data.map(async (entries) => {

				//setDataLength(data4.data.length);
				console.log("datalength : " + data4.data.length);
				console.log("_entries.bids : " + entries.bids);
				console.log("_entries.collection : " + entries.collection);
				console.log("_entries.highestBidAmount : " + entries.highestBidAmount);
				console.log("_entries.illustrator : " + entries.illustrator);
				console.log("_entries.imageUrl : " + entries.imageUrl);
				console.log("_entries.nonprofit : " + entries.nonprofit);
				console.log("_entries.poet : " + entries.poet);
				console.log("_entries.highestBid : " + entries.highestBid);
				console.log("_entries._isMinted : " + entries._isMinted);
				console.log("_entries._isMinted : " + entries._isDeleted);

				let item = {
					index: Number(entries.index),
					bidCount: entries.bids,
					collectionName: entries.collection,
					highestBidAmount: entries.highestBidAmount,
					illustrator: entries.illustrator,
					imageURL: entries.imageUrl,
					nonprofit: entries.nonprofit,
					poet: entries.poet,
					highestBid: entries.highestBid,
					radio1: entries.radio1,
					_isMinted: entries._isMinted,
					_isDeleted: entries._isDeleted

				};

				setBidCount(entries.bids);

				console.log("_item.index :" + item.index);
				console.log("_item.bidCount :" + item.bidCount);
				console.log("_item.collectionName :" + item.collectionName);
				console.log("_item.highestBidAmount :" + item.highestBidAmount);
				console.log("_item.illustrator :" + item.illustrator);
				console.log("_item.imageURL :" + item.imageURL);
				console.log("_item.nonprofit :" + item.nonprofit);
				console.log("_item.poet :" + item.poet);
				console.log("_item.highestBid :" + item.highestBid);

				return item;
			}));
			set_active_auction(true);

			// Log the processed result2
			console.log("Processed entries:", result2);

			/////////////////////////////////////////////////////////////////////////////////////
			setDataLength(result2.length);
			console.log("result2.length : " + result2.length);
			set_loader(0);

			let itemDataArray = [];
			let y = 10;
			let o = ((pageNo - 1) * y);

			console.log("Before for loop : " + result2);

			for (let x = o; x < result2.length && x < pageNo * 10; x++) {

				itemDataArray.push(
					result2[x]
				)
				console.log("result2 :" + result2[x]);

			}

			console.log("itemDataArray : " + itemDataArray);
			//setFetching(itemDataArray);
			/////////////////////////////////////////////////////////////////////////////////////


			// Set the state with the processed entries
			setAllEntries(itemDataArray.reverse());

		} catch (err) {
			console.log(err);
		}
	}
	
	async function deleteEntry(index) {
		try {

			setstatusError(false); // Clear previous response message
			setstatusLoading2(true);

			const res = await writeAsync({
				...contract,
				functionName: 'deleteEntry',
				args: [index],
				gasLimit: '685000', // Adjust gas limit as needed
			});

			var result = await publicClient.waitForTransactionReceipt(res);
			if (result.status === 'success') {
				setstatusError(false);
				setisDelete(true);
				setstatusLoading2(false);

				const response = await axios.patch(`https://treepoets.com:3001/api/updateEntry2`, {
					index: index,
					_isDeleted: true
				});

				if (response.status === 200) {
					console.log('Entry marked as deleted successfully');
					await allEntries(_pageNo);
				} else {
					console.log("Not 200" + response.status);
				}

			} else {
				setisDelete(false);
				setstatusError(true);
				setstatusLoading2(false);
			}

		} catch (e) {
			console.error("Transaction failed:", e);
			if (e.message.includes("Transaction with hash")) {

				setisDelete(true);

				const response = await axios.patch(`https://treepoets.com:3001/api/updateEntry`, {
					index: index,
					_isDeleted: true
				});

				setstatusError(false);
				setisDelete(true);
				setstatusLoading2(false);

				if (response.status === 200) {
					console.log('Entry marked as deleted successfully');
					await allEntries();
				}

				console.log("adkiuyhsalofdjalkhfjdalskhf");
			}
			else if (e.message.includes("err: insufficient funds for gas")) {
				//setshowErrorDiv(false);
				setstatusError(false);
				setstatusLoading2(false);
				setInsufficientFunds(true);
				console.log("insufficient funds for gas");

			} else if (e.message.includes("User rejected the request")) {
				//setshowErrorDiv(false);
				setstatusError(false);
				setstatusLoading2(false);
			} else {
				//setshowErrorDiv(false);

				console.log(e);
				setstatusError(true);
				setstatusLoading2(false);
			}


		}

	}

	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};

	const { refetch: getTotalSupply } = useContractRead({
		...contract,
		functionName: 'totalSupply',
	})

	const { refetch: getBalanceOf } = useContractRead({
		...contractToken,
		functionName: 'balanceOf',
		args: [walletAddress]
	})

	const { refetch: getBalanceOfContract } = useContractRead({
		...contractToken,
		functionName: 'totalSupply'
	})

	async function bid(index) {

		try {
			setstatusError(false);
			setstatusLoading(true);

			const amountInWei = parseUnits(_amount, 'ether');
			console.log("amountInWei" + amountInWei);

			var res = await writeAsync({
				functionName: 'bid',
				args: [index, amountInWei.toString()],
				gasLimit: '685000'
			})

			const txnHash = res.hash;
			setTxnHash(txnHash);


			// Wait for transaction receipt
			const result = await publicClient.waitForTransactionReceipt(res);

			if (result.status === 'success') {
				setstatusError(false)
				setsuccess(true)
				setstatusLoading(false)
				const successMsg = "Transaction Successful!";
				const loadMsg = "";
				setSuccessMsg1(successMsg);
				setLoadingMsg1(loadMsg);


				const response = await axios.patch('https://treepoets.com:3001/api/afterBidUpdate', {
					index: index,
					highestBidAmount: _amount,
					bidderAddress: walletAddress
				});


				await new Promise(resolve => setTimeout(resolve, 3000));
				window.location.reload(true);
			}
			else {
				setsuccess(false)
				setstatusError(true)
				setstatusLoading(false)
			}
		} catch (e) {
			console.error("Transaction failed:", e);
			if (e.message.includes("Transaction with hash")) {

				setsuccess(true);

				const response = await axios.patch('https://treepoets.com:3001/api/afterBidUpdate', {
					index: index,
					highestBidAmount: _amount,
					bidderAddress: walletAddress
				});

				console.log("adkiuyhsalofdjalkhfjdalskhf");
			}
			else if (e.message.includes("err: insufficient funds for gas")) {
				//setErrorMsg1(errorName);
				setstatusError(false);
				setstatusLoading(false);
				setInsufficientFunds(true);
			} else if (e.message.includes("User rejected the request")) {
				//setErrorMsg1(errorName);
				setstatusError(false);
				setstatusLoading(false);
			} else {
				console.log(e);
				setstatusError(true);
				setstatusLoading(false);
			}



		}

	}

	async function closediv() {
		setOpenEdits(0);
	}

	async function closediv() {
		set_addAuction(0);

		setstatusError(false)
		setsuccess(false)
		set_statusHighestBid(false);
	}

	async function closediv2() {
		setIsMinted(0);
		setstatusLoading(0);
		setstatusError(0);
	}

	async function bidDivOpen(index) {

		console.log("indexBID : " + index);
		const response = await axios.get(`https://treepoets.com:3001/api/getDetailsByIndexHB?index=${index}`, {

		});

		setHighestBid(response.data.highestBidAmount);
		setAuctionIndex(index);

		console.log('FetchedbidDivOpen:', response.data); // Log the fetched data
		// You can now use response.data as needed

		set_addAuction(1);
	}

	async function allowance() {

		try {
			setstatusLoading(true);
			console.log("_quantity : " + _amount);
			console.log("_currentAllowance : " + _currentAllowance);

			setIncreaseAllowanceAmount((Number(_amount * 10 ** 18) - Number(_currentAllowance)));
			console.log("data.data : " + _currentAllowance);

			const _increaseAllowance = ((Number(_amount * 10 ** 18) - Number(_currentAllowance)));
			console.log("Amount increasing :" + _increaseAllowance);
			const rounded = Math.round(_increaseAllowance);


			var res = await writeAsync({
				...contractToken,
				functionName: 'increaseAllowance',
				args: [address, rounded],
				gasLimit: '685000'
			})

			var result = await publicClient.waitForTransactionReceipt(res);

			if (result.status === 'success') {
				setstatusLoading(false);
				setAllowanceStatus(true);
			} else {
				setstatusLoading(false);
			}
		} catch (e) {
			console.log(e);
			setstatusLoading(false);
		}

	}

	const { refetch: getAllowance } = useContractRead({
		...contractToken,
		functionName: 'allowance', args: [walletAddress, address]
	})


	const pageIndexer = () => {
		try {
			let pageIndexes = [];
			console.log("_dataLength%10 :" + (Number(_dataLength / 10 % 10)));
			console.log("Number(_dataLength)/2 :" + Number(_dataLength) / 10);

			for (let x = _o; x < (((10 + Number(_o)) > (Number(_dataLength) / 10)) ? ((Number(_dataLength) / 10) % 10) : (10 + Number(_o))); x++) {
				const pageNum = x + 1;
				console.log(" Number(_dataLength)" + Number(_dataLength));
				pageIndexes.push(
					<div
						key={x}
						onClick={() => allEntries(pageNum)}
						className={pageNum === activePage ? 'eachNumber active' : 'eachNumber'}
					>
						{pageNum}
					</div>
				);
			}

			return pageIndexes;
		} catch (err) {
			console.log(err);
		}
	}

	const arrowClicked = () => {
		try {

			var count = Number(_o) + 10;
			if (count < Number(_dataLength / 10)) {
				setO(Number(_o) + 10);

				console.log("Arrow Clicked : " + Number(_o) + 10);
			}
		} catch {
			console.log(err);
		}

	}

	const arrowPrevious = () => {

		var count = Number(_o) - 10;
		if (count >= 0) {
			setO(Number(_o) - 10);
		}
	}

	async function onMint(totalSupply) {
		setstatusLoadingMint(true);
		setstatusErrorMint(false);
		setIsMinted(false);
		setstatusError(false);

		console.log("totalSupply : " + totalSupply);

		try {

			var res = await writeAsync({
				functionName: 'mint',
				args: [totalSupply, _meta, _index, _associatedWalletUpdate]
			})

			var result = await publicClient.waitForTransactionReceipt(res);
			if (result.status === 'success') {
				setstatusErrorMint(false);
				setisMinted3(true);
				setstatusLoading(false);
				setstatusLoadingMint(false);
				setstatusError(false);

				const response = await axios.patch('https://treepoets.com:3001/api/afterMintUpdate', {
					_isMinted: true,
					tokenID: totalSupply,
					index: _index,
					topMint: false,
					bottomMint: true
				});


			} else {
				setisMinted3(false);
				setstatusErrorMint(true);
				setstatusLoadingMint(false);
				setstatusError(false);
			}


		} catch (e) {
			console.error("Transaction failed:", e);
			if (e.message.includes("Transaction with hash")) {

				setisMinted3(true);

				const response = await axios.patch('https://treepoets.com:3001/api/afterMintUpdate', {
					_isMinted: true,
					tokenID: totalSupply,
					index: _index,
					topMint: false,
					bottomMint: true
				});

				console.log("adkiuyhsalofdjalkhfjdalskhf");
			}
			else if (e.message.includes("err: insufficient funds for gas")) {
				//setshowErrorDiv(false);
				console.log("insufficient funds for gas");
				setstatusErrorMint(false);
				setstatusLoadingMint(false);
				setInsufficientFunds(true);
				setstatusError(false);

			} else if (e.message.includes("User rejected the request")) {
				//setshowErrorDiv(false);
				setstatusErrorMint(false);
				setstatusLoadingMint(false);
				setstatusError(false);
			} else {
				//setshowErrorDiv(false);

				console.log(e);
				setstatusErrorMint(true);
				setstatusLoadingMint(false);
				setstatusError(false);
			}


		}

	}

	async function closedivNoti2() {
		setstatusError(false);
		setstatusErrorMint(false);
		setInsufficientFunds(false);
	}

	async function closedivNoti() {
		window.location.reload(true);
	}

	const closeEdits = () => {
		setResponseMessage(false)
	};

	const clickConnectAu = () => {
		open();
		localStorage.setItem('opBtnClicked', 'opBtn');
	};

	async function disconnectWalletAu() {
		disconnect();

		localStorage.removeItem('opConnected');
		localStorage.removeItem('opBtnClicked');

		window.location.reload(true);

	}

	return (
		<div class="auctionsMainAdmin">


			<div class="auctionsMain-1">
				<div className='auctionH'>
					<div className='auctionSub'>
						<div className='auctionAmounts'>
							{_connected && _balanceOfContract
								? (Number(_balanceOfContract) / 10 ** 18).toFixed(2)
								: "0.00"}
						</div>
						<div className='auctionAmountsName'>$POETTREE Total Supply</div>
					</div>

					<div className='auctionSub'>
						<div className='auctionAmountsName'>AUCTIONS</div>
						{_connected ? (
							<button class="approve" onClick={disconnectWalletAu}>
								{walletAddress === "" ? "Connect" : shortenAddress(walletAddress)}
							</button>
						) : (
							<button class="approve" onClick={clickConnectAu}>Connect</button>
						)}
					</div>

					<div className='auctionSub'>
						<div className='auctionAmounts'>
							{_connected && _balanceOf
								? (Number(_balanceOf) / 10 ** 18).toFixed(2)
								: "0.00"}
						</div>
						<div className='auctionAmountsName'>$POETTREE Rewards</div>
					</div>
				</div>
				<div class="table-wrapper">
					<table>
						<thead>
							<tr>
								<th>Tree Poetry</th>
								<th style={{ width: "5vw" }}>Bid</th>
								<th style={{ width: "15vw" }}>Collection</th>
								<th style={{ width: "16vw" }}>Poet</th>
								<th style={{ width: "16vw" }}>Illustrator</th>
								<th style={{ width: "12vw" }}>IP</th>
							</tr>
						</thead>

						{_active_auction && Array.isArray(_allEntries) && _allEntries.length > 0 ? (
							<>
								{_allEntries.map((allAuctionEntries, index) => (
									
									(

										<tbody key={index}>
											<tr>
												<td>
													<div className='bidDiv'>
														<div>
															<img className='bidImg' src={allAuctionEntries.imageURL} alt="Bid Item" onClick={(e) => {
																e.stopPropagation(); // Prevent triggering row click
																handleImageClick(allAuctionEntries.imageURL);
															}} />
														</div>
														<div className="bid-button" onClick={() => bidDivOpen(allAuctionEntries.index)}>Bid</div>
													</div>
												</td>
												<td>{Number(allAuctionEntries.highestBidAmount).toFixed(0)}</td>
												<td>{allAuctionEntries.collectionName}</td>
												<td>{allAuctionEntries.poet}</td>
												<td>{allAuctionEntries.illustrator}</td>
												<td>{allAuctionEntries.radio1}</td>
											</tr>

											{_addAuction > 0 && (
												<div className="popup-containerMain">
													<div className="popup-container-admin">
														<div className="close" onClick={closediv}>✖</div>
														<div>
															<div className='updateT'>Set Your Bid Amount</div>
															<div className='bidAmount'>Highest Bid Amount = {_highestBid}</div>
															<div className="contentBar">
																<div className="textField">
																	<div>
																		<input
																			type="number"
																			required
																			step="0.001"
																			id="comment"
																			value={Number(_amount)}

																			onChange={(event) => {
																				const value = event.target.value;

																				// Allow empty string, or any non-negative number (including decimals)
																				if (value === "" || !isNaN(value) && Number(value) >= 0) {
																					set_amount(value);
																				}
																			}}
																			onBlur={() => {
																				// Set default value to "1" if the field is empty when user leaves the input
																				if (Number(_amount) === "" || Number(_amount) === undefined) {
																					set_amount(0);
																				}
																			}}
																		/>

																	</div>
																	Bidding amount
																</div>
															</div>
															{_allowanceStatus ? (
																<button className='update-2' onClick={() => bid(_auctionIndex)}>Set Bidding</button>
															) : (
																<button className='update-2' onClick={allowance}>Approve</button>
															)}
														</div>
														<div>
															{statusError && (
																<div className="errorMessage">
																	{_ErrorMsg1.toString()}
																</div>
															)}
															{statusLoading && (
																<div className="loadingContainer">
																	<div className="loadingText">Updating</div>
																</div>
															)}

															{statusHighestBid && _amount > 0 && (
																<div className="errorMessage">
																	Your bid is lower
																</div>
															)}

															{success && (
																<div>
																	<div className="successfully">Your bid was successfully added!</div>
																</div>
															)}
														</div>
													</div>
												</div>
											)}
										</tbody>

									)))}

								{selectedImage && (
									<div className="modal-overlay" onClick={closeModal}>
										<div className="modal-content" onClick={(e) => e.stopPropagation()}>
											<button className="close-button" onClick={closeModal}>✖</button>

											<img src={selectedImage} alt="Full View" className="full-image" />
										</div>
									</div>)}
							</>
						) : null}


					</table>

				</div>

				{_noData ?
					<div></div> :
					<div className='pages'>
						{/*<div onClick={() => arrowFirst()} className='EachNumber2'>First</div>
*/}
						{/*<div><div onClick={() => arrowPrevious()} id="symbol">&lt;</div></div>*/}

						<div className='eachNumMain'>{pageIndexer()}</div>

						{/*<div><div onClick={() => arrowClicked()} id="symbol">&gt;</div></div>*/}
						{/*<div onClick={() => arrowLast()} className='EachNumber2'>Last</div>*/}

					</div>
				}

			</div>

			{statusLoading2 ?
				<div class="popup-containerMain">
					<div class="popup-container">
						<div class="popup loading">
							<div class="loader"></div>
							<p>Loading...</p>
						</div>
					</div>
				</div> : null
			}

			{statusLoadingDE ?
				<div class="popup-containerMain">
					<div class="popup-container">
						<div class="popup loading">
							<div class="loader"></div>
							<p>Data transfering...</p>
						</div>
					</div>
				</div> : null}

			{statusError ?

				<div class="popup-containerMain">
					<div class="popup-container">
						<div class="popup errorDiv">
							<div className="close" onClick={closediv2}>✖</div>
							<img className='gif2' src={warning} />
							<p className='responseSuccess'>Sorry, something went wrong</p>
							<div className='review2'>An error occurred while processing your request. Please try again.</div>
						</div>
					</div>
				</div> : null
			}

			{isMinted3 ?
				<div class="popup-containerMain">
					<div class="popup-container">
						<div class="popup success">
							<div className="close" onClick={closedivNoti}>✖</div>
							<p className='responseSuccess'>Minting Successful!</p>
							<div className='review'>Congratulations on your successful minting!</div>
							<p></p>
							<p className='backLink2' onClick={closedivNoti}>Proceed</p>

						</div>
					</div>
				</div> : null
			}

			{statusLoadingMint ?
				<div class="popup-containerMain">
					<div class="popup-container">
						<div class="popup loading">
							<div class="loader"></div>
							<p>Minting...</p>
						</div>
					</div>
				</div> : null}

			{isMinted ?
				<div class="popup-containerMain">
					<div class="popup-container">
						<div class="popup loading">
							<div className="close" onClick={closedivNoti}>✖</div>
							<img className='gif2' src={checked} />
							<p></p>
							<p className='responseSuccess'>Data entered successfully</p>
							<button className='mintBtnSub' onClick={() => {
								onMint(Number(_totalSupply + 1));
							}}>Mint</button>
						</div>
					</div>
				</div> : null}

			{statusErrorMint ?
				<div class="popup-containerMain">
					<div class="popup-container">
						<div class="popup loading">
							<div className="close" onClick={closedivNoti2}>✖</div>
							<img className='gif2' src={warning} />
							<p></p>
							<div className='review2'>An error occurred while processing your request. Please try again.</div>
							<p></p>
							<button className='mintBtnSub' onClick={() => {
								onMint(Number(_totalSupply + 1));
							}}>Mint</button>
						</div>
					</div>
				</div> : null}

			{_insufficientFunds ?
				<div class="popup-containerMain">
					<div class="popup-container">
						<div class="popup success">
							<div className="close" onClick={closedivNoti2}>✖</div>
							<img className='gif2' src={warning} />
							<p></p>
							<div className='review2'>Insufficient Funds</div>
						</div>
					</div>
				</div> : null}

			{isDelete ?
				<div class="popup-containerMain">
					<div class="popup-container">
						<div class="popup success">
							<div className="close" onClick={closedivNoti}>✖</div>
							<img className='gif2' src={checked} />
							<p></p>
							<div className='responseSuccess'>Entry marked as deleted successfully!</div>
						</div>
					</div>
				</div> : null
			}

			{responseMessage == '' ?
				<div></div> :
				<div>
					{responseMessage.includes("Error") ?

						<div class="popup-containerMain">
							<div class="popup-container">
								<div class="popup errorDiv">
									<div className="close" onClick={closeEdits}>✖</div>
									<img className='gif2' src={warning} />
									<p className='responseSuccess'>{responseMessage}</p>
									<div className='review2'>An error occurred while processing your request. Please try again.</div>
								</div>
							</div>
						</div> :
						<div class="popup-containerMain">
							<div class="popup-container">
								<div class="popup success">
									<div className="close" onClick={closedivNoti}>✖</div>
									<img className='gif2' src={checked} />
									<p></p>
									<div className='responseSuccess'>{responseMessage}</div>
								</div>
							</div>
						</div>
					}
				</div>
			}

		</div>
	)

}
export default Auctions;