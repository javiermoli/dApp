import { FC } from "react";
import ListItem from "./ListItem";

// styles
import styles from "./List.module.scss";

export interface ListItemInterface {
  amount: string;
  tokens?: string;
  id: string;
}

interface ItemProps {
  items: ListItemInterface[];
  title: string;
}

const List: FC<ItemProps> = ({ items, title }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      {items?.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
      {items?.length === 0 && (
        <div className={styles.noItems}>There are no items to display.</div>
      )}
    </div>
  );
};

export default List;
