import ApprovalList from "../ApprovalList/ApprovalList";
import BorrowList from "../BorrowList/BorrowList";
import MintList from "../MintList/MintList";
import RedeemList from "../RedeemList/RedeemList";

// styles
import styles from "./Lists.module.scss";

const Lists = () => {
  return (
    <div className={styles.container}>
      <MintList />
      <BorrowList />
      <RedeemList />
      <ApprovalList />
    </div>
  );
};

export default Lists;
