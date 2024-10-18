
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faSquare } from '@fortawesome/free-solid-svg-icons';

export default function Checkbox({ onCheck }) {

  let checked = false;

  return (
    <button className="checkbox" onClick={checked = onCheck}>
      {!checked && (
        <FontAwesomeIcon icon={faSquare}/>
      )}
      {checked && (
        <FontAwesomeIcon icon={faSquareCheck}/>
      )}
    </button>
  );

}
