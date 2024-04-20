import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navigation } from '../components/Navigation'
import { CryptoProvider } from '../context/CryptoContext.jsx'
import { TrendingProvider } from '../context/TrendingContext.jsx'
import { StorageProvider } from '../context/StorageContext.jsx'
import { DappProvider } from "@multiversx/sdk-dapp/wrappers"
import { ENVIRONMENT, walletConnectV2ProjectId } from '../config'

const Home = () => {

  return (
    <CryptoProvider>
      <TrendingProvider>
        <StorageProvider>
          <DappProvider
            environment={ENVIRONMENT}
            customNetworkConfig={{
              name: "customConfig",
              walletConnectV2ProjectId
            }}
          >
              <main className='w-full h-full flex flex-col first-letter:
                  content-center items-center relative text-black font-nunito
              '>
                  <div className='w-screen h-screen bg-gray-300 fixed -z-10'></div>
                  <Navigation />
                  <Outlet />
              </main>
          </DappProvider>
        </StorageProvider>
      </TrendingProvider>
    </CryptoProvider>
  );
}

export default Home