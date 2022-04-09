import { useWeb3React } from "@web3-react/core";
import { useRedeemEntities } from "../../hooks/useRedeemEntities";
import List from "../List/List";

const RedeemList = () => {
  const { account } = useWeb3React();
  const { loading, error, data, refetch } = useRedeemEntities(account!);

  return <List title="Redeem interactions" items={data?.redeemEntities} />;
};

export default RedeemList;
