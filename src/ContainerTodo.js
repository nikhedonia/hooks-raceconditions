import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
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

const getDispatch = dispatch=>({dispatch});

const stateToEntry = (state, {id}) => {
  if (!state[id]) {
    console.log(`tried to select ${id} to render but cound find in store`);
  }
  
  return state[id];
}

const TodoEntry = connect(
  stateToEntry, 
  getDispatch
)( ({id, message, dispatch}) => {
  console.log(`${id} rendered`);

  return (
    <div>
      <input value={message} onChange={(e)=>dispatch({type:"UPDATE", id, message: e.value})} />
      <button onClick={()=>dispatch({type: "DELETE", id})}> Remove {id} </button>
    </div>
  );
});

const stateToTodoList = (state) => {
  return {
    todos: Object
      .entries( state )
      .sort( (a, b) => a[1].created - b[1].created )
     .map( x=>x[0]) 
  };
}

const Todo = connect(
  stateToTodoList, 
  getDispatch
)( ({todos, dispatch}) => {
  return (
    <div>
      { todos.map( id => <TodoEntry id={id} key={id} />) }
      <button onClick={() => dispatch({'type':'UPDATE', created: Date.now(), id: uuid()})}> Add Entry </button>
    </div>
  ); 
});

const ContainerTodo = () => (
  <>
    <h2>Connected Todo</h2>
    <Provider store={todoStore}>
      <Todo />
    </Provider>
  </>
);

export default ContainerTodo;