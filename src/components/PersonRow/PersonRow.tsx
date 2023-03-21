import { FC } from 'react';
import { Person } from '../../store/features/peopleSlice';
import { columns } from '../../constants';
import styles from './PersonRow.module.scss';

const PersonRow: FC<Person> = props => {
  return (
    <tr className={styles.PersonRow}>
      {columns.map(column => (
        <td key={`${column}_${props.id}`} className={styles.cell}>
          {props[column.toLowerCase()]}
        </td>
      ))}
    </tr>
  );
};

export default PersonRow;
