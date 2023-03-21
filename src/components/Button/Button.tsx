import { FC } from 'react';
import styles from './Button.module.scss';

interface Props {
  label: string;
  onClick: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: FC<Props> = ({ label, onClick }) => {
  return (
    <button className={styles.Button} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
