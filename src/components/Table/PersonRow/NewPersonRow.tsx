import { FC, useEffect, useState } from 'react';
import { addPerson, Person } from '../../../store/features/peopleSlice';
import { useAppDispatch } from '../../../store/store';
import PersonRow from './PersonRow';
import { ActionButton } from '../../buttons/ActionButton/ActionButton';
import { CancelIcon, SaveIcon } from '../../icons/Icon';

interface Props {
  handleCancel: () => void;
}

export const emptyPerson: Person = {
  name: '',
  age: 0,
  about: '',
};

const NewPersonRow: FC<Props> = ({ handleCancel }) => {
  const dispatch = useAppDispatch();

  const [updatedPersonData, setUpdatedPersonData] = useState<Person | null>(
    null
  );

  const handleCreate = () => {
    updatedPersonData && dispatch(addPerson(updatedPersonData));
    handleCancel();
  };

  useEffect(() => {
    const newPerson = localStorage.getItem('new');
    newPerson && setUpdatedPersonData(JSON.parse(newPerson));
  }, []);

  return (
    <PersonRow
      editing={true}
      updatedPersonData={updatedPersonData}
      setUpdatedPersonData={setUpdatedPersonData}
    >
      <>
        <ActionButton
          label='Create'
          type='normal'
          Icon={SaveIcon}
          action={handleCreate}
        />
        <ActionButton
          label='Cancel'
          type='danger'
          Icon={CancelIcon}
          action={handleCancel}
        />
      </>
    </PersonRow>
  );
};

export default NewPersonRow;
