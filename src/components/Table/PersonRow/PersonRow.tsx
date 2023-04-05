import { FC, Dispatch, SetStateAction, useEffect } from 'react';
import { Person } from '../../../store/features/peopleSlice';
import { columns } from '../../../constants';
import { emptyPerson } from './NewPersonRow';
import classNames from 'classnames';
import styles from './PersonRow.module.scss';

interface Props {
  person?: Person;
  isNew?: boolean;
  children: JSX.Element;
  editing: boolean;
  updatedPersonData: Person | null;
  setUpdatedPersonData: Dispatch<SetStateAction<Person | null>>;
}

const PersonRow: FC<Props> = ({
  person,
  isNew,
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
    <div className={classNames(styles.PersonRow, { [styles.adding]: isNew })}>
      {columns.map(column => (
        <div
          key={`${column}_${person?.id}`}
          className={classNames(styles.cell, styles[column])}
        >
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
        </div>
      ))}
      <div className={classNames(styles.cell, styles.actions)}>{children}</div>
    </div>
  );
};

export default PersonRow;
