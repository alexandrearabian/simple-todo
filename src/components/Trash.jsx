import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';


export default function Trash({ onDelete, size='1.3rem' }) {
    return (
        <button className="trash" onClick={onDelete}>
            <FontAwesomeIcon icon={faTrash} style={{ fontSize: size }} />
        </button>
    );

}