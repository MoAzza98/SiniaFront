import React, { useEffect } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import HomePage from './Components/HomePage';
import styles from './Components/ComponentCss/HomePage.module.css';
import MainButton from './Components/UI/MainButton';
import { ConnectButton } from '@suiet/wallet-kit';
import './overrideSuiButton.css';

function App() {
  const { unityProvider, requestFullscreen, sendMessage } = useUnityContext({
    loaderUrl: '/Build/Gamev01.loader.js',
    dataUrl: '/Build/Gamev01.data',
    frameworkUrl: '/Build/Gamev01.framework.js',
    codeUrl: '/Build/Gamev01.wasm',
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
    <div className={styles.backgroundContainer}>
      <h1 className={styles.homePageTitle}> Aura Tale </h1>
      <div className={styles.gameContainer}>
        {' '}
        <Unity
          unityProvider={unityProvider}
          style={{ width: 1280, height: 720 }}
        />
      </div>
      <div className={styles.buttonMenu}>
        <MainButton onClick={requestFullScr}>Fullscreen</MainButton>
        <ConnectButton
          onConnectSuccess={handleWalletConnect}
          onDisconnectSuccess={handleWalletDisconnect}
        >
          Connect your wallet{' '}
        </ConnectButton>
      </div>
    </div>
  );
}

export default App;
