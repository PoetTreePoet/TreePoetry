import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from "./Pages/Home";
import Admin from "../src/Pages/admin";
import MintedNFTs from './Pages/mintedNFTs';
 
function App() {

	return (
		<div>
			<BrowserRouter>
				<Routes>

					<Route path='/' element={<Home />} />
					<Route path='admin' element={<Admin />} />
					<Route path='minted-nfts' element={<MintedNFTs />} />

				</Routes>
			</BrowserRouter>

		</div>

	)
}

export default App;
