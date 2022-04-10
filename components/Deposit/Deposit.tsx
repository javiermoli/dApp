import { ChangeEvent, useState } from "react";
import { C_DAI, DAI } from "../../config/constants/contracts";
import CErc20Delegator from "../../config/abi/CErc20Delegator.json";
import { useContract } from "../../hooks/useContract";
import ERC20ABI from "../../config/abi/ERC20.json";
import { BigNumber, FixedNumber } from "ethers";
import { useTokenBalance } from "../../hooks/useTokenBalance";
import { useWeb3React } from "@web3-react/core";
import {
  useApproveContract,
  useIsTokenApprove,
} from "../../hooks/useTokenAllowance";
import { useMintToken } from "../../hooks/useMintToken";

// Styles
import styles from "./Deposit.module.scss";
import commonStyles from "../../styles/common.module.scss";
import { useApolloClient } from "@apollo/client";
import { MINTS } from "../../utils/calls/graphql-queries";
import { FaSpinner } from "react-icons/fa";

const Deposit = () => {
  const [amount, setAmount] = useState<string>("");
  const { account } = useWeb3React();
  const { contract: cDaiContract } = useContract(C_DAI, CErc20Delegator);
  const { contract: daiContract } = useContract(DAI, ERC20ABI);
  const [daiBalance] = useTokenBalance(DAI, ERC20ABI, 18);
  const [isApproved] = useIsTokenApprove(account!, C_DAI, daiContract!);
  const isInsufficientAmount = Number(daiBalance) < Number(amount);
  const negativeAmount = Number(amount) < 0;
  const buttonLabel = isApproved ? "Deposit" : "Approve contract";
  const { mutate: mint, isLoading: mintLoading } = useMintToken();
  const { mutate: approveContract, isLoading: approveLoading } =
    useApproveContract();
  const apolloClient = useApolloClient();

  const deposit = async () => {
    if (!amount) return;
    const amountFixedNumber = FixedNumber.from(amount.toString(), 18);
    const amountBigNumber = BigNumber.from(amountFixedNumber);

    mint(
      { amount: amountBigNumber, mint: cDaiContract?.mint },
      {
        onSuccess: () => {
          setAmount("");
          apolloClient.refetchQueries({
            include: [MINTS],
          });
        },
      }
    );
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAmount(value);
  };

  const approve = async () => {
    const amountFixedNumber = FixedNumber.from("1000000000000000000000000", 18);
    const amountBigNumber = BigNumber.from(amountFixedNumber);

    const config = {
      amount: amountBigNumber,
      contract: C_DAI,
      approve: daiContract?.approve,
    };

    approveContract(config);
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
            value={amount}
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
            negativeAmount ||
            mintLoading ||
            approveLoading
          }
          onClick={isApproved ? deposit : approve}
        >
          {mintLoading || approveLoading ? (
            <FaSpinner size={22} className={styles.spin} />
          ) : (
            buttonLabel
          )}
        </button>
      </div>
    </div>
  );
};

export default Deposit;
