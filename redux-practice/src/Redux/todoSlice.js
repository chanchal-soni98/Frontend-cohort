import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todo',
    initialState: {todos: []},
    reducers: {
        addTodo: (state, action) =>{
            state.todos.push({
                id: Date.now(),
                title: action.payload.title,
                name: action.payload.name
            })
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id != action.payload.id)
        },
        editTodo: (state, action) => {
            const {id, title, name} = action.payload;
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                todo.title = title;
                todo.name = name;
            }
        }
    }

});

export const {addTodo, deleteTodo, editTodo} = todoSlice.actions;
export default todoSlice.reducer;
