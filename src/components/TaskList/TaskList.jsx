import React, { useContext } from 'react';
import './TaskList.sass';
import TaskListItem from '../TaskListItem';
import { TasksContext } from '../../context';
import TaskFooter from '../TaskFooter';

const TaskList = ({
  setTasks,
  onToggleDone,
  removeItem,
  filter,
  handleFilter,
  count,
  clearComplectedTask,
  handleEdit,
  editLabel,
}) => {
  const tasks = useContext(TasksContext);

  const createTaskListItem = tasks.map((task) => {
    const editLabels = editLabel(task.id);
    return (
      <TaskListItem
        key={task.id}
        task={task}
        onToggleDone={() => onToggleDone(task.id)}
        removeItem={() => removeItem(task.id)}
        handleEdit={() => handleEdit(task.id)}
        editLabel={editLabels}
        edit={task.edit}
        ago={task.ago}
      />
    );
  });

  const createTaskList = tasks.length ? (
    <ul className='todo-list'>{createTaskListItem}</ul>
  ) : null;

  return (
    <section className='main'>
      {createTaskList}
      <TaskFooter
        filter={filter}
        handleFilter={handleFilter}
        count={count}
        clearComplectedTask={clearComplectedTask}
      />
    </section>
  );
};

export default TaskList;
