import Wallet from "../Wallet/Wallet";
import styles from "./NavBar.module.scss";

const NavBar = () => (
  <div className={styles.container}>
    <Wallet />
  </div>
);

export default NavBar;
