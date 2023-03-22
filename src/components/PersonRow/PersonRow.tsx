import { FC, Dispatch, SetStateAction } from 'react';
import { Person } from '../../store/features/peopleSlice';
import { columns } from '../../constants';
import styles from './PersonRow.module.scss';

interface Props {
  person?: Person;
  children: JSX.Element;
  editing: boolean;
  updatedPersonData: Person;
  setUpdatedPersonData: Dispatch<SetStateAction<Person>>;
}

const PersonRow: FC<Props> = ({
  person,
  children,
  editing,
  updatedPersonData,
  setUpdatedPersonData,
}) => {
  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    key: string
  ): void => {
    setUpdatedPersonData(prev => ({
      ...prev,
      [key]: evt.target.value,
    }));
  };

  return (
    <tr className={styles.PersonRow}>
      {columns.map(column => (
        <td key={`${column}_${person?.id}`} className={styles.cell}>
          {editing && column !== 'id' ? (
            <input
              name={column}
              type={`${typeof updatedPersonData[column]}`}
              value={updatedPersonData[column]}
              className={styles.field}
              onChange={evt => {
                handleChange(evt, column);
              }}
            />
          ) : (
            person?.[column]
          )}
        </td>
      ))}
      <td className={styles.cell}>
        <div className={styles.actions}>{children}</div>
      </td>
    </tr>
  );
};

export default PersonRow;
