import { BigNumber } from "ethers";

export const getTokenBalance = async (
  account?: string,
  balanceOf?: (address: string) => Promise<string>
) => {
  if (!account || !balanceOf) return;

  const balance = await balanceOf(account);

  return balance;
};

export const getTokenAllowance = async (
  owner?: string,
  spender?: string,
  allowance?: (owner: string, spender: string) => Promise<string>
) => {
  if (!spender || !owner || !allowance) return;

  const allowanceData = await allowance(owner, spender);

  return allowanceData;
};

export const mintToken = async (
  config: {
    amount?: BigNumber;
    mint?: (amount: BigNumber) => Promise<any>;
  } = {}
) => {
  const { amount, mint } = config;
  if (!amount || !mint) return;

  const response = await mint(amount);
  const waiter = await response.wait();

  return waiter;
};

export const approveContract = async (
  config: {
    amount?: BigNumber;
    contract?: string;
    approve?: (contract: string, amount: BigNumber) => Promise<any>;
  } = {}
) => {
  const { amount, contract, approve } = config;
  if (!amount || !contract || !approve) return;

  const response = await approve(contract, amount);
  const waiter = await response.wait();

  return waiter;
};
