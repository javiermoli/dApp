import { useQuery } from "@apollo/client";
import { REDEEM } from "../utils/calls/graphql-queries";

export const useRedeemEntities = (address: string) => {
  const data = useQuery(REDEEM, {
    variables: { address },
  });

  return data;
};
