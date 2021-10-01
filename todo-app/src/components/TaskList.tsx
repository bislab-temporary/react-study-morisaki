import { TaskType } from "../types/TaskType";
import TaskItem from "./TaskItem";

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
            <TaskItem
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
