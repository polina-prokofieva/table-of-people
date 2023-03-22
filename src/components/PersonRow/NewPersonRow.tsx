import { FC, useEffect, useState } from 'react';
import { addPerson, Person } from '../../store/features/peopleSlice';
import { useAppDispatch } from '../../store/store';
import Button from '../Button/Button';
import PersonRow from './PersonRow';

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
        <Button label='Create' onClick={handleCreate} />
        <Button label='Cancel' onClick={handleCancel} />
      </>
    </PersonRow>
  );
};

export default NewPersonRow;
