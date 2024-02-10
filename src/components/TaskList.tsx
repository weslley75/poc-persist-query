import { getTodos, postTodo } from '@/lib/api'
import { Task } from '@/lib/todo-types'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { TaskComponent } from './TaskComponent'
import { Button } from './ui/button'
import { Input } from './ui/input'

export function Todos() {
  const queryClient = useQueryClient()

  const { isLoading, data: tasks } = useQuery({ queryKey: ['todos'], queryFn: getTodos, refetchOnReconnect: false })

  const { mutateAsync: postTodoFn } = useMutation<Task, Error, string>({
    mutationFn: postTodo,
    onMutate: (variables) => {
      const newTask: Task = {
        id: Math.floor(Math.random() * 1000000),
        title: variables,
        completed: false,
        userId: 1,
        status: 'pending'
      }
      queryClient.setQueryData(['todos'], (data: Task[]) => {
        return [...(data || []), newTask]
      })
    },

    onSuccess: (data) => {
      queryClient.setQueryData(['todos'], (oldData: Task[]) => {
        return oldData.map((task) => {
          if (task.status === 'pending' && data.title === task.title) {
            return data
          }
          return task
        })
      })
    }
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='m-2'>
      <div className='flex gap-2'>
        <form className="flex max-w-xl" onSubmit={(e) => {
          e.preventDefault()
          const target = e.target as unknown as [HTMLInputElement, HTMLButtonElement]
          const input = target[0]
          if (input.value) {
            postTodoFn(input.value)
            input.value = ''
          }
        }}>
          <Input type="text" />
          <Button type="submit">Add</Button>
        </form>
        <Button
          onClick={() => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
          }}
        >
          Refresh
        </Button>
      </div>
      <ul className='my-2'>
        {tasks?.map((todo) => (
          <TaskComponent key={todo.id} task={todo} />
        ))}
      </ul>
    </div >
  )
}
