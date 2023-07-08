import React, { useState, useEffect } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import HomePage from './Components/HomePage';
import styles from './Components/ComponentCss/HomePage.module.css';
import MainButton from './Components/UI/MainButton';
import { ConnectButton } from '@suiet/wallet-kit';
import './overrideSuiButton.css';
import detectEthereumProvider from '@metamask/detect-provider';

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

  const [hasProvider, setHasProvider] = useState();
  const [walletLengthValue, setWalletLength] = useState(0);
  const initialState = { accounts: [] }; /* New */
  const [wallet, setWallet] = useState(initialState); /* New */

  const [isConnecting, setIsConnecting] = useState(false); /* New */
  const [error, setError] = useState(false); /* New */
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const refreshAccounts = (accounts) => {
      if (accounts.length > 0) {
        updateWallet(accounts);
      } else {
        // if length 0, user is disconnected
        setWallet(initialState);
      }
    };

    const refreshChain = (chainId) => {
      setWallet((wallet) => ({ ...wallet, chainId }));
    };

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));

      if (provider) {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });
        refreshAccounts(accounts);
        window.ethereum.on('accountsChanged', refreshAccounts);
        window.ethereum.on('chainChanged', refreshChain);
      }
    };

    getProvider();

    return () => {
      window.ethereum?.removeListener('accountsChanged', refreshAccounts);
      window.ethereum?.removeListener('chainChanged', refreshChain);
    };
  }, []);

  const updateWallet = async (accounts) => {
    const chainId = await window.ethereum.request({
      method: 'eth_chainId',
    });
    setWallet({ accounts, chainId });
  };

  const handleConnect = async () => {
    /* Updated */
    setIsConnecting(true); /* New */
    await window.ethereum
      .request({
        /* Updated */ method: 'eth_requestAccounts',
      })
      .then((accounts) => {
        /* New */
        setError(false); /* New */
        updateWallet(accounts); /* New */
      }) /* New */
      .catch((err) => {
        /* New */
        setError(true); /* New */
        setErrorMessage(err.message); /* New */
      }); /* New */
    setIsConnecting(false); /* New */
  };

  useEffect(() => {
    console.log(wallet.accounts.length);
    if (wallet.accounts.length == 0) {
      handleWalletDisconnect();
    } else {
      handleWalletConnect();
    }
  }, [wallet.accounts.length]);

  const disableConnect = Boolean(wallet) && isConnecting;

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
            experience. Controls: WASD to move.
          </p>
        </div>
      </div>
      {isLoaded && (
        <div className={styles.buttonMenu}>
          {hasProvider && wallet.accounts.length == 0 && (
            <MainButton onClick={handleConnect}>Connect MetaMask</MainButton>
          )}
          {hasProvider && wallet.accounts.length != 0 && (
            <MainButton>Wallet Connected</MainButton>
          )}
          {error /* New code block */ && (
            <div onClick={() => setError(false)}>
              <strong>Error:</strong> {errorMessage}
            </div>
          )}
          <MainButton onClick={requestFullScr}>Fullscreen</MainButton>
        </div>
      )}
    </div>
  );
}

export default App;
