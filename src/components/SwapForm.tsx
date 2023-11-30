import classNames from "classnames";
import Typography from "./Typography";
import { useAccount } from "wagmi";

const SwapForm = () => {
  const { address } = useAccount();

  return (
    <div className="shadow-card rounded-card bg-white w-full">
      <TokenInput label="Sell" token="USDC" />
      <TokenInput label="Buy" token="HDG" className="border-t" />
      <div className="p-6 border-t">
        {address ? (
          <button className="rounded-full px-6 py-3 w-full bg-secondary-600 hover:bg-secondary-800 transition text-white">
            Confirm
          </button>
        ) : (
          <button>Connect Wallet</button>
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
    <div className={classNames("p-6 w-full", className)}>
      {label && <div className="mb-2">{label}</div>}
      <div className="flex gap-2 items-center">
        <input
          type="number"
          placeholder="0.0"
          className="border-none appearance-none outline-none whitespace-nowrap overflow-ellipsis w-full text-3xl flex-1"
        />
        {token && <Typography variant="bodyXXL">{token}</Typography>}
      </div>
    </div>
  );
};

export default SwapForm;
