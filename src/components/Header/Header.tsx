import { FC } from 'react';
import Button from '../buttons/Button/Button';
import styles from './Header.module.scss';

interface Props {
  handleAddPerson: () => void;
}

const Header: FC<Props> = ({ handleAddPerson }) => {
  return (
    <div className={styles.Header}>
      <Button label='add new person' action={handleAddPerson} />
    </div>
  );
};

export default Header;
