import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBedPulse,
  faTrash,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../api/apiSlice";

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
    if (!newTodo) return;
    e.preventDefault();
    addTodo({ userId: 1, title: newTodo, completed: false });
    setNewTodo("");
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
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

  const getContent = () => {
    if (isLoading) return <p>Loading...</p>;
    if (isSuccess) {
      return todos.map((todo) => {
        return (
          <article key={todo.id}>
            <div className="todo">
              <input
                type="checkbox"
                checked={todo.completed}
                id="todo.id"
                onChange={() =>
                  updateTodo({ ...todo, completed: !todo.completed })
                }
              />
              <label htmlFor="{todo.id}">{todo.title}</label>
              <button
                type="button"
                className="trash"
                onClick={() => deleteTodo({ id: todo.id })}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </article>
        );
      });
    }
    if (isError) return <p>{error}</p>;
  };

  let content = getContent();

  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};

export default TodoList;
