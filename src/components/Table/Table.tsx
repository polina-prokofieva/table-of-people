import { FC, useEffect } from 'react';
import { People } from '../../store/features/peopleSlice';
import { useSelector } from 'react-redux';
import { fetchPeople } from '../../store/features/peopleSlice';
import TableHeader from '../TableHeader/TableHeader';
import TableBody from '../TableBody/TableBody';
import styles from './Table.module.scss';
import { useAppDispatch } from '../../store/store';

const Table: FC = () => {
  const loading = useSelector((state: People) => state.loading);
  const error = useSelector((state: People) => state.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPeople());
  }, []);

  if (loading) {
    return <h4>Loading...</h4>;
  }

  if (error) {
    return <h3 className={styles.error}>{error}</h3>;
  }

  return (
    <table className={styles.Table}>
      <TableHeader />
      <TableBody />
    </table>
  );
};

export default Table;
