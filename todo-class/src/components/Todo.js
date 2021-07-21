import React, { Component } from 'react'
import { Grid, Paper, IconButton } from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import { green } from '@material-ui/core/colors';
import Button from "@material-ui/core/Button";

import todoActions from '../actions/todo.action';
import { connect } from 'react-redux';


class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggle: false,
            editItem: { title: '', description: '' }
        };
    }

    deleteTodo = (id) => {
        this.props.deleteTodo(id);
    }

    isCompleteTodo = (id) => {
        this.props.isCompleteTodo(id);
    }

    editTodo = (id) => {
        let itemTodo = this.props.todos.find((todo) => {
            return todo._id === id;
        })
        this.setState({ isToggle: true, editItem: itemTodo });
    }

    handleEditSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.editItem)
    }

    render() {
        console.log(this.state.isToggle);
        const title = this.state.editItem.title;
        const description = this.state.editItem.description;
        console.log(this.state.editItem);
        return (
            <Grid xs={12} item>
                {this.state.isToggle ?
                    <Grid item xs={12}>
                        <Paper className="div-paper">
                            <form onSubmit={this.handleEditSubmit} style={{ display: "flex" }}>
                                <div className="addtodoform">
                                    <input
                                        type="text"
                                        placeholder="Todo Title *"
                                        name="title"
                                        onChange={e => this.setState({ title: e.target.value })}
                                        value={title}
                                    />

                                    <input
                                        type="text"
                                        placeholder="Todo Description *"
                                        name="description"
                                        onChange={e => this.setState({ description: e.target.value })}
                                        value={description}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary">
                                    Edit
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
                    :
                    <Paper elevation={2} className="list-div-paper">
                        <div className="list-text" ref="editable">
                            <span className="list-title">
                                {
                                    this.props.todo.isComplete ? <del>{this.props.todo.title}</del> : this.props.todo.title

                                }
                            </span>
                            <span className="list-desc">
                                {
                                    this.props.todo.isComplete ? <del>{this.props.todo.description}</del> : this.props.todo.description

                                }
                            </span>
                        </div>
                        <div className="list-btn">
                            {
                                this.props.todo.isComplete ?
                                    <IconButton onClick={() => this.isCompleteTodo(this.props.todo._id)}>
                                        <ClearIcon color="secondary" fontSize="small" />
                                    </IconButton> :
                                    <IconButton onClick={() => this.isCompleteTodo(this.props.todo._id)}>
                                        <DoneIcon style={{ color: green[500] }} fontSize="small" />
                                    </IconButton>

                            }
                            <IconButton onClick={() => this.editTodo(this.props.todo._id)}>
                                <EditIcon color="primary" fontSize="small" />
                            </IconButton>
                            <IconButton onClick={() => this.deleteTodo(this.props.todo._id)}>
                                <DeleteIcon color="secondary" fontSize="small" />
                            </IconButton>
                        </div>
                    </Paper>
                }

            </Grid>
        )
    }
}

function mapStateTodo(state) {
    const { loading, todos } = state.todoReducer;
    return { loading, todos };
}

const actionTodo = {
    deleteTodo: todoActions.deleteTodo,
    isCompleteTodo: todoActions.isCompleteTodo
}

export default connect(mapStateTodo, actionTodo)(Todo);
