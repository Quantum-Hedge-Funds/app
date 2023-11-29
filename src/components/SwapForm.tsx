import classNames from "classnames";
import Typography from "./Typography";

const SwapForm = () => {
  return (
    <div className="shadow-card py-10 rounded-card bg-white w-full">
      <TokenInput label="Sell" token="USDC" />
      <TokenInput label="Buy" token="HEDGYTOKEN" className="border-t" />
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
