import { FC } from 'react';
import { IconProps } from '../../icons/icons';
import classNames from 'classnames';
import styles from './ActionButton.module.scss';

interface Props {
  label: string;
  action: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  Icon?: FC<IconProps>;
  type: 'normal' | 'danger';
}

export const ActionButton: FC<Props> = ({
  label,
  Icon,
  type = 'normal',
  action,
}) => {
  return (
    <button
      className={classNames(styles.ActionButton, styles[type])}
      onClick={action}
    >
      <span className={styles.label}>{label}</span>
      {Icon && <Icon classes={styles.icon} />}
    </button>
  );
};
