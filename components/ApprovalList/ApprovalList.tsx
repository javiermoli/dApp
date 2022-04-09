import { useWeb3React } from "@web3-react/core";
import { useApprovalsEntities } from "../../hooks/useApprovalsEntities";
import List from "../List/List";

const ApprovalList = () => {
  const { account } = useWeb3React();
  const { loading, error, data, refetch } = useApprovalsEntities(account!);

  return <List title="Approval interactions" items={data?.approvalEntities} />;
};

export default ApprovalList;
