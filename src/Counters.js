import React, { useState } from 'react';
import { createStore } from 'redux';
import { useStore, useDispatch, Provider, connect, useSelector } from 'react-redux';

function count(state = 0, action=0) {
    switch (action.type) {
      case 'ADD':
        console.log('updating store');
        return state+=1;
      default:
        return state;
    }
  }
  
  const store = createStore(count, 42);
  
  function mapStateToProps(state) {
    return {count:state};
  }
  
  const Counter = () => {
    const store = useStore();
    const dispatch = useDispatch();
    const count = store.getState();
    return (
      <span>
        counter: 
        <button onClick={() => dispatch({type:'ADD'})}>
          {count}
        </button>
      </span>
    );
  };
  
  let i = 0;
  const WithSelector = ({offset}) => {
    console.log('rendering WithSelector', {hidden:i, offset});
    
    const value = useSelector(() => {
      console.log('invoking selector in HiddenCounter', ++i); 
      return 0;
    });
  
    return (
      <div>
         current count: {i} <br/>
         control value: {value}
      </div>
    );
  };
  
  const HiddenCounter = () => {
    const [offset, setValue] = useState(0);
    return (
      <div>
        <button onClick={() => setValue(!offset)} >setState</button>
        {offset? <WithSelector offset={offset} /> : null}
      </div>
    );
  }
  
  const ConnectedCounter = connect()(Counter);
  const ConnectedCounterWithMapState = connect(mapStateToProps)(Counter);


export default () => (
    <>
      <h2>Counters</h2>
      <Provider store={store}>
        <div> simple: <Counter /> </div>
        <div> connected: <ConnectedCounter /> </div>
        <div> connectedWithMapStateToProps: <ConnectedCounterWithMapState/> </div> 
        <br />
        <div> <HiddenCounter/> </div>
      </Provider>
    </>
)