import { useWeb3React } from "@web3-react/core";
import { useMintEntities } from "../../hooks/useMintEntities";
import List from "../List/List";

const MintList = () => {
  const { account } = useWeb3React();
  const { loading, error, data, refetch } = useMintEntities(account!);

  return <List title="Mint interactions" items={data?.mintEntities} />;
};

export default MintList;
