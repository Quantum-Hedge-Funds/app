import classNames from "classnames";
import Typography from "./Typography";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import Button from "./Button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import vaultAbi from "../constants/vaultAbi.json";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import Spinner from "./Spinner";

type SwapTypes = "deposit" | "withdraw";

const SwapForm = () => {
  const [swapType, setSwapType] = useState<SwapTypes>("deposit");
  const [sellAmount, setSellAmount] = useState<string>("");
  const [buyAmount, setBuyAmount] = useState<string>("");
  const { address } = useAccount();

  const [debouncedSellAmount] = useDebounce(sellAmount, 1000);

  const { data, isLoading: isFetchingSharesValue } = useContractRead({
    address: process.env.NEXT_PUBLIC_VAULT_CONTRACT_ADDRESS! as `0x${string}`,
    abi: vaultAbi,
    functionName: "calculateShares",
    enabled: !!sellAmount && !!debouncedSellAmount && swapType === "deposit",
    args: [debouncedSellAmount],
  });

  const deposit = useContractWrite({
    address: process.env.NEXT_PUBLIC_VAULT_CONTRACT_ADDRESS! as `0x${string}`,
    abi: vaultAbi,
    functionName: "deposit",
  });

  const withdraw = useContractWrite({
    address: process.env.NEXT_PUBLIC_VAULT_CONTRACT_ADDRESS! as `0x${string}`,
    abi: vaultAbi,
    functionName: "withdraw",
  });

  const handleSellInputChange = (v: string) => {
    setSellAmount(v);
  };

  const handleBuyInputChange = (v: string) => {
    setBuyAmount(v);
  };

  const handleDeposit = () => {
    deposit.write({
      args: [sellAmount],
    });
  };

  const handleWithdraw = () => {};

  // const deposit = useContractRead({
  //   address: process.env.NEXT_PUBLIC_VAULT_CONTRACT_ADDRESS! as `0x${string}`,
  //   abi: vaultAbi,
  //   functionName: "deposit",
  // });

  // const withdraw = usePrepareContractWrite({
  //   address: process.env.NEXT_PUBLIC_VAULT_CONTRACT_ADDRESS! as `0x${string}`,
  //   abi: vaultAbi,
  //   functionName: "withdraw",
  // });

  useEffect(() => {
    setSellAmount("");
    setBuyAmount("");
  }, [swapType]);

  const txLoading = deposit.isLoading || withdraw.isLoading;

  return (
    <div className="shadow-card rounded-card bg-white dark:bg-primary-950 w-full">
      <div className="rounded-full border flex justify-between dark:text-white m-6 overflow-hidden">
        <TabButton
          isActive={swapType === "deposit"}
          onClick={() => setSwapType("deposit")}
        >
          Deposit
        </TabButton>
        <TabButton
          isActive={swapType === "withdraw"}
          onClick={() => setSwapType("withdraw")}
        >
          Withdraw
        </TabButton>
      </div>

      <TokenInput
        label="Sell"
        token={swapType === "deposit" ? "USDC" : "VTK"}
        value={sellAmount}
        onChange={(e) => handleSellInputChange(e.target.value)}
      />

      <TokenInput
        label="Buy"
        token={swapType === "withdraw" ? "USDC" : "VTK"}
        className="border-t"
        value={buyAmount}
        isLoading={isFetchingSharesValue}
        disabled={true}
        onChange={(e) => handleBuyInputChange(e.target.value)}
      />

      <div className="p-6 border-t">
        {address ? (
          <Button
            onClick={swapType === "deposit" ? handleDeposit : handleWithdraw}
            isLoading={txLoading}
          >
            Confirm
          </Button>
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

const TabButton = ({
  isActive,
  children,
  onClick,
}: {
  isActive: boolean;
  children: ReactNode;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={classNames(
      "p-2 flex-1 text-center rounded-full cursor-pointer",
      { ["bg-primary-600 text-white"]: isActive }
    )}
  >
    {children}
  </div>
);

const TokenInput = ({
  label,
  token,
  value,
  className,
  isLoading,
  disabled,
  onChange,
}: {
  label?: string;
  token?: string;
  value?: string;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className={classNames("p-6 w-full dark:text-white", className)}>
      {label && <div className="mb-2">{label}</div>}
      <div className="flex gap-2 items-center ">
        {isLoading ? (
          <div className="flex-1">
            <Spinner />
          </div>
        ) : (
          <input
            disabled={disabled}
            type="number"
            placeholder="0.0"
            value={value}
            className="dark:text-white border-none appearance-none outline-none whitespace-nowrap overflow-ellipsis w-full text-3xl flex-1 bg-transparent"
            onChange={onChange}
          />
        )}
        {token && <Typography variant="bodyXXL">{token}</Typography>}
      </div>
    </div>
  );
};

export default SwapForm;
