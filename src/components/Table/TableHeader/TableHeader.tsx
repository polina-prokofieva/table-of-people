import { FC } from 'react';
import { columns } from '../../../constants';
import styles from './TableHeader.module.scss';

const TableHeader: FC = () => {
  return (
    <div className={styles.TableHeader}>
      {columns.map(column => (
        <div key={column} className={styles.cell}>
          {column}
        </div>
      ))}
      <div className={styles.cell}>Actions</div>
    </div>
  );
};

export default TableHeader;
