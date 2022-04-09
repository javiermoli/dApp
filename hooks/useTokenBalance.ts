import { useWeb3React } from "@web3-react/core";
import { ContractInterface } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { exactRound } from "../utils/currency";
import { useContract } from "./useContract";

export const useTokenBalance = (
  tokenAddress: string,
  tokenAbi: ContractInterface,
  tokenUnits: number
) => {
  const { account } = useWeb3React();
  const { contract } = useContract(tokenAddress, tokenAbi);
  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    if (contract && account) {
      contract.balanceOf(account).then((balance: number) => {
        const formattedBalance = formatUnits(balance, tokenUnits);

        setBalance(exactRound(formattedBalance, 2));
      });
      return () => {
        setBalance("");
      };
    }
  }, [contract, account, tokenUnits]);

  return [balance];
};
