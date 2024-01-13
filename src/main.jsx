import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import { Home } from '@/components/tileView/home.jsx';
import { LoginProvider } from './LoginContext';
import { LOG, LoggerProvider } from '@/components/providers/LoggerContext.jsx';

import BountyList from './components/bountyList';

import MyIsland from './components/myIsland';
import { ClaimIsland } from './components/tileView/claimIsland';

import Island from './components/island';
import PublishPost from './components/publishPost';
import ModifyTier from './components/modifyTier';
import { About } from '@/components/tileView/about';
import FundList from './components/fundList';

import CreateFund from './components/addFundraiser';
import BuryTreasure from './components/buryTreasure';
import Test from './components/simulatorTest';
import { PageHeader } from '@/components/tileView/header/PageHeader.jsx';
import { ThemeProvider } from '@/components/providers/ThemeContext.jsx';

import './polyfills';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import RevenueShare from './components/revenueShare';
import COCOLotto from './components/cocoLotto';
import { TileGrid } from '@/components/tileView/tileGrid.jsx';
import { TileProvider } from '@/components/providers/TileContext.jsx';

const { chains, provider } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey: 'EMDm4apXsi2nDwfYW5C9_OI1xUI81YG-' }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Private Islands',
  projectId: '2b3da2ac8bbb9474e8580033fecfeb75',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const loggingThreshold = import.meta.env.VITE_LOGGING_THRESHOLD;
console.log('VITE LOG THRESHOLD', loggingThreshold);

createRoot(document.getElementById('root')).render(
  <LoginProvider>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <ThemeProvider>
          <LoggerProvider loggingThreshold={LOG[loggingThreshold] ?? LOG.OFF}>
            <HashRouter>
              <TileProvider>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/pi" element={<App />}>
                    <Route path="/pi/tiles" element={<TileGrid />} />
                    <Route path="/pi/about" element={<About />} />
                    <Route path="/pi/lotto" element={<COCOLotto />} />
                    <Route path="/pi/migration" element={<RevenueShare />} />
                    <Route path="/pi/island/:island" element={<Island />} />

                    <Route path="/pi/test" element={<Test />} />
                    <Route path="smokesignals" element={<FundList />} />
                    <Route path="treasure" element={<BountyList />} />
                    <Route
                      path="/pi/newsignal/:island/:index"
                      element={<CreateFund />}
                    />
                    <Route
                      path="/pi/burytreasure/:island/:index"
                      element={<BuryTreasure />}
                    />

                    <Route path="myisland" element={<MyIsland />} />
                    <Route path="claimisland" element={<ClaimIsland />} />
                    <Route path="archipelago" element={<TileGrid />} />
                    <Route
                      path="/pi/island/:island/compose"
                      element={<PublishPost />}
                    />
                    <Route
                      path="/pi/island/:island/modifytier/:tier"
                      element={<ModifyTier />}
                    />
                  </Route>
                </Routes>
              </TileProvider>
            </HashRouter>
          </LoggerProvider>
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </LoginProvider>
);
