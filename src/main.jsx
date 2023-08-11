import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import { LoginProvider } from './LoginContext';
import { LOG, LoggerProvider } from '@/components/providers/LoggerContext.jsx';
import OAO from './components/oao';
import CEO from './components/ceo';
import BountyList from './components/bountyList';
import Treasure from './components/treasure';
import MyIsland from './components/myIsland';
import ClaimIsland from './components/claimIsland';
import IslandList from './components/islandList';
import Island from './components/island';
import PublishPost from './components/publishPost';
import ModifyTier from './components/modifyTier';
import About from './components/about';
import FundList from './components/fundList';
import Fundraiser from './components/fundraiser';
import CreateFund from './components/addFundraiser';
import BuryTreasure from './components/buryTreasure';
import Test from './components/simulatorTest';
import { PageHeader } from '@/components/header/PageHeader.jsx';

import './polyfills';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import RevenueShare from './components/revenueShare';

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
      <RainbowKitProvider chains={chains}>
        <LoggerProvider loggingThreshold={LOG[loggingThreshold] ?? LOG.OFF}>
          <HashRouter>
            <PageHeader />
            <Routes>
              <Route path="/" element={<App />}>
                <Route path="/about" element={<About />} />
                <Route path="/revenueshare" element={<RevenueShare />} />
                <Route path="/island/:island" element={<Island />} />
                <Route
                  path="/island/:island/smokesignal/:index"
                  element={<Fundraiser />}
                />
                <Route
                  path="/island/:island/treasure/:index"
                  element={<Treasure />}
                />
                <Route path="/test" element={<Test />} />
                <Route path="smokesignals" element={<FundList />} />
                <Route path="treasure" element={<BountyList />} />
                <Route
                  path="/newsignal/:island/:index"
                  element={<CreateFund />}
                />
                <Route
                  path="/burytreasure/:island/:index"
                  element={<BuryTreasure />}
                />
                <Route path="/oao" element={<OAO />} />
                <Route path="/ceo" element={<CEO />} />
                <Route path="myisland" element={<MyIsland />} />
                <Route path="claimisland" element={<ClaimIsland />} />
                <Route path="archipelago" element={<IslandList />} />
                <Route
                  path="/island/:island/compose"
                  element={<PublishPost />}
                />
                <Route
                  path="/island/:island/modifytier/:tier"
                  element={<ModifyTier />}
                />
              </Route>
            </Routes>
          </HashRouter>
        </LoggerProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </LoginProvider>
);
