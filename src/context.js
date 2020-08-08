import { createContext } from 'react';
export const TasksContext = createContext();

const res = fetch('/user_data')
  .then((res) => res.json())
  .then((data) => {
    return data.forEach(({ firstName, lastName, age, login, roles }) => {
      return `<tr><td>${data.id}</td>
                  <td>${firstName}</td>
                  <td>${lastName}</td>
                   <td>${age}</td>
                   <td>${login}</td>
                   <td>${roles.forEach((element) => {
                     //    return ...
                   })}</td>
             </tr>`;
    });
  });

res.then((elems) => (document.getElementById('data').innerHTML = elems));
