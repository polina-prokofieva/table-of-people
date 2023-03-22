import { FC } from 'react';
import { columns } from '../../constants';
import styles from './TableHeader.module.scss';

const TableHeader: FC = () => {
  return (
    <thead className={styles.TableHeader}>
      <tr>
        {columns.map(column => (
          <th key={column} className={styles.cell}>
            {column}
          </th>
        ))}
        <th className={styles.cell}>Actions</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
