import React, { useEffect } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import HomePage from './Components/HomePage';
import styles from './Components/ComponentCss/HomePage.module.css';
import MainButton from './Components/UI/MainButton';
import { ConnectButton } from '@suiet/wallet-kit';
import './overrideSuiButton.css';

function App() {
  const { unityProvider, requestFullscreen } = useUnityContext({
    loaderUrl: '/Build/Gamev1.loader.js',
    dataUrl: '/Build/Gamev1.data',
    frameworkUrl: '/Build/Gamev1.framework.js',
    codeUrl: '/Build/Gamev1.wasm',
  });

  const requestFullScr = () => {
    requestFullscreen(false);
  };

  const handleWalletConnect = (data) => {
    const unityInstance = window.UnityLoader.getInstance();
    unityInstance.SendMessage('WalletConnectivity', 'WalletConnected', true);
  };

  return (
    <div className={styles.backgroundContainer}>
      <h1 className={styles.homePageTitle}> Abyss Seekers </h1>
      <div className={styles.gameContainer}>
        {' '}
        <Unity
          unityProvider={unityProvider}
          style={{ width: 1280, height: 720 }}
        />
      </div>
      <div className={styles.buttonMenu}>
        <MainButton onClick={requestFullScr}>Fullscreen</MainButton>
        <ConnectButton onConnectSuccess={handleWalletConnect}>
          Connect your wallet{' '}
        </ConnectButton>
      </div>
    </div>
  );
}

export default App;
