import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  deletePerson,
  People,
  Person,
  updatePerson,
} from '../../../store/features/peopleSlice';
import { useAppDispatch } from '../../../store/store';
import PersonRow from './PersonRow';
import { ActionButton } from '../../buttons/ActionButton/ActionButton';
import { CancelIcon, DeleteIcon, EditIcon, SaveIcon } from '../../icons/Icon';

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
            <ActionButton
              label='Save'
              type='normal'
              Icon={SaveIcon}
              action={handleSave}
            />
            <ActionButton
              label='Cancel'
              type='danger'
              Icon={CancelIcon}
              action={handleCancel}
            />
          </>
        )}
        {!saving && !editing && (
          <>
            <ActionButton
              label='Edit'
              type='normal'
              Icon={EditIcon}
              action={handleEdit}
            />
            <ActionButton
              label='Delete'
              type='danger'
              Icon={DeleteIcon}
              action={handleDelete}
            />
          </>
        )}
      </>
    </PersonRow>
  );
};

export default ExistingPersonRow;
