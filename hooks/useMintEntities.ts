import { useQuery } from "@apollo/client";
import { MINTS } from "../utils/calls/graphql-queries";

export const useMintEntities = (address: string) => {
  const data = useQuery(MINTS, {
    variables: { address },
  });

  return data;
};
