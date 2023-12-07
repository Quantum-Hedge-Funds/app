import classNames from "classnames";
import Typography from "./Typography";
import { erc20ABI, useAccount, useContractRead, useContractWrite } from "wagmi";
import Button from "./Button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import vaultAbi from "../constants/vaultAbi.json";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import Spinner from "./Spinner";
import { stableToken, vaultShareToken } from "@/constants";
import toast from "react-hot-toast";
import { setTokenAllowance, useEthersSigner } from "@/utils/transactions";
import { BigNumber, Contract, utils } from "ethers";
import { useGetBalance } from "@/hooks";

type SwapTypes = "deposit" | "withdraw";

const SwapForm = () => {
  const [swapType, setSwapType] = useState<SwapTypes>("deposit");
  const [sellAmount, setSellAmount] = useState<string>("");
  const [buyAmount, setBuyAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { address = "" } = useAccount();

  const signer = useEthersSigner();

  const stableBalance = useGetBalance({
    tokenAddress: stableToken.address,
    address,
  });
  const vaultShareBalance = useGetBalance({
    tokenAddress: vaultShareToken.address,
    address,
  });

  const [debouncedSellAmount] = useDebounce(sellAmount, 500);

  const { data: buyValue, isLoading: isFetchingSharesValue } = useContractRead({
    address: process.env.NEXT_PUBLIC_VAULT_CONTRACT_ADDRESS! as `0x${string}`,
    abi: vaultAbi,
    functionName: "calculateShares",
    enabled: !!sellAmount && !!debouncedSellAmount && swapType === "deposit",
    args: [debouncedSellAmount],
  });

  const allowance = useContractRead({
    address:
      swapType === "deposit" ? stableToken.address : vaultShareToken.address,
    abi: erc20ABI,
    functionName: "allowance",
    args: [
      (address || "") as `0x${string}`,
      process.env.NEXT_PUBLIC_VAULT_CONTRACT_ADDRESS! as `0x${string}`,
    ],
    enabled: !!address,
  });

  const requiredAmount = BigInt(
    +(sellAmount || 0) *
      10 ** (swapType === "deposit" ? stableToken.decimals : 18)
  );

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

  const handleApproveAllowance = async () => {
    setIsLoading(true);

    const approveToastId = "approve-toast-id";

    toast.loading("Approving tokens...", { id: approveToastId });

    try {
      await setTokenAllowance(
        swapType === "deposit" ? stableToken.address : vaultShareToken.address,
        process.env.NEXT_PUBLIC_VAULT_CONTRACT_ADDRESS!,
        signer
      );

      await allowance.refetch();

      toast.success("Tokens approved", { id: approveToastId });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", { id: approveToastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeposit = async () => {
    if (!address) return;

    const depositToastId = "deposit-toast-id";

    setIsLoading(true);

    const depositAmount = BigInt(+sellAmount * 10 ** stableToken.decimals);

    toast.loading("Sending tokens...", { id: depositToastId });

    try {
      const vaultContract = new Contract(
        process.env.NEXT_PUBLIC_VAULT_CONTRACT_ADDRESS!,
        vaultAbi,
        signer
      );

      const tx = await vaultContract.deposit(depositAmount);
      await tx.wait();

      await stableBalance.refetch();
      await vaultShareBalance.refetch();

      toast.success("Tokens deposited", { id: depositToastId });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", { id: depositToastId });
    } finally {
      setSellAmount("");
      setIsLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!address) return;

    const withdrawToastId = "withdraw-toast-id";

    setIsLoading(true);

    const withdrawAmount = BigInt(+sellAmount * 10 ** vaultShareToken.decimals);

    toast.loading("Withdrawing tokens...", { id: withdrawToastId });

    try {
      const vaultContract = new Contract(
        process.env.NEXT_PUBLIC_VAULT_CONTRACT_ADDRESS!,
        vaultAbi,
        signer
      );

      const tx = await vaultContract.withdraw(withdrawAmount);
      await tx.wait();

      await stableBalance.refetch();
      await vaultShareBalance.refetch();

      toast.success("Tokens withdrawn", { id: withdrawToastId });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", { id: withdrawToastId });
    } finally {
      setSellAmount("");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setSellAmount("");
    setBuyAmount("");
  }, [swapType]);

  useEffect(() => {
    if (+sellAmount > 0) {
      setBuyAmount(Number(buyValue).toString());
    } else {
      setBuyAmount("");
    }
  }, [buyValue]);

  const hasAllowance = (allowance.data || BigInt(0)) >= requiredAmount;

  const txLoading = withdraw.isLoading || isLoading || allowance.isLoading;

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
        token={swapType === "deposit" ? stableToken : vaultShareToken}
        balance={swapType === "deposit" ? stableBalance : vaultShareBalance}
        value={sellAmount}
        onChange={(e) => handleSellInputChange(e.target.value)}
      />

      <TokenInput
        label="Buy"
        token={swapType === "withdraw" ? stableToken : vaultShareToken}
        balance={swapType === "withdraw" ? stableBalance : vaultShareBalance}
        className="border-t"
        value={buyAmount}
        isLoading={isFetchingSharesValue}
        disabled={true}
        onChange={(e) => handleBuyInputChange(e.target.value)}
      />

      <div className="p-6 border-t">
        {address ? (
          <>
            {hasAllowance ? (
              <Button
                onClick={
                  swapType === "deposit" ? handleDeposit : handleWithdraw
                }
                isLoading={txLoading}
              >
                Confirm
              </Button>
            ) : (
              <Button onClick={handleApproveAllowance} isLoading={txLoading}>
                Approve token
              </Button>
            )}
          </>
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
  balance,
  value,
  className,
  isLoading,
  disabled,
  onChange,
}: {
  label?: string;
  token?: { symbol: string; decimals: number };
  decimals?: number;
  balance?: { balance?: BigNumber; isLoading?: boolean };
  value?: string;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  console.log(balance);
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
        {balance?.balance && (
          <div>{utils.formatUnits(balance.balance, token?.decimals || 18)}</div>
        )}
        {token && <Typography variant="bodyXXL">{token.symbol}</Typography>}
      </div>
    </div>
  );
};

export default SwapForm;
