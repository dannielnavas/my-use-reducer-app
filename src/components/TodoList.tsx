import { useReducer, useState } from "react";

type Todo = {
  id: number;
  text: string;
};

type State = {
  todos: Todo[];
};

type Action =
  | { type: "ADD_TODO"; payload: string }
  | { type: "REMOVE_TODO"; payload: number };

const initialState: State = {
  todos: [],
};

const todoReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "ADD_TODO": {
      const newTodo: Todo = { id: state.todos.length + 1, text: action.payload };
      return { todos: [...state.todos, newTodo] };
    }
    case "REMOVE_TODO": {
      return { todos: state.todos.filter((todo) => todo.id !== action.payload) };
    }
    default:
      return state;
  }
};

const emojiMap: { [key: string]: string } = {
  eat: "🍔",
  sleep: "💤",
  code: "💻",
  exercise: "🏋️",
};

const TodoList: React.FC = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [todoText, setTodoText] = useState("");

  const handleAddTodo = () => {
    const mappedText = emojiMap[todoText.toLocaleLowerCase()] || todoText;
    if (mappedText.trim()) {
      dispatch({ type: "ADD_TODO", payload: mappedText });
      setTodoText("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div>
      <em>Made with useReducer</em>
      <h1>Emoji Todo list</h1>
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a new todo"
      />
      <ul>
        {state.todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => dispatch({ type: "REMOVE_TODO", payload: todo.id })}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { TodoList };
