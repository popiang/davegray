import { useState } from "react";
import {
    useAddTodoMutation,
    useDeleteTodoMutation,
    useGetTodosQuery,
    useUpdateTodoMutation,
} from "../api/apiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";

const TodoList = () => {
    const [newTodo, setNewTodo] = useState("");
    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetTodosQuery();
    const [addTodo] = useAddTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newTodo.trim() == "") return;

        // * do something here
        addTodo({ userId: 1, title: newTodo, completed: false });
        setNewTodo("");
    };

    const newTodoSection = (
        <form onSubmit={handleSubmit}>
            <div className="new-todo">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter new todo"
                />
            </div>
            <button className="submit">
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>
    );

    let content = "";
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = todos.map((todo) => (
            <article key={todo.id}>
                <div className="todo">
                    <input
                        type="checkbox"
                        id={todo.id}
                        checked={todo.completed}
                        onChange={() =>
                            updateTodo({ ...todo, completed: !todo.completed })
                        }
                    />
                    <label
                        htmlFor={todo.id}
                        style={{
                            textDecoration: todo.completed
                                ? "line-through"
                                : "",
                        }}
                    >
                        {todo.title}
                    </label>
                </div>
                <button
                    className="trash"
                    onClick={() => deleteTodo({ id: todo.id })}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </article>
        ));
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <main>
            <h1>Todo List</h1>
            {newTodoSection}
            {content}
        </main>
    );
};

export default TodoList;
