import React, { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import HomePage from "./Components/HomePage";
import styles from "./Components/ComponentCss/HomePage.module.css";
import MainButton from "./Components/UI/MainButton";
import { ConnectButton } from "@suiet/wallet-kit";
import "./overrideSuiButton.css";
import "./mainPage.css";

function App() {
  const { unityProvider, requestFullscreen, sendMessage } = useUnityContext({
    loaderUrl: "/Build/Gamev02.loader.js",
    dataUrl: "/Build/Gamev02.data",
    frameworkUrl: "/Build/Gamev02.framework.js",
    codeUrl: "/Build/Gamev02.wasm",
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
      <div class="headerContainer">
        <h1 style={{ color: "white" }}> Aura Tale </h1>
      </div>

      <div class="gameContainer">
        {" "}
        <Unity
          unityProvider={unityProvider}
          style={{ width: 1280, height: 720 }}
        />
      </div>
      <div className="buttonMenu">
        <ConnectButton
          onConnectSuccess={handleWalletConnect}
          onDisconnectSuccess={handleWalletDisconnect}
        >
          Connect your wallet{" "}
        </ConnectButton>
        <MainButton onClick={requestFullScr}>Fullscreen</MainButton>
      </div>
    </div>
  );
}

export default App;
