import {BASE_API} from '../constants/api.constant';

const todoServices = {
    addTodo,
    getTodos,
    deleteTodo,
    isCompleteTodo,
};

export default todoServices;

function addTodo(todo) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    };

    return fetch(`${BASE_API}`, requestOptions).then(handleResponse);
}

function getTodos() {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${BASE_API}/all`, requestOptions).then(handleResponse);
}

function deleteTodo(id){
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id})
    };

    return fetch(`${BASE_API}/${id}`, requestOptions).then(handleResponse);
}

function isCompleteTodo(id){
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id})
    };

    return fetch(`${BASE_API}/isComplete/${id}`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}