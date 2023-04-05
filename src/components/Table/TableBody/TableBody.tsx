import { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { People } from '../../../store/features/peopleSlice';
import ExistingPersonRow from '../PersonRow/ExistingPersonRow';
import NewPersonRow from '../PersonRow/NewPersonRow';

interface Props {
  adding: boolean;
  hadleCancelAddingPerson: () => void;
}

const TableBody: FC<Props> = ({ adding, hadleCancelAddingPerson }) => {
  const people = useSelector((state: People) => state.people);
  const refToTop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    adding && refToTop.current && refToTop.current.scrollIntoView();
    window.scrollTo(0, 0);
  });

  return (
    <div ref={refToTop}>
      {adding && <NewPersonRow handleCancel={hadleCancelAddingPerson} />}
      {people.map(person => (
        <ExistingPersonRow person={person} key={person.id} />
      ))}
    </div>
  );
};

export default TableBody;
