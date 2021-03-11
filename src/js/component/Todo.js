import React from "react";
import PropTypes from "prop-types";

const Todo = ({ todo, index, deleteTodo }) => {
	return (
		<>
			<div className="list">
				<h3>{todo}</h3>{" "}
				<button
					className="btn-delete"
					onClick={() => deleteTodo(index)}>
					x
				</button>
			</div>
		</>
	);
};

Todo.propTypes = {
	todo: PropTypes.string,
	index: PropTypes.string,
	deleteTodo: PropTypes.func
};

export default Todo;
