import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import type { AppProps } from "next/app";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chains, wagmiConfig } from "@/lib/wallets";
import { WagmiConfig } from "wagmi";
import Topbar from "@/components/Topbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <div className="flex min-h-screen w-full overflow-hidden">
          <div className="relative w-full flex-1 bg-light">
            <Topbar />
            <main className="m-auto h-full w-full overflow-auto bg-grandient-main flex flex-col pt-[80px] pb-10">
              <Component {...pageProps} />
            </main>
          </div>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
