import { ChangeEvent, useState } from "react";
import { BigNumberish } from "@ethersproject/bignumber";
import { C_DAI, DAI } from "../../config/constants/contracts";
import CErc20Delegator from "../../config/abi/CErc20Delegator.json";
import { useContract } from "../../hooks/useContract";
import ERC20ABI from "../../config/abi/ERC20.json";
import { BigNumber, FixedNumber } from "ethers";
import { useTokenBalance } from "../../hooks/useTokenBalance";
import { useWeb3React } from "@web3-react/core";
import { useTokenApprove } from "../../hooks/useTokenAllowance";

// Styles
import styles from "./Deposit.module.scss";
import commonStyles from "../../styles/common.module.scss";

const Deposit = () => {
  const [amount, setAmount] = useState<BigNumberish>("");
  const { account } = useWeb3React();
  const { contract: cDaiContract } = useContract(C_DAI, CErc20Delegator);
  const { contract: daiContract } = useContract(DAI, ERC20ABI);
  const [daiBalance] = useTokenBalance(DAI, ERC20ABI, 18);
  const [isApproved] = useTokenApprove(account!, C_DAI, daiContract!);
  const isInsufficientAmount = Number(daiBalance) < Number(amount);
  const negativeAmount = Number(amount) < 0;
  const buttonLabel = isApproved ? "Deposit" : "Approve contract";

  const deposit = async () => {
    const amountFixedNumber = FixedNumber.from(amount.toString(), 18);
    const amountBigNumber = BigNumber.from(amountFixedNumber);

    const response = await cDaiContract?.mint(amountBigNumber);
    const waiter = await response.wait();
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAmount(value);
  };

  const approve = async () => {
    const amountFixedNumber = FixedNumber.from("1000000000000000000000000", 18);
    const amountBigNumber = BigNumber.from(amountFixedNumber);
    const response = await daiContract?.approve(C_DAI, amountBigNumber);

    const waiter = await response.wait();
  };

  return (
    <div className={styles.container}>
      <h3>Deposit DAI to Compound</h3>
      <div className={styles.inputsContainer}>
        <div className={styles.inputTextContainer}>
          <input
            className={styles.input}
            type="number"
            placeholder="DAI amount"
            onChange={onChange}
            disabled={!isApproved}
          />
          {isInsufficientAmount && (
            <span className={styles.textError}>
              Insufficient amount of DAI.
            </span>
          )}
          {negativeAmount && (
            <span className={styles.textError}>
              The amount should be greater than zero.
            </span>
          )}
        </div>
        <button
          className={`${commonStyles.button} ${styles.button}`}
          disabled={
            (isApproved && isInsufficientAmount) ||
            !daiBalance ||
            negativeAmount
          }
          onClick={isApproved ? deposit : approve}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default Deposit;
