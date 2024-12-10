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

const TodoList = () => {};
