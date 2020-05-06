import TaskListView from './TaskListView';
export {TaskListView};

export const validateEmail = (email) => {
  let er = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}/;
  if (!er.exec(email)) {
    return false;
  }
  return true;
};
