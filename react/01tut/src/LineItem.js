import { FaTrashAlt } from "react-icons/fa";

const LineItem = ({ item, onHandleCheck, onHandleDelete }) => {
    return (
        <li className="item">
            <input
                type="checkbox"
                onChange={() => onHandleCheck(item.id)}
                checked={item.checked}
            />
            <label
                style={item.checked ? { textDecoration: "line-through" } : null}
                onDoubleClick={() => onHandleCheck(item.id)}
            >
                {item.item}
            </label>
            <FaTrashAlt
                role="button"
                tabIndex="0"
                onClick={() => onHandleDelete(item.id)}
				aria-label={`Delete ${item.item}`}
            />
        </li>
    );
};

export default LineItem;
