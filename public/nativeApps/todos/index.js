import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters } from './redux/actions.js';


import AddTodo from './addTodo.js';
import TodoList from './TodoList.js';
import Footer from './Footer.js';

class Todos extends Component {
	render() {
		console.log(this.props);
		const { dispatch, visibleTodos, visibilityFilter } = this.props;
		return (
			<div>
				<AddTodo onAddClick={text => dispatch(addTodo(text)) }/>

				<TodoList todos={visibleTodos}
						  onTodoClick={index => dispatch(toggleTodo(index)) }/>

				<Footer filter={visibilityFilter} onFilterChange={ filter => dispatch(setVisibilityFilter(filter)) }/>
			</div>
		)
	}
}
function select(state) {
  	return {
    	visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    	visibilityFilter: state.visibilityFilter
  	};
}

Todos.propTypes = {
  	visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    	text: PropTypes.string.isRequired,
    	completed: PropTypes.bool.isRequired
  	})),
  	visibilityFilter: PropTypes.oneOf([
    	'SHOW_ALL',
    	'SHOW_COMPLETED',
    	'SHOW_ACTIVE'
  	]).isRequired
}

function selectTodos(todos, filter) {
  	switch (filter) {
  		case VisibilityFilters.SHOW_ALL:
    		return todos;
  		case VisibilityFilters.SHOW_COMPLETED:
    		return todos.filter(todo => todo.completed);
  		case VisibilityFilters.SHOW_ACTIVE:
    		return todos.filter(todo => !todo.completed);
    	default: 
    		return [];
  	}
}
export default connect(select)(Todos);