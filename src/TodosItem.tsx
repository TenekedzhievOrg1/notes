import { useState } from "react";
import { Todo } from "./types";
import "./App.css";

interface TodoItemProps {
  todo: Todo;
  isLoading: boolean;
  onEdit: (updatedTodo: Todo) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

function TodoItem({ todo, isLoading, onEdit, onDelete }: TodoItemProps) {
  const { id, title } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);

  const onCancel = () => {
    setUpdatedTitle(todo.title);
    setIsEditing(!isEditing);
  };

  return (
    <>
      {isEditing ? (
        <div className="todoWrapper">
          <input
            className="todoCheckbox"
            type="checkbox"
            disabled={isLoading}
            checked={!!todo?.completed}
            onChange={(e) => onEdit({ ...todo, completed: e.target.checked })}
          />
          <input
            className="input"
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <div className="todoButtons">
            <button disabled={isLoading} onClick={onCancel}>
              Cancel
            </button>
            <button
              disabled={isLoading || !updatedTitle}
              onClick={() => {
                onEdit({ ...todo, title: updatedTitle });
                setIsEditing(!isEditing);
              }}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="todoWrapper">
          <input
            className="todoCheckbox"
            type="checkbox"
            disabled={isLoading}
            checked={!!todo?.completed}
            onChange={(e) => onEdit({ ...todo, completed: e.target.checked })}
          />
          <h3
            className="todoTitle"
            style={{
              textDecoration: todo?.completed ? "line-through" : "none",
            }}
          >
            {title}
          </h3>

          <div className="todoButtons">
            <button
              disabled={isLoading}
              onClick={() => setIsEditing(!isEditing)}
            >
              Edit
            </button>
            <button disabled={isLoading} onClick={() => onDelete(id)}>
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default TodoItem;
