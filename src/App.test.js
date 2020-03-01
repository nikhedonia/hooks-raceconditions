import React, { useState, useEffect } from 'react';

import { useStore, useDispatch, Provider, connect, useSelector } from 'react-redux';
import App from './App';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createStore } from 'redux';
import { shallow, mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

const Counter = () => {
  const dispatch = useDispatch();
  const state = useSelector(x=>x);
  return (
    <span>
      counter: 
      <button onClick={() => dispatch({type:'ADD'})}>
        {state}
      </button>
    </span>
  );
};

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

test('xxx', () => {
  const el = shallow(    <Provider store={store}> <Counter/>  </Provider>).dive().find('Counter').dive();
  el.find('button').simulate('click');
  expect(el.find('button').text()).toEqual('43');
});
