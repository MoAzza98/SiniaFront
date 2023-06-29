import React, { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import HomePage from "./Components/HomePage";
import styles from "./Components/ComponentCss/HomePage.module.css";
import MainButton from "./Components/UI/MainButton";
import { ConnectButton } from "@suiet/wallet-kit";
import "./overrideSuiButton.css";

function App() {
  const { unityProvider, requestFullscreen } = useUnityContext({
    loaderUrl: "Build/Gamev2.loader",
    dataUrl: "Build/Gamev2.data",
    frameworkUrl: "Build/Gamev2.framework",
    codeUrl: "Build/Gamev2.wasm",
  });

  const requestFullScr = () => {
    requestFullscreen(true);
  };

  const handleWalletConnect = (data) => {
    const unityInstance = window.UnityLoader.getInstance();
    unityInstance.SendMessage(
      "MyGameObject",
      "WalletConnected",
      true
    );
  };



  return (
    <div className={styles.backgroundContainer}>
      <h1 className={styles.homePageTitle}> Abyss Seekers </h1>
      <div className={styles.gameContainer}>
        {" "}
        <Unity
          unityProvider={unityProvider}
          style={{ width: 800, height: 600 }}
        />
      </div>
      <div className={styles.buttonMenu}>
        <MainButton onClick={requestFullScr}>Fullscreen</MainButton>
        <ConnectButton onConnectSuccess={handleWalletConnect}>
          Connect your wallet{" "}
        </ConnectButton>
      </div>
    </div>
  );
}

export default App;
