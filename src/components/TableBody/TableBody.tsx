import { FC } from 'react';
import { useSelector } from 'react-redux';
import { People } from '../../store/features/peopleSlice';
import PersonRow from '../PersonRow/PersonRow';

interface Props {}

const TableBody: FC<Props> = ({}) => {
  const people = useSelector((state: People) => state.people);

  return (
    <tbody>
      {people.map(person => (
        <PersonRow {...person} key={person.id} />
      ))}
    </tbody>
  );
};

export default TableBody;
