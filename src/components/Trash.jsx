import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


export default function Trash({ onDelete }) {
    return (
        <button className="trash" onClick={onDelete}>
            <FontAwesomeIcon icon={faTrash} />
        </button>
    );

}