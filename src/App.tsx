import TodoItem from "./TodosItem";
import { useCrudHandlers } from "./useCrudHandlers";
import "./App.css";
import { usePagination } from "./usePagination";

function App() {
  const {
    todos,
    error,
    isLoading,
    newTodo,
    setNewTodo,
    addTodoHandler,
    editTodoHandler,
    deleteTodoHandler,
  } = useCrudHandlers();

  const { currentPage, startIndex, endIndex, totalPages, changePageHandler } =
    usePagination(todos);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="appWrapper">
      <div className="headerWrapper">
        <h1>TODOs</h1>
      </div>
      <div className="newTodoWrapper">
        <input
          className="input"
          type="text"
          name="title"
          placeholder="New todo title"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          className="addButton"
          disabled={isLoading || !newTodo}
          onClick={addTodoHandler}
        >
          Add todo
        </button>
      </div>

      <div className="todosWrapper">
        {isLoading && todos.length === 0 ? (
          <h3>Loading todos...</h3>
        ) : (
          todos
            .sort(
              (a: any, b: any) =>
                (new Date(b?.createdAt) as any) -
                (new Date(a?.createdAt) as any)
            )
            .slice(startIndex, endIndex)
            .map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                isLoading={isLoading}
                onEdit={editTodoHandler}
                onDelete={deleteTodoHandler}
              />
            ))
        )}
      </div>

      <div className="pagination">
        <button
          onClick={() => changePageHandler(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => changePageHandler(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
