import React, { useEffect } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import HomePage from './Components/HomePage';
import styles from './Components/ComponentCss/HomePage.module.css';
import MainButton from './Components/UI/MainButton';
import { ConnectButton } from '@suiet/wallet-kit';
import './overrideSuiButton.css';

function App() {

  document.title = "Sinia Tale";

  const { unityProvider, requestFullscreen, sendMessage, isLoaded } =
    useUnityContext({
      loaderUrl: '/Build/Gamev02.loader.js',
      dataUrl: '/Build/Gamev02.data',
      frameworkUrl: '/Build/Gamev02.framework.js',
      codeUrl: '/Build/Gamev02.wasm',
    });

  const requestFullScr = () => {
    requestFullscreen(true);
  };

  const handleWalletConnect = (data) => {
   
    sendMessage("WalletConnectivity", "WalletConnected");
  };

  const handleWalletDisconnect = (data) => {

    sendMessage("WalletConnectivity", "WalletDisconnected");
  };

  return (
    <div>
      <h1> Aura Tale </h1>
      <div className={styles.gameContainer}>
        {' '}
        <Unity
          unityProvider={unityProvider}
          style={{
            visibility: isLoaded ? 'visible' : 'hidden',
            width: 1280,
            height: 720,
          }}
        />
      </div>
      {isLoaded && (
        <div className={styles.buttonMenu}>
          <MainButton onClick={requestFullScr}>Fullscreen</MainButton>
          <ConnectButton
            onConnectSuccess={handleWalletConnect}
            onDisconnectSuccess={handleWalletDisconnect}
          >
            Connect your wallet{' '}
          </ConnectButton>
        </div>
      )}
    </div>
  );
}

export default App;
