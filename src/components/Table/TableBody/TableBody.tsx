import { FC } from 'react';
import { useSelector } from 'react-redux';
import { People } from '../../../store/features/peopleSlice';
import ExistingPersonRow from '../PersonRow/ExistingPersonRow';
import NewPersonRow from '../PersonRow/NewPersonRow';
import PersonRow from '../PersonRow/PersonRow';

interface Props {
  adding: boolean;
  hadleCancelAddingPerson: () => void;
}

const TableBody: FC<Props> = ({ adding, hadleCancelAddingPerson }) => {
  const people = useSelector((state: People) => state.people);

  return (
    <div>
      {adding && <NewPersonRow handleCancel={hadleCancelAddingPerson} />}
      {people.map(person => (
        <ExistingPersonRow person={person} key={person.id} />
      ))}
    </div>
  );
};

export default TableBody;
