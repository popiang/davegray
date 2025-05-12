import LineItem from "./LineItem";

const ItemList = ({ items, onHandleCheck, onHandleDelete }) => {
    return (
        <ul>
            {items.map((item) => (
                <LineItem
                    item={item}
                    onHandleCheck={onHandleCheck}
                    onHandleDelete={onHandleDelete}
                    key={item.id}
                />
            ))}
        </ul>
    );
};

export default ItemList;
