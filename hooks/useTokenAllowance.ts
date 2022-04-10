import { Contract } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import {
  getTokenAllowance,
  approveContract,
} from "../utils/calls/tokenQueries";
import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";

export const allowanceQueryKey = "tokenAllowance";

export const useIsTokenApprove = (
  owner: string,
  spender: string,
  contract: Contract
) => {
  const [allowance, setAllowance] = useState<boolean>(false);
  const { data } = useQuery(
    [allowanceQueryKey, owner, spender, contract?.allowance],
    () => getTokenAllowance(owner, spender, contract?.allowance),
    { enabled: !!owner && !!spender && !!contract?.allowance }
  );

  useEffect(() => {
    (async () => {
      if (data) {
        const isApproved = !!Number(formatUnits(data));

        setAllowance(isApproved);
      }
    })();

    return () => {
      setAllowance(false);
    };
  }, [data]);

  return [allowance];
};

export function useApproveContract() {
  const queryClient = useQueryClient();

  return useMutation(approveContract, {
    onSuccess: () => {
      queryClient.invalidateQueries([allowanceQueryKey]);
    },
  });
}
