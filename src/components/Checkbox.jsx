
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

export default function Checkbox({ onCheck, status, size = '1.3rem' }) {


  const handleCheked = () => {
    onCheck();
  }


  return (
    <button className="checkbox" onClick={handleCheked} >
      {(!status) && (
        <FontAwesomeIcon icon={faSquare} style={{ fontSize: size }} />
      )}
      {(status) && (
        <FontAwesomeIcon style={{ backgroundColor: 'none', fontSize: size }} icon={faSquareCheck} />
      )}
    </button>
  );

}
