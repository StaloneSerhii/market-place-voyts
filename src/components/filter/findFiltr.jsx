import { useDispatch, useSelector } from 'react-redux';
import { changeFilterRedux } from 'redux/Slice';
import { getStatusFilter } from 'redux/selector';


export const FindFilt = () => {
  const dispatch = useDispatch();
  const contact = useSelector(getStatusFilter);

  return (
    <div className='filtr'>
      <span>Find contacts by name</span>
      <input
      value={contact}
        type="text"
        onChange={e => dispatch(changeFilterRedux(e.target.value))}
      />
    </div>
  );
};
