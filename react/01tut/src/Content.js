import ItemList from "./ItemList";

const Content = ({ items = [], onHandleCheck, onHandleDelete }) => {
    return (
        <>
            {items?.length ? (
                <ItemList
                    items={items}
                    onHandleCheck={onHandleCheck}
                    onHandleDelete={onHandleDelete}
                />
            ) : (
                <p style={{ marginTop: "2rem" }}>Your list is empty</p>
            )}
        </>
    );
};

export default Content;
