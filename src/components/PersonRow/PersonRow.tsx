import { FC } from 'react';
import { Person } from '../../features';
import { columns } from '../../constants';
import styles from './PersonRow.module.scss';
import { camelToKebab } from '../../utils';

const PersonRow: FC<Person> = props => {
  return (
    <tr className={styles.PersonRow}>
      {columns.map(column => (
        <td key={`${column}_${props.id}`} className={styles.cell}>
          {props[camelToKebab(column)]}
        </td>
      ))}
    </tr>
  );
};

export default PersonRow;
