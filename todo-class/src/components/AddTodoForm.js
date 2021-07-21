import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import todoActions from '../actions/todo.action';
import { connect } from 'react-redux';
import { toast } from "react-toastify";

class AddTodoForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: ''
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        const { title, description } = this.state;
        if (title && description) {
            this.props.addTodo({ title, description });
            this.setState({ title: '', description: '' });
        } else {
            toast.error("Enter empty Field!");
        }
    };

    render() {
        const { title, description } = this.state;
        const { loading } = this.props;
        return (
            <form onSubmit={this.handleSubmit} style={{ display: "flex" }}>
                <div className="addtodoform">
                    <input
                        type="text"
                        placeholder="Todo Title *"
                        name="title"
                        onChange={e => this.setState({ title: e.target.value })} value={title}/>

                    <input
                        type="text"
                        placeholder="Todo Description *"
                        name="description"
                        onChange={e => this.setState({ description: e.target.value })} value={description}/>
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary">
                    {
                        loading ?
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                                alt="Loading Img"
                            />
                            : "Add"
                    }
                </Button>
            </form>
        )
    }
}

function mapStateTodo(state) {
    const { loading } = state.todoReducer;
    return { loading };
}

const actionTodo = {
    addTodo: todoActions.addTodo
}

export default connect(mapStateTodo, actionTodo)(AddTodoForm);