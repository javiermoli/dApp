import Wallet from "../Wallet/Wallet";
import styles from "./NavBar.module.scss";
import { BsGithub } from "react-icons/bs";

const NavBar = () => (
  <div className={styles.container}>
    <a className={styles.github} href="">
      <BsGithub size={35} />
    </a>
    <Wallet />
  </div>
);

export default NavBar;
