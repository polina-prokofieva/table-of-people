import { FC, Dispatch, SetStateAction, useEffect } from 'react';
import { Person } from '../../store/features/peopleSlice';
import { columns } from '../../constants';
import styles from './PersonRow.module.scss';
import { emptyPerson } from './NewPersonRow';

interface Props {
  person?: Person;
  children: JSX.Element;
  editing: boolean;
  updatedPersonData: Person | null;
  setUpdatedPersonData: Dispatch<SetStateAction<Person | null>>;
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
    setUpdatedPersonData(prev =>
      prev
        ? {
            ...prev,
            [key]: evt.target.value,
          }
        : {
            ...emptyPerson,
            [key]: evt.target.value,
          }
    );
  };

  useEffect(() => {
    if (editing && updatedPersonData) {
      localStorage.setItem(
        updatedPersonData.id?.toString() || 'new',
        JSON.stringify(updatedPersonData)
      );
    }
  }, [updatedPersonData, editing]);

  return (
    <tr className={styles.PersonRow}>
      {columns.map(column => (
        <td key={`${column}_${person?.id}`} className={styles.cell}>
          {editing && column !== 'id' ? (
            <input
              name={column}
              type={`${typeof updatedPersonData?.[column]}`}
              value={updatedPersonData?.[column]}
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
