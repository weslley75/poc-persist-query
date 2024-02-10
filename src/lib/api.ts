import { Task } from "./todo-types"

export async function getTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
    .then(response => response.json())
  if (!response) {
    throw new Error('No data')
  }

  return response as Task[]
}

export async function postTodo(description: string) {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify({ title: description, completed: false, userId: 1 }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((response) => response.json())
  return response as Task
}
