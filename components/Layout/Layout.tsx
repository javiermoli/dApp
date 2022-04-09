import React, { FC, ReactNode } from "react";
import styles from "../../styles/Home.module.scss";
import NavBar from "../NavBar/NavBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <>
    <NavBar />
    <div className={styles.container}>{children}</div>
  </>
);

export default Layout;
