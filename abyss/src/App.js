import React, { useEffect } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import HomePage from './Components/HomePage';
import styles from './Components/ComponentCss/HomePage.module.css';
import MainButton from './Components/UI/MainButton';
import { ConnectButton } from '@suiet/wallet-kit';
import './overrideSuiButton.css';

function App() {
  document.title = 'Sinia Tale';

  const {
    unityProvider,
    requestFullscreen,
    sendMessage,
    isLoaded,
    loadingProgression,
  } = useUnityContext({
    loaderUrl: '/Build/Gamev02.loader.js',
    dataUrl: '/Build/Gamev02.data',
    frameworkUrl: '/Build/Gamev02.framework.js',
    codeUrl: '/Build/Gamev02.wasm',
  });

  const requestFullScr = () => {
    requestFullscreen(true);
  };

  const handleWalletConnect = (data) => {
    sendMessage('WalletConnectivity', 'WalletConnected');
  };

  const handleWalletDisconnect = (data) => {
    sendMessage('WalletConnectivity', 'WalletDisconnected');
  };

  return (
    <div>
      <div className={styles.siteText}>
        <h1> Sinia Tale </h1>
      </div>
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
        <div className={styles.siteText}>
          {isLoaded && <p>Loaded {Math.round(loadingProgression * 100)}%</p>}
          {!isLoaded && (
            <p>Loading {Math.round(loadingProgression * 100)}%...</p>
          )}
          <p>
            It is recommended to play in fullscreen mode for the best possible
            experience.
          </p>
        </div>
      </div>
      {isLoaded && (
        <div className={styles.buttonMenu}>
          <ConnectButton
            onConnectSuccess={handleWalletConnect}
            onDisconnectSuccess={handleWalletDisconnect}
          >
            Connect your wallet{' '}
          </ConnectButton>
          <MainButton onClick={requestFullScr}>Fullscreen</MainButton>
          
        </div>
      )}
    </div>
  );
}

export default App;
