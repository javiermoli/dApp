import { Contract } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { useEffect, useState } from "react";

export const useTokenApprove = (
  owner: string,
  spender: string,
  erc20Contract: Contract
) => {
  const [allowance, setAllowance] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (erc20Contract && owner && spender) {
        const approvedBalance = await erc20Contract?.allowance(owner, spender);
        const isApproved = !!Number(formatUnits(approvedBalance));

        setAllowance(isApproved);
      }
    })();

    return () => {
      setAllowance(false);
    };
  }, [erc20Contract, owner, spender]);

  return [allowance];
};
