import Wallet from "../Wallet/Wallet";
import styles from "./NavBar.module.scss";
import { BsGithub } from "react-icons/bs";

const NavBar = () => (
  <div className={styles.container}>
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={styles.github}
      href="https://github.com/javiermoli/dApps"
    >
      <BsGithub size={35} />
    </a>
    <Wallet />
  </div>
);

export default NavBar;
