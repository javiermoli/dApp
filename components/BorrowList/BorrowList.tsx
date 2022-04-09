import { useWeb3React } from "@web3-react/core";
import { useBorrowEntities } from "../../hooks/useBorrowEntities";
import List from "../List/List";

const BorrowList = () => {
  const { account } = useWeb3React();
  const { loading, error, data, refetch } = useBorrowEntities(account!);

  return <List title="Borrow interactions" items={data?.borrowEntities} />;
};

export default BorrowList;
