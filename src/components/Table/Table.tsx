import { FC, useEffect, useState } from 'react';
import { People } from '../../store/features/peopleSlice';
import { useSelector } from 'react-redux';
import { fetchPeople } from '../../store/features/peopleSlice';
import TableHeader from '../TableHeader/TableHeader';
import TableBody from '../TableBody/TableBody';
import styles from './Table.module.scss';
import Button from '../Button/Button';
import { useAppDispatch } from '../../store/store';

const Table: FC = () => {
  const loading = useSelector((state: People) => state.loading);
  const error = useSelector((state: People) => state.error);
  const dispatch = useAppDispatch();

  const [adding, setAdding] = useState(false);

  useEffect(() => {
    dispatch(fetchPeople());
  }, []);

  const handleAddPerson = () => {
    setAdding(true);
  };

  const hadleCancelAddingPerson = () => {
    setAdding(false);
  };

  if (loading) {
    return <h4>Loading...</h4>;
  }

  if (error) {
    return <h3 className={styles.error}>{error}</h3>;
  }

  return (
    <div className={styles.Table}>
      <Button label='add new person' onClick={handleAddPerson} />
      <table>
        <TableHeader />
        <TableBody
          adding={adding}
          hadleCancelAddingPerson={hadleCancelAddingPerson}
        />
      </table>
      <Button label='add new person' onClick={handleAddPerson} />
    </div>
  );
};

export default Table;
