import React from "react";
import Tokenlaunchpad from "./components/Tokenlaunchpad";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

const App = () => {

    

  return (
    <div className="bg-[#b9b6a3] h-screen w-screen">
      <div className="h-[100%] justify-center justify-items-center text-center">
        <div className="bg-[#e1e1e1] h-[80%] w-[80%] justify-center rounded-xl">
          <ConnectionProvider endpoint="https://api.devnet.solana.com">
            <WalletProvider wallets={[]} autoConnect>
              <WalletModalProvider>
                <div className="flex flex-row justify-between">
                  <WalletMultiButton />
                  <WalletDisconnectButton />
                </div>

                <Tokenlaunchpad />
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </div>
      </div>
    </div>
  );
};

export default App;
