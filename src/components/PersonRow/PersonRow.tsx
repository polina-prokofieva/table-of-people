import { FC, useMemo, useState } from 'react';
import {
  deletePerson,
  Person,
  updatePerson,
} from '../../store/features/peopleSlice';
import { columns } from '../../constants';
import { useAppDispatch } from '../../store/store';
import styles from './PersonRow.module.scss';
import Button from '../Button/Button';

const PersonRow: FC<Person> = props => {
  const { id } = props;
  const [editing, setEditing] = useState(false);
  const [updatedPersonData, setUpdatedPersonData] = useState<Person>(props);

  const dispatch = useAppDispatch();

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleSave = () => {
    setEditing(false);
    console.log(updatedPersonData);
    dispatch(updatePerson(updatedPersonData));
  };

  const handleDelete = () => {
    dispatch(deletePerson(id));
  };

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    key: string
  ): void => {
    setUpdatedPersonData(prev => ({ ...prev, [key]: evt.target.value }));
  };

  return (
    <tr className={styles.PersonRow}>
      {columns.map(column => (
        <td key={`${column}_${id}`} className={styles.cell}>
          {editing && column !== 'id' ? (
            <input
              name={column}
              type={`${typeof props[column]}`}
              value={updatedPersonData[column]}
              className={styles.field}
              onChange={evt => {
                handleChange(evt, column);
              }}
            />
          ) : (
            props[column]
          )}
        </td>
      ))}
      <td className={styles.cell}>
        <div className={styles.actions}>
          {editing ? (
            <>
              <Button label='Save' onClick={handleSave} />
              <Button label='Cancel' onClick={handleCancel} />
            </>
          ) : (
            <>
              <Button label='Delete' onClick={handleDelete} />
              <Button label='Edit' onClick={handleEdit} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default PersonRow;
