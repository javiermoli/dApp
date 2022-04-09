import { formatUnits } from "ethers/lib/utils";
import { FC } from "react";
import { ListItemInterface } from "./List";
import { exactRound } from "../../utils/currency";

// styles
import styles from "./ListItem.module.scss";

interface ItemProps {
  item: ListItemInterface;
}

const ListItem: FC<ItemProps> = ({ item }) => {
  const { amount, tokens } = item;
  const roundedAmount = amount && exactRound(formatUnits(amount), 2);
  const roundedTokens = tokens && exactRound(formatUnits(tokens, 8), 2);
  return (
    <div className={styles.container}>
      <div>Amount: {roundedAmount} DAI</div>
      {tokens && <div>Tokens: {roundedTokens} cDAI</div>}
    </div>
  );
};

export default ListItem;
