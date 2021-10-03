import { Box } from "@chakra-ui/layout";
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
          <Box {...provided.droppableProps} ref={provided.innerRef} w="full">
            {tasks.map((task: TaskType, index) => (
              <Draggable
                key={task.createdAt}
                draggableId={String(task.createdAt)}
                index={index}
              >
                {(provided, snapshot) =>
                  !(hideDone && task.isDone) ? (
                    <Box
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <TaskItem
                        task={task}
                        snapshot={snapshot}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                      />
                    </Box>
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
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
