import { useEffect, useState } from "react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { injected } from "../../utils/web3";
import { formatEther } from "@ethersproject/units";
import { BigNumberish } from "@ethersproject/bignumber";
import Blockies from "react-blockies";
import { exactRound } from "../../utils/currency";
import { useTokenBalance } from "../../hooks/useTokenBalance";
import { C_DAI, DAI } from "../../config/constants/contracts";
import cDAIABI from "../../config/abi/CErc20Delegator.json";
import DAIABI from "../../config/abi/ERC20.json";

// styles
import styles from "./Wallet.module.scss";
import commonStyles from "../../styles/common.module.scss";

const Wallet = () => {
  const [unsupportedChain, setUnsupportedChain] = useState(false);
  const [balance, setBalance] = useState<BigNumberish>("");
  const { activate, account, library, active } = useWeb3React();
  const [cDaiBalance] = useTokenBalance(C_DAI, cDAIABI, 8);
  const [daiBalance] = useTokenBalance(DAI, DAIABI, 18);

  useEffect(() => {
    if (!active) {
      activate(injected, async (error) => {
        if (error instanceof UnsupportedChainIdError) {
          setUnsupportedChain(true);

          setTimeout(() => {
            setUnsupportedChain(false);
          }, 5000);
        }
      });
    }
  }, [active, activate]);

  useEffect(() => {
    (async () => {
      if (account && library) {
        const balance: BigNumberish = await library.getBalance(account);
        setBalance(balance);
        return () => setBalance("");
      }
    })();
  }, [account, library]);

  const getAddressWithEllipsis = () => {
    const address = account || "";
    if (address) {
      const addressFirstBlock = address.slice(0, 6);
      const addressLastBlock = address.slice(-4);

      return `${addressFirstBlock}...${addressLastBlock}`;
    }
    return account;
  };

  const displayAddress = getAddressWithEllipsis();
  const formattedEther = balance ? exactRound(formatEther(balance), 2) : "";

  return (
    <>
      {!active ? (
        <button
          className={commonStyles.button}
          onClick={() => activate(injected)}
        >
          Connect to metamask
        </button>
      ) : (
        <>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://kovan.etherscan.io/address/${account}`}
            className={`${styles.text} ${styles.container}`}
          >
            <div className={styles.address}>{displayAddress || "....."}</div>
            <Blockies seed={account as any} size={8} scale={2} />
          </a>
          <h6 className={styles.text}>
            {balance ? `${formattedEther} ETH` : "---"}
          </h6>
          <h6 className={styles.text}>
            {cDaiBalance ? `${cDaiBalance} cDAI` : "---"}
          </h6>
          <h6 className={styles.text}>
            {daiBalance ? `${daiBalance} DAI` : "---"}
          </h6>
          {unsupportedChain && (
            <div className={styles.notSupportedChain}>
              Current chain is not supported. Please, use Kovan testnet!
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Wallet;
