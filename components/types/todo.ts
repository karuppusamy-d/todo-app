export type Todo = {
  title: string;
  description: string;
  date: string;
  important: boolean;
  completed: boolean;
};

export type WithSubTodo = Todo & {
  subTodos?: Todo[];
};

export type Todos = {
  [id: string]: WithSubTodo;
};
