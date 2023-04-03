import { FC } from 'react';
import styles from './Button.module.scss';

interface Props {
  label: string;
  mobileLabel?: string;
  action: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: FC<Props> = ({ label, mobileLabel, action }) => {
  return (
    <button className={styles.Button} onClick={action}>
      <span className={styles.desktopLabel}>{label}</span>
      {mobileLabel && <span className={styles.mobileLabel}>{mobileLabel}</span>}
    </button>
  );
};

export default Button;
