import {create} from 'zustand';

interface Todo {
    todo: string,
    completed: boolean,
    userId: number,
}


interface TodoStore {
    todos: Todo[];
    addTodo: (todo: string) => void;
    removeTodo: (index: number) => void;
    fetchTodos: () => Promise<void>;
}

const useTodoStore = create<TodoStore>((set) => ({
    todos: [],
    fetchTodos: async () => {
        const response = await fetch('https://dummyjson.com/todos');
        const data = await response.json();
        set({ todos: data.todos.map((todo: any) => todo.todo) });
    },
    addTodo: async (todo) => {
        const response = await fetch('https://dummyjson.com/todos/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ todo, completed: false, userId: 1 })
        });
        const newTodo = await response.json();
        set((state) => ({ todos: [...state.todos, newTodo.todo] }));
    },
    removeTodo: (index) => set((state) => ({
        todos: state.todos.filter((_, i) => i !== index)
    }))
}));

export default useTodoStore;