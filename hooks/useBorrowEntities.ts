import { useQuery } from "@apollo/client";
import { BORROW } from "../utils/calls/graphql-queries";

export const useBorrowEntities = (address: string) => {
  const data = useQuery(BORROW, {
    variables: { address },
  });

  return data;
};
