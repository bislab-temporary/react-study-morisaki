import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { TaskType } from "../types/TaskType";
import TaskItem from "./TaskItem";

type Props = {
  tasks: TaskType[];
  hideDone: boolean;
  updateTask: (createdAt: number, isDone: boolean, text: string) => void;
  deleteTask: (createdAt: number) => void;
  onDragEnd: (result: DropResult) => void;
};

const TaskList = ({
  tasks,
  hideDone,
  updateTask,
  deleteTask,
  onDragEnd,
}: Props) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ width: "100%" }}
          >
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
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
