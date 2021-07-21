import todoConstant from "../constants/todo.constant";

const initialState = { loading: false, todo: {}, todos: [], error: '' };


function todoReducer(state = initialState, action) {
    switch (action.type) {
        case todoConstant.ADD_TODO_REQUEST:
            return {
                ...state,
                loading: true
            };
        case todoConstant.ADD_TODO_SUCCESS:
            return {
                ...state,
                loading: false,
                todo: action.todo,
                todos: [...state.todos, action.todo]
            };
        case todoConstant.ADD_TODO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case todoConstant.GET_TODOS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case todoConstant.GET_TODOS_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: action.todos
            };
        case todoConstant.GET_TODOS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case todoConstant.DELETE_TODO_REQUEST:
            return {
                ...state,
                loading: true
            };
        case todoConstant.DELETE_TODO_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: state.todos.filter((todo) => todo._id !== action.id)
            };
        case todoConstant.DELETE_TODO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case todoConstant.IS_COMPLETE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case todoConstant.IS_COMPLETE_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: state.todos.map((t) => (
                    t._id === action.todo._id ? action.todo : t
                ))
            };
        case todoConstant.IS_COMPLETE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        default:
            return state
    }
}

export default todoReducer;