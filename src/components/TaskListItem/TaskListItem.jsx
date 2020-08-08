import React, { useState } from 'react';
import './TaskListItem.css';

const TaskListItem = ({
  task,
  onToggleDone,
  removeItem,
  handleEdit,
  editLabel,
  edit,
  ago,
}) => {
  const [value, setValue] = useState(task.label);

  const onChangeValue = ({ target }) => {
    setValue(target.value);
  };

  const onChangeLabel = ({ key }) => {
    if (key === 'Enter') {
      editLabel(value);
    }
  };

  const isDone = task.done ? 'completed' : null;

  return (
    <li className={edit ? 'editing' : isDone}>
      <div className='view'>
        <input
          className='toggle'
          type='checkbox'
          onChange={onToggleDone}
          checked={task.done}
        />
        <label>
          <span className='description'>{task.label}</span>
          <span className='created'>ds{ago}</span>
        </label>
        <button className='icon icon-edit' onClick={handleEdit}></button>
        <button className='icon icon-destroy' onClick={removeItem}></button>
      </div>
      <input
        type='text'
        className='edit'
        value={value}
        onKeyDown={onChangeLabel}
        onChange={onChangeValue}
      />
    </li>
  );
};

export default TaskListItem;
