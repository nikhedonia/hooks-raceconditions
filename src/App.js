import React, { useState } from 'react';
import Counters from './Counters';
import HookedTodo from './HookedTodo';
import ContainerTodo from './ContainerTodo';


function App() {
  return (
    <div>
      <Counters/>
      <HookedTodo />
      <ContainerTodo />
    </div>
  );
}

export default App;


// useReducer race-condition
// https://codesandbox.io/s/usereducer-bug-jnjql