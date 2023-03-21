import { FC } from 'react';
import { deletePerson } from '../../store/features/peopleSlice';
import { useAppDispatch } from '../../store/store';
import Button from '../Button/Button';
import styles from './ActionButtons.module.scss';

interface Props {
  id: number;
}

const ActionButtons: FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();

  const handleDelete = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    dispatch(deletePerson(id));
  };

  return (
    <div className={styles.ActionButtons}>
      <Button label='Delete' onClick={handleDelete} />
    </div>
  );
};

export default ActionButtons;
