
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

export default function Checkbox({ onCheck }) {

  const [checked, setChecked] = useState(false);

  const handleCheked = () => {
    onCheck();
    setChecked(!checked);
  }


  return (
    <button className="checkbox" onClick={handleCheked}>
      {!checked && (
        <FontAwesomeIcon icon={faSquare} />
      )}
      {checked && (
        <FontAwesomeIcon style={{ backgroundColor: 'none' }} icon={faSquareCheck} />
      )}
    </button>
  );

}
