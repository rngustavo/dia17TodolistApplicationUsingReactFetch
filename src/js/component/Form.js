import React, { useState, useEffect } from "react";
import Todo from "./Todo";

const Form = () => {
	const [todo, setTodo] = useState({});
	const [todos, setTodos] = useState([]);
	/*
	let lista = TraerLista();
	console.log("revisar lista", lista);
*/
	useEffect(() => {
		getTareas();
	}, []);

	function getTareas() {
		let url = "https://assets.breatheco.de/apis/fake/todos/user/rngustavo";
		let res = fetch(url)
			.then(res => res.json())
			.then(data => setTodos(data));
	}

	const handleChange = e => setTodo({ label: e.target.value, done: false });
	const handleClick = e => {
		if (Object.keys(todo).length === 0 || todo.label.trim() === "") {
			alert("el campo no puede estar vacio");
			return;
		}

		let lista = todos.slice(); //hago una copia del array
		lista.push(todo);
		setTodos([...todos, todo]);
		SubirLista(lista);
	};

	const deleteTodo = indice => {
		const newTodos = [...todos];
		newTodos.splice(indice, 1);
		setTodos(newTodos);
		SubirLista(newTodos);
	};

	async function SubirLista(lista) {
		let res = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/rngustavo",
			{
				method: "PUT",
				body: JSON.stringify(lista),
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(resp => {
				console.log("respuesta SubirLista ", resp.ok); // will be true if the response is successfull
				console.log("status SubirLista", resp.status); // the status code = 200 or code = 400 etc.
				console.log("texto SubirLista", resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				return data;
			})
			.catch(error => {
				console.log("error SubirLista", error);
			});
	}
	//esta funcion esta de mas, fue para evaluar otra forma de usar el await
	async function TraerLista() {
		let url = "https://assets.breatheco.de/apis/fake/todos/user/rngustavo";
		let resp = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});
		let data = await resp.json();
		return data;
		//con el codigo siguiente  no hace el await que busco
		/* .then(resp => resp.json())

			.then(data => {
				console.log("data TraerLista", data);
				return data;
			})
			.catch(error => {
				console.log(error);
			}); */
	}

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
					todo={value.label}
					key={index}
					index={index}
					deleteTodo={deleteTodo}
				/>
			))}
		</>
	);
};

export default Form;
