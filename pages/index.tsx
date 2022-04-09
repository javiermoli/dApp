import type { NextPage } from "next";
import Deposit from "../components/Deposit/Deposit";
import Lists from "../components/Lists/Lists";

const Home: NextPage = () => {
  return (
    <>
      <Deposit />
      <Lists />
    </>
  );
};

export default Home;
