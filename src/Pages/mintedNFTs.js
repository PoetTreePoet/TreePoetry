/* eslint-disable no-undef */
import '../App.css'
import React, { useEffect, useMemo, useState } from 'react';
import { Web3Button, Web3Modal, useWeb3Modal } from '@web3modal/react';
import { mainnet, useDisconnect, useAccount, useContractRead, useContractReads, useContractWrite, useNetwork, usePublicClient, useSwitchNetwork } from 'wagmi';
import { createPublicClient, formatEther, http, parseEther, webSocket } from 'viem';
import { optimism } from 'wagmi/chains'
import deleteBtn from '../assets/burn.png';
import $ from "jquery";
import edit from '../assets/edit.png';
import { Web3 } from "web3";
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import warning from '../assets/warning.png';
import checked from '../assets/checked.png';
import list from '../assets/list.png';
import imageCompression from 'browser-image-compression';

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


	return <div id="counterBlock"><div class="days">{days}</div><div class="dots">:</div><div class="days">{hours}</div><div class="dots">:</div><div class="days">{minutes}</div><div class="dots">:</div><div class="sec">{seconds}</div></div>;
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


function MintedNFTs() {
	const { open } = useWeb3Modal()
	const { chain } = useNetwork()
	const { switchNetwork } = useSwitchNetwork()
	const clientID = "2f8f716d-b303-481b-80ef-febaf341524b";
	const web3 = new Web3("https://go.getblock.io/3a42b9c03a1747baa5ea4471062e352f");

	const [_totalSupply, settotalSupply] = useState(0);
	const [_deleteEntry, setDeleteEntry] = useState("");
	const [statusError, setstatusError] = useState(false);
	const [statusErrorMint, setstatusErrorMint] = useState(false);
	const [statusLoading, setstatusLoading] = useState(false);
	const [statusLoadingMint, setstatusLoadingMint] = useState(false);
	const [isMinted3, setisMinted3] = useState(false);
	const [baseUriStatus, setBaseUriStatus] = useState(false);
	const [_burnStatus, setBurnStatus] = useState(false);

	const [statusError2, setstatusError2] = useState("");
	const [statusLoading2, setstatusLoading2] = useState(false);

	const [_owner, set_owner] = useState(false);
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
	const [_OpenEdits, setOpenEdits] = useState(-1);
	const [_addAuction, set_addAuction] = useState(0);
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
	const [isListedAu, setIsListedAu] = useState(false);
	const [isMinted2, setIsMinted2] = useState(false);
	const [_statusErrorAu, setstatusErrorAu] = useState(false);

	const [_associatedWallet, set_associateWallet] = useState('');
	const [_collectionName, set_collectionName] = useState('');
	const [_amountDonate, set_amountDonated] = useState('');
	const [_SelectedIndexForUpdate, setSelectedIndexForUpdate] = useState('');
	const [_SelectedURLForUpdate, setSelectedURLForUpdate] = useState('');
	const [_endTime, set_endTime] = useState('');
	const [_indexForAuction, set_indexForAuction] = useState(0);
	const [selectedEntry, setSelectedEntry] = useState(null);

	const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
	const [_dataLength, setDataLength] = useState(0);
	const [response, setResponse] = useState('');
	const [_metadata, setMetadata] = useState('');
	const [_index, setIndex] = useState('');
	const [fetching, setFetching] = useState([]);
	const [responseMessage, setResponseMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const [isAddedAu, setisAddedAu] = useState(false);
	const [runUseEffect, set_runUseEffect] = useState(0);
	const [_associatedWalletUpdate, setAssociatedWalletUpdate] = useState('0x0000000000000000000000000000000000000000');
	const [_insufficientFunds, setInsufficientFunds] = useState(false);
	const httpsUrl = process.env.REACT_APP_HTTPS_URL;
	const websocketUrl = process.env.REACT_APP_WEBSOCKET_URL;

	const [day, setDay] = useState("Friday");
	const [month, setMonth] = useState("January");
	const [date, setDate] = useState(3);
	const [year, setYear] = useState(2025);
	const [hour, setHour] = useState(7);
	const [minute, setMinute] = useState(24);
	const [second, setSecond] = useState(54);
	const [period, setPeriod] = useState("AM");
	const [_newBase, set_newBase] = useState(0);

	const itemsPerPage = 1; // Number of items per page
	const visiblePages = 3; // Show 3 page numbers at a time

	const filteredEntries = _allEntries
		.filter(entry => entry.isMinted)
		.filter(entry => !entry.isDeleted);
	;

	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);
	const [pageGroup, setPageGroup] = useState(1); // Track visible set of 3 pages
	const [_metadataURI, set_MetadataURI] = useState(1);



	const handlePageChange = (page) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	const handleNextGroup = () => {
		if (pageGroup * visiblePages < totalPages) {
			setPageGroup(pageGroup + 1);
		}
	};

	const handlePrevGroup = () => {
		if (pageGroup > 1) {
			setPageGroup(pageGroup - 1);
		}
	};

	const startPage = (pageGroup - 1) * visiblePages + 1;
	const endPage = Math.min(startPage + visiblePages - 1, totalPages);
	const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);


	// Combine selected values into a timestamp
	const combinedTimestamp = `${day}, ${month} ${date}, ${year}, ${hour}:${minute.toString().padStart(2, "0")}:${second
		.toString()
		.padStart(2, "0")} ${period}`;


	const { address: walletAddress } = useAccount({

		async onConnect() {
			setConnected(true);
			//handleConnect();
			console.log("handle1");
			if (chain.id !== 10) {
				switchNetwork(10);
				console.log("handle2");
			}
			console.log("handle3");

			//await fetchNFTs();

			console.log("handle4");

		}
	})


	const transport = http(httpsUrl);

	const publicClient = createPublicClient({
		chain: optimism,
		transport
	})

	async function newBase() {
		set_newBase(1);
	}

	async function newBaseClose() {
		set_newBase(0);
	}

	var contract = {
		address: address,
		abi: ABI
	}

	useEffect(() => {
		// Combine selected values into a timestamp
		let _month;
	
		const combinedTimestamp = `${day}, ${month}, ${date}, ${year}, ${hour}:${minute.toString().padStart(2, "0")}:${second
			.toString()
			.padStart(2, "0")} ${period}`;

		console.log("combinedTimestamp : " + combinedTimestamp);
		setSelectedEntry(prev => ({ ...prev, timestamp: combinedTimestamp }))

	}, [day, month, date, year, hour, minute, second, period, runUseEffect]);

	useEffect(() => {

		$(document).ready(() => {
			$('#photo').change(function () {
				const file = this.files[0];
				console.log(file);
				//setSelectedFile(file);
				if (file) {
					let reader = new FileReader();
					reader.onload = function (event) {
						console.log(event.target.result);
						$('#imgPreview2').attr('src', event.target.result);
					}
					reader.readAsDataURL(file);
				}
			});
		});

		console.log("Selected //// File :" + selectedFile);

		async function fetchData() {
			var data = await getTotalSupply();

			settotalSupply(Number(data.data))
			console.log("totalSupplyFromUseffect : " + data.data)

		}

		async function fetchOwner() {
			var data = await getOwner();

			set_owner(data.data)
			console.log("set_owner : " + data.data)
		}

		async function fetchMetadataURI() {
			var data = await getMetadataURI();

			set_MetadataURI(data.data)
			console.log("MetadataURI : " + data.data)

		}

		allEntries();
		fetchData();
		getDataFromServer();

		if (_connected) {
			fetchOwner();
			fetchMetadataURI();
		}

	}, [_connected, walletAddress, selectedFile, _endTime]);

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

	async function deleteEntry(index) {
		try {

			setResponseMessage(''); // Clear previous response message
			setIsLoading(true);

			const response = await axios.patch(`https://treepoets.com:3001/api/updateEntry`, {
				index: index,
				_isDeleted: true
			});

			if (response.status === 200) {
				console.log('Entry marked as deleted successfully');
				// Optionally, you can refresh the entries or update the state here
				setIsLoading(false);
				setResponseMessage('Entry marked as deleted successfully!'); // Show success message

				await allEntries(); // Refresh the entries to reflect the changes
			}
		} catch (err) {
			console.log(err);
			setResponseMessage('Error occurred.');
			setIsLoading(false);
		}
	}


	async function updateAuctionList(index) {
		try {

			const res = await writeAsync({
				...contract,
				functionName: 'updateAuctionList',
				args: [index],
				gasLimit: '685000', // Adjust gas limit as needed
			});

		} catch (e) {
			console.log(e);

		}

	}

	const setMetadataURI = async (metadataURL, tokenIDNft) => {
		try {

			setstatusError(false); // Clear previous response message
			setstatusLoading(true);
			setBaseUriStatus(false);

			const res = await writeAsync({
				...contract,
				functionName: 'setMetadataURI',
				args: [metadataURL, tokenIDNft],
				gasLimit: '685000', // Adjust gas limit as needed
			});

			var result = await publicClient.waitForTransactionReceipt(res);
			if (result.status === 'success') {
				setstatusError(false);
				setBaseUriStatus(true);
				setstatusLoading(false);

			} else {
				setBaseUriStatus(false);
				setstatusError(true);
				setstatusLoading(false);
			}

		} catch (e) {
			console.error("Transaction failed:", e);
			if (e.message.includes("Transaction with hash")) {

				setstatusError(false);
				setBaseUriStatus(true);

				console.log("adkiuyhsalofdjalkhfjdalskhf");
			} else if (e.message.includes("err: insufficient funds for gas")) {
				//setshowErrorDiv(false);
				setstatusError(false);
				setstatusLoading(false);
				setInsufficientFunds(true);
				console.log("insufficient funds for gas");

			} else if (e.message.includes("User rejected the request")) {
				setstatusError(false);
				setstatusLoading(false);
				setBaseUriStatus(false);
				//setshowErrorDiv(false);
			} else {
				//setshowErrorDiv(false);				
				console.log(e);
				setstatusError(true);
				setstatusLoading(false);
				setBaseUriStatus(false);
			}

		}
	};

	const burn = async (tokenIDNft, index) => {
		try {

			setstatusError(false); // Clear previous response message
			setstatusLoading(true);
			setBurnStatus(false);

			const res = await writeAsync({
				...contract,
				functionName: 'burn',
				args: [tokenIDNft],
				gasLimit: '685000', // Adjust gas limit as needed
			});

			var result = await publicClient.waitForTransactionReceipt(res);
			if (result.status === 'success') {
				setstatusError(false);
				setBurnStatus(true);
				setstatusLoading(false);

				const response = await axios.patch(`https://treepoets.com:3001/api/updateEntry`, {
					index: index,
					_isDeleted: true
				});

			} else {
				setBurnStatus(false);
				setstatusError(true);
				setstatusLoading(false);
			}

		} catch (e) {
			console.error("Transaction failed:", e);
			if (e.message.includes("Transaction with hash")) {

				setstatusError(false);
				setBurnStatus(true);

				const response = await axios.patch(`https://treepoets.com:3001/api/updateEntry`, {
					index: index,
					_isDeleted: true
				});

				if (response.status === 200) {
					console.log('Entry marked as deleted successfully');
					// Optionally, you can refresh the entries or update the state here

					await allEntries(); // Refresh the entries to reflect the changes
				}

				console.log("adkiuyhsalofdjalkhfjdalskhf");
			} else if (e.message.includes("err: insufficient funds for gas")) {
				//setshowErrorDiv(false);
				setstatusError(false);
				setstatusLoading(false);
				setInsufficientFunds(true);
				console.log("insufficient funds for gas");

			} else if (e.message.includes("User rejected the request")) {
				setstatusError(false);
				setstatusLoading(false);
				setBurnStatus(false);
				//setshowErrorDiv(false);
			} else {
				//setshowErrorDiv(false);				
				console.log(e);
				setstatusError(true);
				setstatusLoading(false);
				setBurnStatus(false);
			}

		}
	};

	const addToAuctionFB = async (_isMinted_Au, _index_Au, _Nonprofit_Au, _Poet_Au, _Illustrator_Au, _CollectionName_Au, _ImageUrl_Au, _ip_Au) => {
		try {

			setstatusError(false); // Clear previous response message
			setstatusLoading(true);
			setstatusErrorAu(false);
			setIsListedAu(false);

			console.log("_index_Au : " + _index_Au);
			console.log("_Nonprofit_Au : " + _Nonprofit_Au);
			console.log("_Poet_Au : " + _Poet_Au);
			console.log("_Illustrator_Au : " + _Illustrator_Au);
			console.log("_CollectionName_Au : " + _CollectionName_Au);
			console.log("_ImageUrl_Au : " + _ImageUrl_Au);

			const res = await writeAsync({
				...contract,
				functionName: 'updateAuctionList',
				args: [_index_Au],
				gasLimit: '685000', // Adjust gas limit as needed
			});

			var result = await publicClient.waitForTransactionReceipt(res);
			if (result.status === 'success') {
				setstatusError(false);
				setisAddedAu(true);
				setstatusLoading(false);
				setstatusErrorAu(false);
				setIsListedAu(false);

				axios.post('https://treepoets.com:3001/api/addToAuction', {
					_isMinted: _isMinted_Au,
					index: _index_Au,
					nonprofit: _Nonprofit_Au,
					poet: _Poet_Au,
					illustrator: _Illustrator_Au,
					collection: _CollectionName_Au,
					imageUrl: _ImageUrl_Au,
					radio1: _ip_Au,
					_isListed: true,
				})

				const response = await axios.patch('https://treepoets.com:3001/api/afterAuctionUpdate', {
					_isListed: true,
					index: _index_Au.toString() // Convert index to string before sending
				});

			} else {
				setisAddedAu(false);
				setstatusError(false);
				setstatusLoading(false);
				setstatusErrorAu(true);
				setIsListedAu(false);
			}

		} catch (e) {
			console.error("Transaction failed:", e);
			if (e.message.includes("Transaction with hash")) {

				setstatusError(false);
				setisAddedAu(true);
				setstatusErrorAu(false);

				axios.post('https://treepoets.com:3001/api/addToAuction', {
					_isMinted: _isMinted_Au,
					index: _index_Au,
					nonprofit: _Nonprofit_Au,
					poet: _Poet_Au,
					illustrator: _Illustrator_Au,
					collection: _CollectionName_Au,
					imageUrl: _ImageUrl_Au,
					radio1: _ip_Au,
					_isListed: true,
				})

				const response = await axios.patch('https://treepoets.com:3001/api/afterAuctionUpdate', {
					_isListed: true,
					index: _index_Au.toString() // Convert index to string before sending
				});

				console.log("adkiuyhsalofdjalkhfjdalskhf");
			} else if (e.message.includes("err: insufficient funds for gas")) {
				//setshowErrorDiv(false);
				setstatusError(false);
				setstatusLoading(false);
				setInsufficientFunds(true);
				setstatusErrorAu(false);
				console.log("insufficient funds for gas");

			} else if (e.message.includes("User rejected the request")) {
				setstatusError(false);
				setstatusLoading(false);
				setstatusErrorAu(false);
				//setshowErrorDiv(false);
			} else {
				//setshowErrorDiv(false);				
				console.log(e);
				setstatusError(false);
				setstatusLoading(false);
				setstatusErrorAu(true);
			}

		}
	};

	const mintNFT = async () => {
		try {
			// Use the file object directly from event.target.files[0]
			const file = document.querySelector('#photo').files[0];
			const fileName = file.name;

			// Convert the file to base64 encoding
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			if (_connected) {
				fileReader.onload = () => {
					const base64String = fileReader.result.split(',')[1];
					// Send the request with the file as base64 string
					axios.post('https://treepoets.com:3001/api/_mintnft', {
						radio1: _Radio1,
						notes: _Notes,
						illustrator: _Illustrator,
						poet: _Poet,
						donation: _Donation,
						nonprofit: _Nonprofit,
						file: base64String,
						fileName: fileName,
						wallet: walletAddress

					})
						.then(response => {
							console.log('File sent successfully.');
							console.log(response.data);
						})
						.catch(error => {
							console.log('Error sending file.', error);
						});
				};
			} else {
				fileReader.onload = () => {
					const base64String = fileReader.result.split(',')[1];
					// Send the request with the file as base64 string
					axios.post('https://treepoets.com:3001/api/_mintnft', {
						radio1: _Radio1,
						notes: _Notes,
						illustrator: _Illustrator,
						poet: _Poet,
						donation: _Donation,
						nonprofit: _Nonprofit,
						file: base64String,
						fileName: fileName

					})
						.then(response => {
							console.log('File sent successfully.');
							console.log(response.data);
						})
						.catch(error => {
							console.log('Error sending file.', error);
						});
				};
			}

		} catch (err) {
			console.log(err);
		}
	};

	const handleFileChange = (event) => {
		try {
			setSelectedFile(event.target.files[0]);
			console.log("File Changed ---- :" + event.target.files[0].name);
		} catch (err) {
			console.log(err);
		}
	};


	const { refetch: getMetadataURI } = useContractRead({
		...contract,
		functionName: 'metadataURI'
	})

	async function allEntries() {
		try {

			const response = await axios.get('https://treepoets.com:3001/api/getallfriends');

			console.log("response :" + JSON.stringify(response.data));

			let itemDataArray = [];

			setDataLength(response.data.length);

			for (let x = 0; x < response.data.length; x++) {

				itemDataArray.push(
					response.data[x]
				)
			}

			// Fetch data from getAllEntries
			var data4 = itemDataArray;
			console.log("Fetched data:", data4);

			await new Promise((resolve) => setTimeout(resolve, 2000));

			const result2 = await Promise.all(data4

				.map(async (entries) => {
					const unixTime = Number(entries.SubmittedTime); // Convert BigInt to Number
					const date = new Date(unixTime * 1000);
					const entriesDate = date.toLocaleDateString("fr-CH");

					console.log("entries.MetadataUrl : " + entries.MetadataUrl);
					console.log("entries.Image : " + entries.Image);
					console.log("entries.DonorWallet : " + entries.DonorWallet);
					console.log("entries.Donation : " + entries.Donation);
					console.log("entries.Bonus : " + entries.Bonus);


					let item = {
						index: Number(entries.Index),
						nonprofit: entries.Nonprofit,
						donationAmount: entries.Donation.toString(), // Convert BigInt to string if necessary
						poet: entries.Poet,
						illustrator: entries.Illustrator,
						notes: entries.Notes,
						timestamp: entries.SubmittedTime, // Use converted number
						epochTime: entries.EpochTime, // Use converted number
						propertyRights: entries.Radio1,
						metadataURL: entries.MetadataUrl,
						imageURL: entries.Image,
						isDeleted: entries._isDeleted,
						isMinted: entries._isMinted,
						isListed: entries._isListed,
						tokenID: entries.tokenID,
						associatedWallet: entries.DonorWallet,
						collectionName: entries.CollectionName,
						//endTime: entries.endTime,
						bonus: entries.Bonus.toString(),
						ownerwallet: entries.Wallet,
						//tokenID: entries.tokenID.toString() // Convert BigInt to string if necessary
					};

					console.log("Time SubmittedTime : " + entries.SubmittedTime);
					console.log("Time STAMP: " + item.timestamp);
					console.log("item.metadataURL : " + item.metadataURL);
					console.log("item.associatedWallet : " + item.associatedWallet);
					console.log("item.Image : " + item.imageURL);
					console.log("item.DonorWallet : " + item.associatedWallet);

					return item;
				}));

			// Sort result2 in descending order based on 'index'
			const sortedResult2 = result2.sort((a, b) => b.index - a.index);

			// Log the sorted entries
			console.log("Sorted entries (descending order):", sortedResult2);

			// Set the state with the sorted entries
			setAllEntries(sortedResult2);

		} catch (err) {
			console.log(err);
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

	const { refetch: getOwner } = useContractRead({
		...contract,
		functionName: 'owner',
	})

	async function onMint(totalSupply) {
		setstatusLoadingMint(true);
		setstatusErrorMint(false);
		setstatusError(false);
		setIsMinted(false);
		setstatusLoading(false);



		console.log("mint_totalSupply__ : " + _totalSupply);
		console.log("mint_totalSupply : " + totalSupply);
		console.log("mint_metadata : " + _metadata);
		console.log("mint_index : " + _index);
		console.log("mint_associatedWalletUpdate : " + _associatedWalletUpdate);

		try {

			var res = await writeAsync({
				functionName: 'mint',
				args: [Number(totalSupply), _metadata, _index, _associatedWalletUpdate]
			})


			console.log("_associatedWalletUpdate_fnction2 : " + _associatedWalletUpdate);

			var result = await publicClient.waitForTransactionReceipt(res);
			if (result.status === 'success') {
				setstatusErrorMint(false);
				setstatusError(false);
				setisMinted3(true);
				setstatusLoading(false);
				setIsMinted(false);
				setstatusLoadingMint(false);

				const response = await axios.patch('https://treepoets.com:3001/api/afterMintUpdate', {
					_isMinted: true,
					tokenID: totalSupply,
					index: _index,
					topMint: true,
					bottomMint: false
				});

			} else {
				setisMinted3(false);
				setstatusErrorMint(true);
				setstatusError(false);
				setstatusLoadingMint(false);
				setstatusLoading(false);
			}

		} catch (e) {
			console.error("Transaction failed:", e);
			if (e.message.includes("Transaction with hash")) {

				setisMinted3(true);

				const response = await axios.patch('https://treepoets.com:3001/api/afterMintUpdate', {
					_isMinted: true,
					tokenID: totalSupply,
					index: _index,
					topMint: true,
					bottomMint: false
				});

				console.log("adkiuyhsalofdjalkhfjdalskhf");
			}
			else if (e.message.includes("err: insufficient funds for gas")) {
				//setshowErrorDiv(false);
				console.log("insufficient funds for gas");
				setstatusErrorMint(false);
				setstatusError(false);
				setstatusLoadingMint(false);
				setstatusLoading(false);
				setInsufficientFunds(true);

			} else if (e.message.includes("User rejected the request")) {
				setstatusErrorMint(false);
				setstatusError(false);
				setstatusError(false);
				setstatusLoadingMint(false);
				setstatusLoading(false);
				//setshowErrorDiv(false);
			} else {
				//setErrorMsg1("Sorry, something went wrong");
				//setshowErrorDiv(false);				
				console.log(e);
				setstatusErrorMint(true);
				setstatusError(false);
				setstatusLoadingMint(false);
				setstatusLoading(false);
			}

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

		console.log("_associatedWalletUpdate_fnction entry : " + _associatedWallet);

		let entryData = [index, _Nonprofit, _Donation * 1e18, _Poet, _Illustrator, _Notes, _Radio1,
			meta, imageURL, walletAddress, epochTimestamp, false, false, 0, bonus, _associatedWallet,
			_collectionName, 0, false, 0, "0x1c70E21a02F0B244453Fc4702C43917f657B47d2", 0, 0, 0, 0
		]

		setstatusLoadingMint(true);
		setstatusError(false);
		setIsMinted(false);
		setstatusLoading(false);

		try {

			var res = await writeAsync({
				functionName: 'addEntry',
				args: [entryData]
			})

			var result = await publicClient.waitForTransactionReceipt(res);
			if (result.status === 'success') {
				setstatusError(false);
				setisMinted3(true);
				setstatusLoading(false);
				setIsMinted(false);
				setstatusLoadingMint(false);

				const response = await axios.patch('https://treepoets.com:3001/api/afterMintUpdate', {
					_isMinted: true,
					tokenID: Number(_totalSupply) + 1,
					index: index,
					topMint: true,
					bottomMint: false
				});

			} else {
				setisMinted3(false);
				setstatusError(true);
				setstatusLoadingMint(false);
				setstatusLoading(false);
			}

		} catch (e) {
			console.error("Transaction failed:", e);
			if (e.message.includes("Transaction with hash")) {

				setisMinted3(true);
				setstatusError(false);

				const response = await axios.patch('https://treepoets.com:3001/api/afterMintUpdate', {
					_isMinted: true,
					tokenID: Number(_totalSupply) + 1,
					index: index,
					topMint: true,
					bottomMint: false
				});

				console.log("adkiuyhsalofdjalkhfjdalskhf");
				console.log('ADD ENTRY 1');
			}
			else if (e.message.includes("err: insufficient funds for gas")) {
				//setshowErrorDiv(false);
				console.log("insufficient funds for gas");
				setstatusError(false);
				setstatusLoadingMint(false);
				setstatusLoading(false);
				setInsufficientFunds(true);
				console.log('ADD ENTRY 2');

			} else if (e.message.includes("User rejected the request")) {
				setstatusError(false);
				setstatusLoadingMint(false);
				setstatusLoading(false);
				//setshowErrorDiv(false);
				console.log('ADD ENTRY 3');
			} else {
				console.log(e);
				setstatusError(true);
				setstatusLoadingMint(false);
				setstatusLoading(false);
				console.log('ADD ENTRY 4');
			}
		}
	}

	async function addEntryAuction(index, _Nonprofit, _Donation, _Poet, _Illustrator, _Notes, _Radio1,
		meta, imageURL, walletAddress, epochTime, SubmittedTime, bonus, _associatedWallet,
		_collectionName) {

		//const epochTimestamp = Math.floor(new Date(timestamp).getTime() / 1000);

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
		//console.log("timestamp : " + timestamp);
		console.log("_associatedWallet : " + _associatedWallet);
		console.log("_collectionName : " + _collectionName);
		//console.log("SubmittedTime : " + SubmittedTime);
		console.log("epochTime : " + epochTime);
		//console.log("timestamp : " + timestamp);
		console.log("bonus : " + bonus);

		console.log("_associatedWalletUpdate_fnction entry : " + _associatedWallet);

		let entryData = [index, _Nonprofit, _Donation * 1e18, _Poet, _Illustrator, _Notes, _Radio1,
			meta, imageURL, walletAddress, epochTime, false, false, 0, bonus, _associatedWallet,
			_collectionName, 0, false, 0, "0x0000000000000000000000000000000000000000", 0, 0, 0, 0
		]

		setstatusError(false); // Clear previous response message
		setstatusLoading(true);

		try {

			let imgURL = '';

			var res = await writeAsync({
				functionName: 'addEntryAuction',
				args: [entryData]
			})

			var result = await publicClient.waitForTransactionReceipt(res);
			if (result.status === 'success') {
				setstatusError(false);
				setisAddedAu(true);
				setstatusLoading(false);

				await axios.post('https://treepoets.com:3001/api/addToAuction', {
					_isMinted: false,
					index: index,
					//nonprofit: _Nonprofit,
					nonprofit: 'NA',
					donation: 'NA',
					poet: _Poet,
					illustrator: _Illustrator,
					collection: _collectionName,
					imageUrl: imageURL,
					radio1: _Radio1,
					_isListed: true,
				})

				const response = await axios.patch('https://treepoets.com:3001/api/afterAuctionUpdate', {
					_isListed: true,
					index: index.toString() // Convert index to string before sending
				});

				await axios.post('https://treepoets.com:3001/api/_createNewMetadata', {

					ID: index,
					IMAGE: imageURL,
					NONPROFIT: 'NA',
					POET: _Poet,
					ILLUSTRATOR: _Illustrator,
					//NOTES: selectedEntry.notes,
					PROPERTYRIGHTS: _Radio1,
					COLLECTION_NAME: _collectionName,
					//ASSOCIATED_WALLET: selectedEntry.associatedWallet,
					AMOUNT_DONATE: 'NA',
					TIME: SubmittedTime
				})

			} else {
				setisAddedAu(false);
				setstatusError(true);
				setstatusLoading(false);
			}

		} catch (e) {
			console.error("Transaction failed:", e);
			if (e.message.includes("Transaction with hash")) {

				setstatusError(false);
				setisAddedAu(true);

				await axios.post('https://treepoets.com:3001/api/addToAuction', {
					_isMinted: false,
					index: index,
					//nonprofit: _Nonprofit,
					nonprofit: 'NA',
					donation: 'NA',
					poet: _Poet,
					illustrator: _Illustrator,
					collection: _collectionName,
					imageUrl: imageURL,
					radio1: _Radio1,
					_isListed: true,
				})

				const response = await axios.patch('https://treepoets.com:3001/api/afterAuctionUpdate', {
					_isListed: true,
					index: index.toString() // Convert index to string before sending
				});

				await axios.post('https://treepoets.com:3001/api/_createNewMetadata', {

					ID: index,
					IMAGE: imageURL,
					NONPROFIT: 'NA',
					POET: _Poet,
					ILLUSTRATOR: _Illustrator,
					//NOTES: selectedEntry.notes,
					PROPERTYRIGHTS: _Radio1,
					COLLECTION_NAME: _collectionName,
					//ASSOCIATED_WALLET: selectedEntry.associatedWallet,
					AMOUNT_DONATE: 'NA',
					TIME: SubmittedTime
				})

				console.log("adkiuyhsalofdjalkhfjdalskhf");
				console.log('ADD ENTRY 1');
			}
			else if (e.message.includes("err: insufficient funds for gas")) {
				//setshowErrorDiv(false);
				console.log("insufficient funds for gas");
				setstatusError(false);
				setstatusLoading(false);
				setInsufficientFunds(true);
				console.log('ADD ENTRY 2');

			} else if (e.message.includes("User rejected the request")) {
				setstatusError(false);
				setstatusLoading(false);
				//setshowErrorDiv(false);
				console.log('ADD ENTRY 3');
			} else {
				console.log(e);
				setstatusError(true);
				setstatusLoading(false);
				console.log('ADD ENTRY 4');
			}
		}
	}

	const getDataFromServer = async () => {
		const response = await axios.get('https://treepoets.com:3001/api/getallfriends');

		console.log("response :" + JSON.stringify(response.data));

		let itemDataArray = [];

		setDataLength(response.data.length);

		for (let x = 0; x < response.data.length; x++) {

			itemDataArray.push(
				response.data[x]
			)
		}

		setFetching(itemDataArray)
	};

	async function addToAuction() {

		try {
			setstatusError2(false);
			setstatusLoading2(true);

			console.log("_endTime : " + Number(_endTime));
			const endTimeVar = await convertToUnixTime(_endTime)
			console.log("sddddd_____ :" + endTimeVar);

			console.log("_indexForAuction : " + _indexForAuction);

			var res = await writeAsync({
				functionName: 'addToAuction',
				args: [_indexForAuction, endTimeVar]
			})

			var result = await publicClient.waitForTransactionReceipt(res);
			if (result.status === 'success') {
				setstatusError2(false);
				setIsMinted2(true);
				setstatusLoading2(false);

			} else {
				setIsMinted2(false);
				setstatusError2(true);
				setstatusLoading2(false);
			}


			setTimeout(() => {
				window.location.reload(true);
			}, 2000);

		} catch (e) {
			console.log(e);
			setstatusError2(true);
			setstatusLoading2(false);
		}
	}

	async function closediv() {
		setOpenEdits(-1);
		set_addAuction(0);
	}

	async function closedivNoti() {
		setResponseMessage(false);
		setOpenEdits(false);
	}

	async function closedivNoti2() {
		setstatusError(false);
		setstatusErrorMint(false);
		setInsufficientFunds(false);
		setstatusErrorAu(false);
	}

	async function closedivRe() {
		window.location.reload(true);
	}

	/*async function openEdits(index, url) {
		setOpenEdits(1);
		setSelectedIndexForUpdate(index);
		setSelectedURLForUpdate(url);
	}*/

	const openEdits = (index, metadataURL) => {
		const entry = _allEntries.find((entry) => entry.index === index);
		console.log("entry read : " + JSON.stringify(entry));

		console.log("Image url read___4 : " + entry.imageURL)
		setSelectedEntry(entry); // Set the selected entry for editing
		setOpenEdits(index); // Mark this index as open for editing
	};

	const closeEdits = () => {
		setSelectedEntry(null); // Clear the selected entry
		setOpenEdits(null); // Close the editing view
		setResponseMessage(false)
	};

	async function openAuctionAdd(index) {
		set_addAuction(1);
		set_indexForAuction(index);
	}

	const convertToUnixTime = async (dateString) => {
		console.log("dateString : " + dateString);
		// Split the date string into day, month, and year
		const [day, month, year] = dateString.split('.');

		// Create a new Date object (note: month is 0-indexed, so we subtract 1)
		const date = new Date(year, month - 1, day);

		// Get the Unix time (in seconds, so we divide by 1000)
		const unixTime = Math.floor(date.getTime() / 1000);

		return unixTime;
	};

	function convertUnixTimestampToDateString(timestamp) {
		const date = new Date(timestamp * 1000); // Convert to milliseconds
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const days = date.getDate();
		const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		const monthName = months[month - 1];
		const hours = date.getHours();
		const minutes = "0" + date.getMinutes();
		const formattedTime = hours + ':' + minutes.substr(-2);

		const now = new Date();
		const currentYear = now.getFullYear();

		let displayedYear = "";
		if (year >= currentYear) {
			displayedYear = String(year).slice(-2);
		} else {
			displayedYear = `20${currentYear % 100}`;
		}

		return `${days}-${monthName}-${displayedYear} ${formattedTime}`;
	}


	const handleFileChangeAdmin = (event) => {
		const file = event.target.files[0];
		const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
		const maxSize = 5 * 1024 * 1024; // 5MB

		if (file) {
			if (!allowedTypes.includes(file.type)) {
				alert("❌ Invalid file type. Please upload a PNG, JPG, or JPEG image.");
				return;
			}
			if (file.size > maxSize) {
				alert("❌ File size too large. Please upload an image smaller than 5MB.");
				return;
			}

			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (e) => {
				const img = new Image();
				img.src = e.target.result;
				img.onload = () => {
					const size = Math.min(img.width, img.height); // Get the smallest dimension for a square crop

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

					// Convert canvas to Data URL
					const croppedImageURL = canvas.toDataURL(file.type);

					// Update the state with the new image URL
					setSelectedEntry(prev => ({
						...prev,
						imageURL: croppedImageURL,
						fileName: file.name
					}));
				};
			};
		}
	};



	// Update donations function
	const updatedonations = async () => {
		try {

			if (selectedEntry) {
				// Store the selected entry index and current page before updating
				localStorage.setItem('selectedEntryIndex', selectedEntry.index);
				localStorage.setItem('currentPage', currentPage); // Store pagination page

				let imgURL = '';

				setResponseMessage(''); // Clear previous response message
				setstatusLoading(true); // Show loading indicator

				// Log the current selected entry details
				console.log("selectedEntry:", selectedEntry);
				set_runUseEffect(1);
				// Uncomment and send data to the server when ready
				if (selectedEntry) {
					const fileReader = new FileReader();
					//const response = await axios.patch('https://treepoets.com:3001/api/updateDonation', {
					try {

						const associatedWallet =
							selectedEntry.associatedWallet === '0x0000000000000000000000000000000000000000'
								//? _owner
								? '0x1c70E21a02F0B244453Fc4702C43917f657B47d2'
								: selectedEntry.associatedWallet;

						const payload = {
							index: selectedEntry.index,
							//imageURL: selectedEntry.imageURL,
							nonprofit: selectedEntry.nonprofit,
							donationAmount: selectedEntry.donationAmount,
							poet: selectedEntry.poet,
							illustrator: selectedEntry.illustrator,
							collectionName: selectedEntry.collectionName,
							associatedWallet: associatedWallet,
							notes: selectedEntry.notes,
							propertyRights: selectedEntry.propertyRights,
							timestamp: selectedEntry.timestamp,
							ownerwallet: selectedEntry.ownerwallet,
							bonus: selectedEntry.bonus,
							file: selectedEntry.imageURL.split(',')[1],
							fileName: selectedEntry.fileName
						};

						const response = await axios.patch('https://treepoets.com:3001/api/updateDonation', payload);
						console.log('File sent successfully.');
						console.log(response.data.message);
						setResponseMessage(response.data.message || 'Success');
						console.log("fileUrl updateDonations : " + response.data.fileUrl);

						if (response.data.fileUrl === undefined) {
							imgURL = selectedEntry.imageURL
						} else {
							imgURL = response.data.fileUrl;
						}

						await axios.post('https://treepoets.com:3001/api/_createNewMetadata', {

							ID: selectedEntry.index,
							IMAGE: imgURL,
							NONPROFIT: selectedEntry.nonprofit,
							POET: selectedEntry.poet,
							ILLUSTRATOR: selectedEntry.illustrator,
							//NOTES: selectedEntry.notes,
							PROPERTYRIGHTS: selectedEntry.propertyRights,
							COLLECTION_NAME: selectedEntry.collectionName,
							//ASSOCIATED_WALLET: selectedEntry.associatedWallet,
							AMOUNT_DONATE: selectedEntry.donationAmount,
							TIME: selectedEntry.timestamp
						})

						setAssociatedWalletUpdate(selectedEntry.associatedWallet);
						console.log("AWLT: " + selectedEntry.associatedWallet);
						await new Promise((resolve) => setTimeout(resolve, 5000));
						console.log("AWLT_state: " + _associatedWalletUpdate);
						console.log('Update successful:', response.data);
						setstatusLoading(false);
						setResponseMessage('Successfully Updated!'); // Show success message

					} catch (error) {
						console.log('Error sending file.', error);
						setResponseMessage('Error sending file.');
					} finally {
						setstatusLoading(false); // Set loading to false
					}

				} else {
					fileReader.onerror = () => {
						console.log('Error reading file.');
						setResponseMessage('Error reading file.');
						setstatusLoading(false); // Set loading to false
					};

					fileReader.readAsDataURL(selectedEntry.imageURL.split(',')[1]);

				}

			} else {
				setResponseMessage('No entry selected.');
			}

		} catch (error) {
			console.error(error);
			setResponseMessage('Error occurred.');
			setstatusLoading(false); // Stop loading on error
		}
	};

	useEffect(() => {
		const savedPage = localStorage.getItem('currentPage');

		if (savedPage) {
			const parsedPage = parseInt(savedPage);
			setCurrentPage(parsedPage); // Restore the pagination page

			// Calculate and set the correct page group
			const calculatedPageGroup = Math.ceil(parsedPage / visiblePages);
			setPageGroup(calculatedPageGroup);
		}

		const savedIndex = localStorage.getItem('selectedEntryIndex');
		if (savedIndex) {
			const entry = _allEntries.find(e => e.index === parseInt(savedIndex));
			if (entry) {
				setSelectedEntry(entry); // Restore the edited entry
			}
		}

		// Clear stored values after restoring
		localStorage.removeItem('selectedEntryIndex');
		localStorage.removeItem('currentPage');
	}, [_allEntries]);


	return (

		<div className="allWrap2">
			<div className="light2">
				<div class="headerAdmin">
					<div class="nb2">Tree Poet Minted NFTs </div>
					<div class="cnct2Div">
						{_connected ? (
							<button class="cnct2" onClick={() => disconnectWallet()}>
								{walletAddress === "" ? "Connect" : shortenAddress(walletAddress)}
							</button>
						) : (
							<button class="cnct2" onClick={() => { open(); }}>Connect</button>
						)}
						<button class="cnct2" onClick={() => window.location.href = '/'} >Home</button>
						<button class="cnct2" onClick={() => window.location.href = 'admin'} >Admin</button>
					</div>
				</div>

				{_owner == walletAddress ?
					<div className='onlyMinted'>
						{_OpenEdits >= 0 && selectedEntry ? (
							<div>

								<div className='updateT'>Update Details</div>

								<div className='mainBox'>
									<div className="step2Con">
										<div className="picAndCon">
											<div className="imageBar">
												<img id="imgPreview2" src={selectedEntry.imageURL} alt="Preview Here" />

												{loading === 1 ? (
													<div className="upload">
														<div id="block_container">
															<div className="fileBtn">
																<input
																	className="choosebtn"
																	type="file"
																	onChange={handleFileChangeAdmin}
																	name="file"
																	accept="image/png"
																	id="photo"
																	required
																/>
															</div>
														</div>
													</div>
												) : (
													<div>
														<div id="block_container">
															<div className="fileBtn">
																<input
																	className="choosebtn"
																	type="file"
																	onChange={handleFileChangeAdmin}
																	name="file"
																	accept="image/png"
																	id="photo"
																	required
																/>
															</div>
														</div>
													</div>
												)}
											</div>

											<div className='formMain--2'>
												<div>
													<div class="contentBar">
														{/* Nonprofit Field */}
														<div className="textField">
															<div><input
																id="comment"
																type="text"
																required
																placeholder="Organization to receive donation"
																value={selectedEntry.nonprofit}
																onChange={event =>
																	setSelectedEntry(prev => ({ ...prev, nonprofit: event.target.value }))
																}
															/></div>
															Nonprofit
														</div>

														{/* Donation Amount Field */}
														<div className="textField">
															<div><input
																id="comment"
																type="number"
																required
																placeholder="Starting Bid"
																value={selectedEntry.donationAmount}
																onChange={event =>
																	setSelectedEntry(prev => ({ ...prev, donationAmount: event.target.value }))
																}
															/></div>
															Donation Amount US$
														</div>
													</div>
												</div>

												<div>
													<div class="contentBar">
														{/* Poet Field */}
														<div className="textField">
															<div><input
																id="comment"
																type="text"
																required
																placeholder="Poetic Creator"
																value={selectedEntry.poet}
																onChange={event =>
																	setSelectedEntry(prev => ({ ...prev, poet: event.target.value }))
																}
															/></div>
															Poet
														</div>

														{/* Illustrator Field */}
														<div className="textField">
															<div><input
																id="comment"
																type="text"
																required
																placeholder="Illustrative Creator"
																value={selectedEntry.illustrator}
																onChange={event =>
																	setSelectedEntry(prev => ({ ...prev, illustrator: event.target.value }))
																}
															/></div>
															Illustrator
														</div>
													</div>
												</div>

												{/* Notes Field */}

												<div id="noteField" className="textField">
													<input
														id="comment2"
														type="text"
														required
														placeholder="Description about creation or whatever’s clever"
														value={selectedEntry.notes}
														onChange={event =>
															setSelectedEntry(prev => ({ ...prev, notes: event.target.value }))
														}
													/>
													Notes
												</div>

											</div>

										</div>
									</div>
									<p></p>
									<div className='belowFields'>
										<div>
											<div class="contentBar">
												{/*<div className="textField">
													<input
														id="comment2"
														type="text"
														required
														placeholder="IP"
														value={selectedEntry.propertyRights}
														onChange={event =>
															setSelectedEntry(prev => ({ ...prev, propertyRights: event.target.value }))
														}
													/>
													IP
												</div>*/}

												<div className="textField">
													<select
														id="comment2"
														required
														value={selectedEntry.propertyRights}
														onChange={event =>
															setSelectedEntry(prev => ({ ...prev, propertyRights: event.target.value }))
														}
													>
														<option value="" disabled>
															Select property rights
														</option>
														<option value="None">
															No Intellectual Property rights are transferred
														</option>
														<option value="Poetry">
															Poetry
														</option>
														<option value="Illustration">
															Illustration
														</option>
														<option value="Art (Both)">
															Art (Both)
														</option>
													</select>
													IP
												</div>

												{/*<div className="textField">
													<input
														id="comment2"
														type="text"
														required
														placeholder="Bonus"
														value={selectedEntry.timestamp}
														onChange={event =>
															setSelectedEntry(prev => ({ ...prev, timestamp: event.target.value }))
														}
													/>
													Timestamp
												</div>*/}

												{/* Collection Name Field */}
												<div className="textField">
													<div><input
														id="comment2"
														type="text"
														required
														placeholder="Collection Name"
														value={selectedEntry.collectionName}
														onChange={event =>
															setSelectedEntry(prev => ({ ...prev, collectionName: event.target.value }))
														}
													/></div>
													Collection Name
												</div>
											</div>
										</div>

										<div>
											<div class="contentBar">
												{/* Donor Wallet Field */}
												<div className="textField">
													<input
														id="comment2"
														type="text"
														required
														placeholder="0x"
														value={selectedEntry.associatedWallet}
														maxLength={42}
														onChange={event => {
															let input = event.target.value;

															// Remove any extra '0x' if it exists at the beginning
															if (input.startsWith("0x")) {
																input = input.slice(2);
															}

															// Prepend '0x' if it's not already there
															if (input.length > 0) {
																input = "0x" + input;
															}

															// Only allow input up to 42 characters with '0x' prefix
															if (input.length <= 42) {
																setSelectedEntry(prev => ({ ...prev, associatedWallet: input }));
															}
														}}
													/>
													Donor Wallet
												</div>

												<div className="textField">
													<input
														id="comment2"
														type="text"
														required
														placeholder="0x"
														value={selectedEntry.ownerwallet}
														maxLength={42}
														onChange={event => {
															let input = event.target.value;

															// Remove any extra '0x' if it exists at the beginning
															if (input.startsWith("0x")) {
																input = input.slice(2);
															}

															// Prepend '0x' if it's not already there
															if (input.length > 0) {
																input = "0x" + input;
															}

															// Only allow input up to 42 characters with '0x' prefix
															if (input.length <= 42) {
																setSelectedEntry(prev => ({ ...prev, ownerwallet: input }));
															}
														}}
													/>
													Creator wallet
												</div>

												<div className="textField--2">
													<input
														id="comment2"
														type="number"
														required
														placeholder="1"
														value={selectedEntry.bonus}
														onChange={event =>
															setSelectedEntry(prev => ({ ...prev, bonus: event.target.value }))
														}
													/>
													Bonus
												</div>
											</div>
										</div>


										<div>
											<div className='timeShow'>


												<div>
													<label>
														<select value={year} onChange={(e) => setYear(Number(e.target.value))}>
															{Array.from({ length: 100 }, (_, i) => 2025 - i).map((y) => (
																<option key={y} value={y}>
																	{y}
																</option>
															))}
														</select>
													</label>
													<div className='colortxt'>Y:</div>

												</div>


												<div>
													<label>
														<select id="widthInput" value={month} onChange={(e) => setMonth(e.target.value)}>
															{[
																"January",
																"February",
																"March",
																"April",
																"May",
																"June",
																"July",
																"August",
																"September",
																"October",
																"November",
																"December",
															].map((m) => (
																<option key={m} value={m}>
																	{m}
																</option>
															))}
														</select>
													</label>
													<div className='colortxt'>Month:</div>

												</div>

												<div className="hidden-day">
													<label>

														<select id="widthInput" value={day} onChange={(e) => setDay(e.target.value)}>
															{["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((d) => (
																<option key={d} value={d}>
																	{d}
																</option>
															))}
														</select>

													</label>
													<div className='colortxt'>Day:</div>

												</div>


												<div>
													<label>
														<select value={date} onChange={(e) => setDate(Number(e.target.value))}>
															{Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
																<option key={d} value={d}>
																	{d}
																</option>
															))}
														</select>
													</label>
													<div className='colortxt'>Date:</div>

												</div>


												<div>
													<label>
														<select value={hour} onChange={(e) => setHour(Number(e.target.value))}>
															{Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
																<option key={h} value={h}>
																	{h}
																</option>
															))}
														</select>
													</label>
													<div className='colortxt'>H:</div>

												</div>

												<div>
													<label>
														<select value={minute} onChange={(e) => setMinute(Number(e.target.value))}>
															{Array.from({ length: 60 }, (_, i) => i).map((m) => (
																<option key={m} value={m}>
																	{m.toString().padStart(2, "0")}
																</option>
															))}
														</select>
													</label>
													<div className='colortxt'>M:</div>

												</div>

												<div>
													<label>
														<select value={second} onChange={(e) => setSecond(Number(e.target.value))}>
															{Array.from({ length: 60 }, (_, i) => i).map((s) => (
																<option key={s} value={s}>
																	{s.toString().padStart(2, "0")}
																</option>
															))}
														</select>
													</label>
													<div className='colortxt'>S:</div>

												</div>

												<div>
													<label>
														<select value={period} onChange={(e) => setPeriod(e.target.value)}>
															<option value="AM">AM</option>
															<option value="PM">PM</option>
														</select>
													</label>
												</div>

											</div>

										</div>
									</div>
								</div>

								<button className='update-3' onClick={() => updatedonations()}>Update</button>
								<div className='backLink' onClick={closeEdits}>Back</div>

								{statusError2 && (
									<div class="errorMessage">
										<img className='gif2' src={warning} />
										<p></p>
										<div>Sorry, something went wrong</div>
									</div>
								)}

								{statusLoading2 && (
									<div class="loadingContainer">
										<div class="loadingText">Updating</div>
									</div>
								)}

								{isMinted2 && (
									<div>
										<img className='gif2' src={checked} />
										<p></p>
										<div class="successfully">Successfully Updated!</div>
									</div>
								)}
							</div>

						) :
							(<div className="slider-container">
								{filteredEntries
									.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
									.map((allEntries, index) => (

										<div key={index}>
											<div class="step2Con">
												<div class="picAndConMain">
													<div class="imageBar">

														<img id="imgPreview2" src={allEntries.imageURL} alt="Preview Here" />

														<button className='downloadImg'
															onClick={() => {
																const link = document.createElement('a'); // Create an anchor element
																link.href = allEntries.imageURL; // Set the image URL as the href
																link.download = allEntries.imageURL.split('/').pop(); // Use the image's name from the URL for the downloaded file
																link.target = '_blank'; // Optional: To avoid interference with current tab behavior

																document.body.appendChild(link); // Append the anchor to the document
																link.click(); // Programmatically click the link to start thes download
																document.body.removeChild(link); // Clean up by removing the element after the download
															}}
														>
															Download Image
														</button>
													</div>

													<div className='formMain--2-2'>

														<div>
															<div class="contentBar">

																<div class="textField">
																	<div>
																		<input type="text" required id="comment" value={allEntries.nonprofit}></input></div>
																	Nonprofit
																</div>
																<div class="textField">
																	<div><input type="number" required id="comment" value={allEntries.donationAmount}></input></div>
																	Donation Amount US$
																</div>
															</div>
														</div>

														<div>
															<div class="contentBar">

																<div class="textField">
																	<div><input type="text" required id="comment" value={allEntries.poet}></input></div>
																	Poet
																</div>
																<div class="textField">
																	<div><input type="text" required id="comment" value={allEntries.illustrator}></input></div>
																	Illustrator
																</div>
															</div>
														</div>


														{/*<div class="textField">
															<div><input type="text" required id="comment2" placeholder="Time" value={allEntries.timestamp}></input></div>
															Timestamp
														</div>*/}

														<div className="textField">
															<div><input id="comment2" type="text" required value={allEntries.timestamp.replace(/^[^,]+, /, '')} readOnly />
																Timestamp</div>
														</div>


														{allEntries.collectionName !== "" &&
															<div class="textField">
																<div><input type="text" required id="comment2" placeholder="" value={allEntries.collectionName}></input></div>
																Collection Name
															</div>}

														<div>
															{allEntries.creatorWallet !== "0x0000000000000000000000000000000000000000" &&
																<div class="textField">
																	<div><input type="text" required id="comment2" placeholder="0x" value={allEntries.ownerwallet}></input></div>
																	Creator Wallet
																</div>}


															{allEntries.associatedWallet !== "0x0000000000000000000000000000000000000000" &&
																<div class="textField">
																	<div><input type="text" required id="comment2" placeholder="0x" value={allEntries.associatedWallet}></input></div>
																	Donor Wallet
																</div>}

															<div class="textField">
																<div><textarea type="text" required id="comment2" value={allEntries.notes}></textarea></div>
																Notes
															</div>
														</div>


													</div>

												</div>

												<div class="descriptionMain2">

													<div class="agreeBtn-2">
														<div id="columnNon">
															<div class="agree"><span id='pr'>Bonus: </span></div>
															<div class="agree"> {allEntries.bonus || "No NFTs"}</div>
														</div>
													</div>
													<div class="agreeBtn-2">
														<div id="columnNon">
															<div class="agree"><span id='pr'>IP: </span></div>
															<div class="agree">{allEntries.propertyRights}</div>
														</div>
													</div>
													<div class="agreeBtn-2">
														<div id="columnNon">
															<div class="agree"><span id='pr'>Metadata: </span></div>

															<a id="changeC" class="agree" href={allEntries.metadataURL} target="_blank" rel="noopener noreferrer">
																{allEntries.metadataURL.slice(0, 12) + "..." + allEntries.metadataURL.slice(-6)}
															</a>
														</div>
														<button className='setNew' onClick={() => setMetadataURI(allEntries.metadataURL, allEntries.tokenID)}>Set BaseURI</button>

													</div>
													<input style={{ display: 'none' }} type="text" required id="comment2" placeholder="" value={allEntries.ownerwallet}></input>
													<div className='flexBtnsAdmin'>
														{/*<div class="agreeBtn-2">
														{allEntries.isMinted ? (
															<div id="columnNon">
																<div class="agree"><span id='pr'>Status: </span></div>
																<div class="agree">Token ID: {allEntries.tokenID} <span className='green'>Minted ✔</span></div>
															</div>
														) : (

															<>
																{_connected ?
																	<button className='mint'
																		onClick={() => {
																			if (allEntries.nonprofit === "" || allEntries.donationAmount === "" || allEntries.poet === "" || allEntries.illustrator === "" || allEntries.nonprofit === "" || allEntries.collectionName === "" || allEntries.associatedWallet === "0x0000000000000000000000000000000000000000") {
																				// Show notification if collectionName is empty or associatedWallet is the default empty address
																				setShowPopup(true);
																			} else {
																				addEntry(allEntries.index, allEntries.nonprofit, allEntries.donationAmount, allEntries.poet, allEntries.illustrator, allEntries.notes, allEntries.propertyRights,
																					allEntries.metadataURL, allEntries.imageURL, allEntries.ownerwallet, allEntries.timestamp, allEntries.bonus, allEntries.associatedWallet,
																					allEntries.collectionName);
																			}
																		}}
																	>
																		MINT
																	</button> : null}
															</>
														)}
													</div>*/}

														<img onClick={() => openEdits(allEntries.index, allEntries.metadataURL)} className='deleteBtn' src={edit} />

														<img onClick={() => burn(allEntries.tokenID, allEntries.index)} className='deleteBtn' src={deleteBtn} />

													</div>
												</div>
											</div>
											{/* Pagination Controls */}
											<div className="pagination">
												<button onClick={handlePrevGroup} disabled={pageGroup === 1}>&lt;</button>

												{pages.map((page) => (
													<button
														key={page}
														onClick={() => handlePageChange(page)}
														className={currentPage === page ? "activePage" : ""}
													>
														{page}
													</button>
												))}

												<button onClick={handleNextGroup} disabled={endPage >= totalPages}>&gt;</button>
											</div>
										</div>
									))}
							</div>)}
					</div> : null}

				{showPopup && (
					<div class="popup-containerMain">
						<div class="popup-container">
							<div class="popup loading">
								<div className="close" onClick={() => setShowPopup(false)}>✖</div>
								<img className='gif2' src={list} />
								<p></p>
								<p className='responseSuccess'>Please update the missing fields</p>
							</div>
						</div>
					</div>
				)}

				{statusLoading ?
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
							<div class="popup loading">
								<div className="close" onClick={closedivNoti2}>✖</div>
								<img className='gif2' src={warning} />
								<p></p>
								<div className='review2'>An error occurred while processing your request. Please try again</div>
							</div>
						</div>
					</div> : null}

				{statusErrorMint ?
					<div class="popup-containerMain">
						<div class="popup-container">
							<div class="popup loading">
								<div className="close" onClick={closedivNoti2}>✖</div>
								<p></p>
								<div className='review2'>An error occurred while processing your request. Please try again.</div>
								<p></p>
								<button className='mintBtnSub' onClick={() => {
									onMint(Number(_totalSupply) + 1);
								}}>Mint</button>
							</div>
						</div>
					</div> : null}

				{isMinted ?
					<div class="popup-containerMain">
						<div class="popup-container">
							<div class="popup loading">
								<p className='responseSuccess'>Data entered successfully</p>
								<button className='mintBtnSub' onClick={() => {
									onMint(Number(_totalSupply) + 1);
								}}>Mint</button>
							</div>
						</div>
					</div> : null}

				{isListedAu ?
					<div class="popup-containerMain">
						<div class="popup-container">
							<div class="popup loading">
								<p className='responseSuccess'>Data entered successfully</p>
								<button className='mintBtnSub' onClick={() => {
									addToAuctionFB(allEntries.isMinted, allEntries.index, allEntries.nonprofit, allEntries.poet, allEntries.illustrator, allEntries.collectionName, allEntries.imageURL, allEntries.propertyRights);
								}}>Add to Auction</button>
							</div>
						</div>
					</div> : null}

				{statusLoadingMint ?
					<div class="popup-containerMain">
						<div class="popup-container">
							<div class="popup loading">
								<div class="loader"></div>
								<p>Minting...</p>
							</div>
						</div>
					</div> : null}

				{isMinted3 ?
					<div class="popup-containerMain">
						<div class="popup-container">
							<div class="popup success">
								<div className="close" onClick={closedivRe}>✖</div>
								<p className='responseSuccess'>Minting Successful!</p>
								<div className='review'>Congratulations on your successful minting!</div>
								<p></p>
								<p className='backLink2' onClick={closedivRe}>Proceed</p>

							</div>
						</div>
					</div> : null
				}

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

				{isAddedAu ?
					<div class="popup-containerMain">
						<div class="popup-container">
							<div class="popup success">
								<div className="close" onClick={closedivRe}>✖</div>
								<img className='gif2' src={checked} />
								<p></p>
								<div className='responseSuccess'>Auction added successfully!</div>
							</div>
						</div>
					</div> : null}

				{baseUriStatus ?
					<div class="popup-containerMain">
						<div class="popup-container">
							<div class="popup success">
								<div className="close" onClick={closedivRe}>✖</div>
								<img className='gif2' src={checked} />
								<p></p>
								<div className='responseSuccess'>BaseURI added successfully!</div>
							</div>
						</div>
					</div> : null}

				{_burnStatus ?
					<div class="popup-containerMain">
						<div class="popup-container">
							<div class="popup success">
								<div className="close" onClick={closedivRe}>✖</div>
								<img className='gif2' src={checked} />
								<p></p>
								<div className='responseSuccess'>Burnt successfully!</div>
							</div>
						</div>
					</div> : null}

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
										<div className="close" onClick={closedivRe}>✖</div>
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
		</div>

	)

}
export default MintedNFTs;