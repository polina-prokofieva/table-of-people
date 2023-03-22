import { FC, useState } from 'react';
import {
  deletePerson,
  Person,
  updatePerson,
} from '../../store/features/peopleSlice';
import { useAppDispatch } from '../../store/store';
import Button from '../Button/Button';
import PersonRow from './PersonRow';

interface Props {
  person: Person;
}

const ExistingPersonRow: FC<Props> = ({ person }) => {
  const { id } = person;

  const [editing, setEditing] = useState(false);
  const [updatedPersonData, setUpdatedPersonData] = useState<Person>(person);

  const dispatch = useAppDispatch();

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleSave = () => {
    setEditing(false);
    dispatch(updatePerson(updatedPersonData));
  };

  const handleDelete = () => {
    id && dispatch(deletePerson(id));
  };

  return (
    <PersonRow
      person={person}
      editing={editing}
      updatedPersonData={updatedPersonData}
      setUpdatedPersonData={setUpdatedPersonData}
    >
      {editing ? (
        <>
          <Button label='Save' onClick={handleSave} />
          <Button label='Cancel' onClick={handleCancel} />
        </>
      ) : (
        <>
          <Button label='Edit' onClick={handleEdit} />
          <Button label='Delete' onClick={handleDelete} />
        </>
      )}
    </PersonRow>
  );
};

export default ExistingPersonRow;
