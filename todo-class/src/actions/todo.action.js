import { toast } from "react-toastify";
import todoConstant from "../constants/todo.constant";
import todoServices from "../services/todo.service";

const todoActions = {
    addTodo,
    getTodos,
    deleteTodo,
    isCompleteTodo,
};

export default todoActions;

function addTodo(todo) {
    return dispatch => {
        dispatch(request(todo));

        todoServices.addTodo(todo)
            .then(
                todo => {
                    dispatch(success(todo));
                    toast.success('Todo added successful');
                },
                error => {
                    dispatch(failure(error));
                    toast.error(error);
                }
            );
    };

    function request(todo) { return { type: todoConstant.ADD_TODO_REQUEST, todo } }
    function success(todo) { return { type: todoConstant.ADD_TODO_SUCCESS, todo } }
    function failure(error) { return { type: todoConstant.ADD_TODO_FAILURE, error } }
}

function getTodos() {
    return dispatch => {
        dispatch(request());

        todoServices.getTodos()
            .then(
                todos => dispatch(success(todos)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: todoConstant.GET_TODOS_REQUEST } }
    function success(todos) { return { type: todoConstant.GET_TODOS_SUCCESS, todos } }
    function failure(error) { return { type: todoConstant.GET_TODOS_FAILURE, error } }
}

function deleteTodo(id) {
    return dispatch => {
        dispatch(request(id));

        todoServices.deleteTodo(id)
            .then(
                todo => {
                    dispatch(success(todo._id))
                    toast.success('Todo deleted successfully');
                },
                error => {
                    dispatch(failure(error.toString()));
                    toast.error(error.toString());
                }
            );
    };

    function request(id) { return { type: todoConstant.DELETE_TODO_REQUEST, id } }
    function success(id) { return { type: todoConstant.DELETE_TODO_SUCCESS, id } }
    function failure(error) { return { type: todoConstant.DELETE_TODO_FAILURE, error } }
}

function isCompleteTodo(id) {
    return dispatch => {
        dispatch(request(id));

        todoServices.isCompleteTodo(id)
            .then(
                todo => {
                    dispatch(success(todo))
                    if (!todo.isComplete) {
                        toast.success('Todo inCompleted successfully');
                    }
                    if (todo.isComplete) {
                        toast.success('Todo completed successfully')
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    toast.error(error.toString());
                }
            );
    };

    function request(id) { return { type: todoConstant.IS_COMPLETE_REQUEST, id } }
    function success(todo) { return { type: todoConstant.IS_COMPLETE_SUCCESS, todo } }
    function failure(error) { return { type: todoConstant.IS_COMPLETE_FAILURE, error } }
}