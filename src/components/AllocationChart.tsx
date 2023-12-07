import React, { useCallback, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { colors } from "../../tailwind.config";
import { useContractRead } from "wagmi";
import vaultAbi from "../constants/vaultAbi.json";
import Spinner from "./Spinner";
import { fetchBalance } from "wagmi/actions";

const AllocationChart = () => {
  const [allocations, setAllocations] = useState<
    { name: string; allocation: number }[]
  >([]);

  const supportedTokens = useContractRead({
    address: process.env.NEXT_PUBLIC_VAULT_CONTRACT_ADDRESS! as `0x${string}`,
    abi: vaultAbi,
    functionName: "supportedTokens",
  });

  const totalValue = useContractRead({
    address: process.env.NEXT_PUBLIC_VAULT_CONTRACT_ADDRESS! as `0x${string}`,
    abi: vaultAbi,
    functionName: "calculateTotalValue",
  });

  const fetchAllocations = useCallback(async () => {
    // if (!supportedTokens?.data || totalValue.data) return;

    let tempAllocations = [];

    // for (let tokenAddress of supportedTokens.data) {
    //   const balance = await fetchBalance({
    //     address: process.env
    //       .NEXT_PUBLIC_VAULT_CONTRACT_ADDRESS! as `0x${string}`,
    //     token: tokenAddress,
    //   });

    //   const proportion = Number(balance.value) / Number(totalValue.data);

    //   tempAllocations.push({ tokenAddress, proportion });
    // }

    const data = [
      { name: "BTC", allocation: 30 },
      { name: "ETH", allocation: 20 },
      { name: "DOGE", allocation: 10 },
      { name: "SOL", allocation: 15 },
      { name: "BNB", allocation: 25 },
    ];

    setAllocations(data);
  }, []);

  useEffect(() => {
    fetchAllocations();
  }, []);

  const isLoading = totalValue.isLoading || supportedTokens.isLoading;

  if (isLoading) {
    return (
      <div className="h-48 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={allocations}>
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} />
        <Tooltip
          labelStyle={{
            color: "black",
          }}
        />
        <Legend />
        <Bar dataKey="allocation" fill={colors["primary-300"]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AllocationChart;
