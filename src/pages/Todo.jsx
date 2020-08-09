import React, { useState, useEffect } from 'react';
import './Todo.sass';

import NewTaskItem from '../components/NewTaskInput';
import TaskList from '../components/TaskList';
import { TasksContext } from './../context';

import uniqueId from 'lodash.uniqueid';
import { formatDistanceToNow } from 'date-fns';

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const taskDateUpdate = () => {
      const option = { addSuffix: true, includeSeconds: true };
      return tasks.map((item) => ({
        ...item,
        ago: `created ${formatDistanceToNow(new Date(item.date), option)}`,
      }));
    };
    const timeout = setInterval(() => {
      setTasks(taskDateUpdate);
    }, 2000);
    return () => clearInterval(timeout);
  });

  const addTask = (label) => {
    let newItem = {
      label,
      id: uniqueId(),
      done: false,
      edit: false,
      date: Date.now(),
      ago: '',
    };
    return setTasks((task) => {
      return [newItem, ...task];
    });
  };

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  const removeItem = (id) => {
    setTasks((tasks) => {
      const idx = tasks.findIndex((el) => el.id === id);
      return [...tasks.slice(0, idx), ...tasks.slice(idx + 1)];
    });
  };

  const clearComplectedTask = () => {
    setTasks((tasks) => {
      const complectedTask = tasks.filter((el) => !el.done);
      return [...complectedTask];
    });
  };

  const onToggleDone = (id) => {
    setTasks((task) => toggleProperty(task, id, 'done'));
  };

  const filteredTask = (filter, items) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((el) => !el.done);
      case 'done':
        return items.filter((el) => el.done);
      default:
        return items;
    }
  };

  const handleFilter = (current) => {
    setFilter(current);
  };

  const handleEdit = (id) => {
    setTasks((task) => toggleProperty(task, id, 'edit'));
  };

  const editLabel = (id) => (value) => {
    setTasks((tasks) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const selectedItem = tasks.find((item) => item.id === id);
      const newItem = {
        ...selectedItem,
        edit: !selectedItem.edit,
        label: value,
      };
      const newArray = [
        ...tasks.slice(0, idx),
        newItem,
        ...tasks.slice(idx + 1),
      ];
      return newArray;
    });
  };

  const visibleData = filteredTask(filter, tasks);
  const countTaskDone = tasks.filter(({ done }) => !done).length;

  return (
    <section className='todoapp'>
      <TasksContext.Provider value={visibleData}>
        <NewTaskItem addTask={addTask} />
        <TaskList
          clearComplectedTask={clearComplectedTask}
          onToggleDone={onToggleDone}
          removeItem={removeItem}
          filter={filter}
          handleFilter={handleFilter}
          handleEdit={handleEdit}
          editLabel={editLabel}
          count={countTaskDone}
        />
      </TasksContext.Provider>
    </section>
  );
};

export default Todo;
