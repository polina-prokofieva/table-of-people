import { FC, useEffect } from 'react';
import { People } from '../../features';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPeople } from '../../features';
import TableHeader from '../TableHeader/TableHeader';
import TableBody from '../TableBody/TableBody';
import styles from './Table.module.scss';

const Table: FC = () => {
  const loading = useSelector((state: People) => state.loading);
  const error = useSelector((state: People) => state.error);
  const dispatch = useDispatch();

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
