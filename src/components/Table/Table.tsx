import { FC, useEffect, useState } from 'react';
import { People } from '../../store/features/peopleSlice';
import { useSelector } from 'react-redux';
import { fetchPeople } from '../../store/features/peopleSlice';
import TableHeader from './TableHeader/TableHeader';
import TableBody from './TableBody/TableBody';
import styles from './Table.module.scss';
import { useAppDispatch } from '../../store/store';
import ActionBar from '../ActionBar/ActionBar';

const Table: FC = () => {
  const loading = useSelector((state: People) => state.loading);
  const error = useSelector((state: People) => state.error);
  const people = useSelector((state: People) => state.people);

  const dispatch = useAppDispatch();

  const [adding, setAdding] = useState(false);

  useEffect(() => {
    dispatch(fetchPeople());
    localStorage.getItem('new') && setAdding(true);
  }, []);

  const handleAddPerson = () => {
    setAdding(true);
  };

  const hadleCancelAddingPerson = () => {
    setAdding(false);
    localStorage.removeItem('new');
  };

  if (!people.length && loading) {
    return <h4>Loading...</h4>;
  }

  if (error) {
    return <h3 className={styles.error}>{error}</h3>;
  }

  return (
    <div className={styles.Table}>
      <TableHeader />
      <div className={styles.dataTable}>
        <TableBody
          adding={adding}
          hadleCancelAddingPerson={hadleCancelAddingPerson}
        />
      </div>
      {!adding && <ActionBar handleAddPerson={handleAddPerson} />}
    </div>
  );
};

export default Table;
