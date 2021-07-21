import React, { Component } from 'react';
import Todo from './Todo';
import { connect } from 'react-redux';
import todoActions from '../actions/todo.action';

class List extends Component {

    componentDidMount() {
        this.props.getTodos();
    }

    render() {
        const todos = this.props.todos; 
        return (
            <>
                {
                    todos.map((todo) => {
                        return <Todo key={todo._id} todo={todo} />
                    })
                }
            </>
        )
    }
}

function mapStateTodos(state) {
    const { todos } = state.todoReducer;
    return { todos };
}

const actionTodos = {
    getTodos: todoActions.getTodos
}


export default connect(mapStateTodos, actionTodos)(List);