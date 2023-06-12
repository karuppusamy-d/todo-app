export type SubTodo = {
  title: string;
  description: string;
  date: string;
  important: boolean;
  completed: boolean;
};

export type Todo = SubTodo & {
  subTodos?: SubTodo[];
};

export type TodoWithId = Todo & {
  id: string;
  uid: string;
};
