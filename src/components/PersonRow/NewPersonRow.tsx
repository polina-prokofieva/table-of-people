import { FC, useState } from 'react';
import { addPerson, Person } from '../../store/features/peopleSlice';
import { useAppDispatch } from '../../store/store';
import Button from '../Button/Button';
import PersonRow from './PersonRow';

interface Props {
  handleCancel: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const NewPersonRow: FC<Props> = ({ handleCancel }) => {
  const dispatch = useAppDispatch();

  const [updatedPersonData, setUpdatedPersonData] = useState<Person>({
    name: '',
    age: 0,
    about: '',
  });

  const handleCreate = () => {
    dispatch(addPerson(updatedPersonData));
  };

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
