import { useWeb3React } from "@web3-react/core";
import { ContractInterface } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { exactRound } from "../utils/currency";
import { useContract } from "./useContract";
import { getTokenBalance } from "../utils/calls/tokenQueries";
import { useQuery } from "react-query";

export const useTokenBalance = (
  tokenAddress: string,
  tokenAbi: ContractInterface,
  tokenUnits: number
) => {
  const { account } = useWeb3React();
  const { contract } = useContract(tokenAddress, tokenAbi);
  const [balance, setBalance] = useState<string>("");
  const { data } = useQuery(
    [tokenAddress, account!, contract?.balanceOf],
    () => getTokenBalance(account!, contract?.balanceOf),
    { enabled: !!account && !!contract?.balanceOf }
  );

  useEffect(() => {
    if (data) {
      const formattedBalance = formatUnits(data, tokenUnits);
      setBalance(exactRound(formattedBalance, 2));
    }
  }, [contract, account, tokenUnits, data]);

  return [balance];
};
