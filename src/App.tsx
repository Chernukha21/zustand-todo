import React, {useState, useEffect} from 'react';
import useTodoStore from "../store/store.tsx";


const TodoApp: React.FC = () => {
    const [task, setTask] = useState('');
    const {todos, fetchTodos, addTodo, removeTodo} = useTodoStore();

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (task.trim()) {
            addTodo(task);
            setTask('');
        }
    };

    return (
        <div>
            <h1>Zustand To-Do App</h1>
            <form onSubmit={handleSubmit}>
                <div className="text-field">
                    <label className="text-field__label" htmlFor="todo">Enter todo</label>
                    <input className="text-field__input" type="text" id="todo" placeholder="enter todo"
                           value={task} onChange={(e) => setTask(e.target.value)}/>
                    <button type="submit">Add</button>
                </div>
            </form>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        {todo}
                        <button onClick={() => removeTodo(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;