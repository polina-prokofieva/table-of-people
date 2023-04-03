import { FC } from 'react';
import Button from '../buttons/Button/Button';
import styles from './ActionBar.module.scss';

interface Props {
  handleAddPerson: () => void;
}

const ActionBar: FC<Props> = ({ handleAddPerson }) => {
  return (
    <div className={styles.ActionBar}>
      <Button label='add new person' mobileLabel='+' action={handleAddPerson} />
    </div>
  );
};

export default ActionBar;
