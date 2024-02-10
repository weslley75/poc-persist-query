import { Task } from "@/lib/todo-types";
import { Checkbox } from "./ui/checkbox";

export function TaskComponent({ task }: { task: Task }) {
  return (
    <div className='flex gap-2'>
      <Checkbox checked={task.completed} />
      {task.title}
    </div>
  )
}
