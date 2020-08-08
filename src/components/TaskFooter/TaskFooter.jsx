import React from 'react';
import './TaskFooter.css';

const TaskFooter = ({
  filteredTask,
  filter,
  handleFilter,
  count,
  clearComplectedTask,
}) => {
  const buttons = [
    { label: 'All', name: 'all' },
    { label: 'Active', name: 'active' },
    { label: 'Completed', name: 'done' },
  ];

  const createButtons = buttons.map(({ label, name }) => {
    const isSelected = filter === name;
    const clazz = isSelected ? 'selected' : null;
    return (
      <li key={label}>
        <button
          type='button'
          className={clazz}
          onClick={() => handleFilter(name)}
        >
          {label}
        </button>
      </li>
    );
  });

  return (
    <footer class='footer'>
      <span class='todo-count'>{count} items left</span>
      <ul class='filters'>{createButtons}</ul>
      <button class='clear-completed' onClick={clearComplectedTask}>
        Clear completed
      </button>
    </footer>
  );
};

export default TaskFooter;
