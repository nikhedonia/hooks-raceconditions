import React from 'react';
import { createStore } from 'redux';
import { useDispatch, Provider, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';


function todo(state = {}, action = {}) {
  console.log(state, action);
  const {type, ...data} = action;
  switch (type) {
    case 'DELETE':
      delete state[data.id];
      return {...state}; 
    case 'UPDATE':
    return {
        ...state,
        [data.id]: data
    }
    default:
      return state;
  }
}

const todoStore = createStore(todo)

const TodoEntry = ({id}) => {

  const entry = useSelector(store => {
    if (!store[id]) {
      console.log(`tried to select ${id} to render but cound find in store`);
    }

    return store[id];
  });

  console.log(`${id} rendered`);

  const dispatch = useDispatch();
  const {message} = entry;

  return (
    <div>
      <input value={message} onChange={(e)=>dispatch({type:"UPDATE", id, message: e.value})} />
      <button onClick={()=>dispatch({type: "DELETE", id})}>Remove {id}</button>
    </div>
  );
};

const Todo = () => {
  const todos = useSelector(store => Object
    .entries( store )
    .sort( (a, b) => a[1].created - b[1].created )
    .map( x=>x[0]) );
  const dispatch = useDispatch();

  return (
    <div>
      { todos.map( id => <TodoEntry id={id} key={id} />) }
      <button onClick={() => dispatch({'type':'UPDATE', created: Date.now(), id: uuid()})}> Add Entry </button>
    </div>
  ); 
}

const HookedTodo = () => (
  <>
    <h2>Todo</h2>
    <Provider store={todoStore}>
      <Todo />
    </Provider>
  </>
);

export default HookedTodo;