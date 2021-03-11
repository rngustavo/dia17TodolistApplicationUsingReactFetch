import React, { useState } from "react";
import Todo from "./Todo";

const Form = () => {
	const [todo, setTodo] = useState({});
	const [todos, setTodos] = useState([
		{ todo: "todo 1" },
		{ todo: "todo 2" },
		{ todo: "todo 3" }
	]);

	const handleChange = e => setTodo({ [e.target.name]: e.target.value });
	console.log(todo);
	const handleClick = e => {
		if (Object.keys(todo).length === 0 || todo.todo.trim() === "") {
			alert("el campo no puede estar vacio");
			return;
		}
		setTodos([...todos, todo]);
	};

	const deleteTodo = indice => {
		const newTodos = [...todos];
		newTodos.splice(indice, 1);
		setTodos(newTodos);
	};

	return (
		<>
			<form onSubmit={e => e.preventDefault()}>
				<label>to-dos</label>
				<br />
				<input
					type="text"
					name="todo"
					placeholder="What needs to be done?"
					onChange={handleChange}
				/>
				<button onClick={handleClick}>agregar</button>
			</form>
			{todos.map((value, index) => (
				<Todo
					todo={value.todo}
					key={index}
					index={index}
					deleteTodo={deleteTodo}
				/>
			))}
		</>
	);
};

export default Form;
