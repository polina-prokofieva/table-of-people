import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  deletePerson,
  People,
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

  const loading = useSelector((state: People) => state.loading);

  const [editing, setEditing] = useState(false);
  const [updatedPersonData, setUpdatedPersonData] = useState<Person>(person);
  const [saving, setSaving] = useState(false);

  const dispatch = useAppDispatch();

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleSave = () => {
    setEditing(false);
    setSaving(true);
    dispatch(updatePerson(updatedPersonData));
    updatedPersonData.id &&
      localStorage.removeItem(updatedPersonData.id.toString());
  };

  const handleDelete = () => {
    id && dispatch(deletePerson(id));
  };

  useEffect(() => {
    const updating = localStorage.getItem(`${id}`);

    if (updating) {
      setEditing(true);
      setUpdatedPersonData(JSON.parse(updating));
    }
  }, []);

  useEffect(() => {
    if (saving && !loading) {
      setSaving(false);
    }
  }, [saving, loading]);

  useEffect(() => {
    !editing &&
      updatedPersonData.id &&
      localStorage.removeItem(updatedPersonData.id.toString());
  }, [editing]);

  return (
    <PersonRow
      person={person}
      editing={editing}
      updatedPersonData={updatedPersonData}
      setUpdatedPersonData={
        setUpdatedPersonData as Dispatch<SetStateAction<Person | null>>
      }
    >
      <>
        {saving && <span>Saving...</span>}
        {!saving && editing && (
          <>
            <Button label='Save' onClick={handleSave} />
            <Button label='Cancel' onClick={handleCancel} />
          </>
        )}
        {!saving && !editing && (
          <>
            <Button label='Edit' onClick={handleEdit} />
            <Button label='Delete' onClick={handleDelete} />
          </>
        )}
      </>
    </PersonRow>
  );
};

export default ExistingPersonRow;
