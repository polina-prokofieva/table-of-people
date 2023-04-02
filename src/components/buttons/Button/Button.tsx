import { FC } from 'react';
import styles from './Button.module.scss';

interface Props {
  label: string;
  action: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}



const Button: FC<Props> = ({ label, action }) => {
  return (
    <button className={styles.Button} onClick={action}>
      {label}
    </button>
  );
};



export default Button;
