import React, { useState } from 'react';
import './NewTaskInput.sass';

const NewTaskItem = ({ addTask }) => {
  const [value, setValue] = useState('');

  const changeValue = ({ target }) => {
    setValue(target.value);
  };

  const handleAddNewTask = ({ key }) => {
    if (key === 'Enter' && value) {
      addTask(value);
      setValue('');
    }
  };

  return (
    <header className='header'>
      <h1>todos</h1>
      <input
        onKeyDown={handleAddNewTask}
        onChange={changeValue}
        value={value}
        className='new-todo'
        placeholder='What needs to be done?'
        autoFocus
      />
    </header>
  );
};

export default NewTaskItem;
