import { useQuery } from "@apollo/client";
import { APPROVAL } from "../utils/calls/graphql-queries";

export const useApprovalsEntities = (address: string) => {
  const data = useQuery(APPROVAL, {
    variables: { address },
  });

  return data;
};
