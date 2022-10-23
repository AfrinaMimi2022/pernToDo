import React, { Fragment } from 'react';
import './App.css';
//components
import InputTodo from './component/InputTodo';
import ListTodo from './component/ListTodo';

function App() {
  return (
    <Fragment>
      <div className='container'>
        <InputTodo />
        <ListTodo />
      </div>
    </Fragment>
  );
}

export default App;
