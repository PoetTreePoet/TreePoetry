import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, optimism } from 'wagmi/chains';

const chains = [mainnet, optimism];
const projectId = '1ee662092220d9e279a243cd7270bbae';

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <WagmiConfig config={wagmiConfig}>
            <App />
        </WagmiConfig>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient}></Web3Modal>
    </React.StrictMode>
);

reportWebVitals();