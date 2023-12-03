import classNames from "classnames";
import Typography from "./Typography";
import { useAccount, useConnect } from "wagmi";
import Button from "./Button";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const SwapForm = () => {
  const { address } = useAccount();
  const { connect } = useConnect();

  return (
    <div className="shadow-card rounded-card bg-white dark:bg-primary-950 w-full">
      <TokenInput label="Sell" token="USDC" />
      <TokenInput label="Buy" token="HDG" className="border-t" />
      <div className="p-6 border-t">
        {address ? (
          <Button>Confirm</Button>
        ) : (
          <ConnectButton.Custom>
            {({ openConnectModal }) => (
              <Button onClick={() => openConnectModal()}>Connect Wallet</Button>
            )}
          </ConnectButton.Custom>
        )}
      </div>
    </div>
  );
};

const TokenInput = ({
  label,
  token,
  className,
}: {
  label?: string;
  token?: string;
  className?: string;
}) => {
  return (
    <div className={classNames("p-6 w-full dark:text-white", className)}>
      {label && <div className="mb-2">{label}</div>}
      <div className="flex gap-2 items-center ">
        <input
          type="number"
          placeholder="0.0"
          className="dark:text-white border-none appearance-none outline-none whitespace-nowrap overflow-ellipsis w-full text-3xl flex-1 bg-transparent"
        />
        {token && <Typography variant="bodyXXL">{token}</Typography>}
      </div>
    </div>
  );
};

export default SwapForm;
