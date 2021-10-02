import { Draggable } from "react-beautiful-dnd";
import { TaskType } from "../types/TaskType";
import TaskItem from "./TaskItem";

type Props = {
  tasks: TaskType[];
  hideDone: boolean;
  updateTask: (createdAt: number, isDone: boolean, text: string) => void;
  deleteTask: (createdAt: number) => void;
};

const TaskList = ({ tasks, hideDone, updateTask, deleteTask }: Props) => {
  return (
    <>
      {tasks.map((task: TaskType, index) => (
        <Draggable
          key={task.createdAt}
          draggableId={String(task.createdAt)}
          index={index}
        >
          {(provided) =>
            !(hideDone && task.isDone) ? (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                <TaskItem
                  task={task}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                />
              </div>
            ) : (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              ></div>
            )
          }
        </Draggable>
      ))}
    </>
  );
};

export default TaskList;
