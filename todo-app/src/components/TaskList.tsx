import { TaskType } from "../types/TaskType";
import Task from "./Task";

type Props = {
  tasks: TaskType[];
  hideDone: boolean;
  updateTask: (createdAt: number, isDone: boolean, newText: string) => void;
  deleteTask: (createdAt: number) => void;
};

const TaskList = ({ tasks, hideDone, updateTask, deleteTask }: Props) => {
  return (
    <>
      {tasks.map(
        (task: TaskType) =>
          !(hideDone && task.isDone) && (
            <Task
              key={task.createdAt}
              task={task}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          )
      )}
    </>
  );
};

export default TaskList;
