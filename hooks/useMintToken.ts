import { mintToken } from "../utils/calls/tokenQueries";
import { useMutation, useQueryClient } from "react-query";
import { C_DAI, DAI } from "../config/constants/contracts";

export function useMintToken() {
  const queryClient = useQueryClient();

  return useMutation(mintToken, {
    onSuccess: () => {
      queryClient.invalidateQueries([DAI]);
      queryClient.invalidateQueries([C_DAI]);
    },
  });
}
