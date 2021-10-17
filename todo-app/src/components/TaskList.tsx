import { Box } from "@chakra-ui/layout";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DropResult,
} from "react-beautiful-dnd";
import { TaskType } from "../models/TaskType";
import TaskItem from "./TaskItem/TaskItem";

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
        {(provided: DroppableProvided) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            w="full"
            overflowY="scroll"
          >
            {tasks.map((task: TaskType, index: number) => (
              <Draggable
                key={task.createdAt}
                draggableId={String(task.createdAt)}
                index={index}
              >
                {(
                  provided: DraggableProvided,
                  snapshot: DraggableStateSnapshot
                ) =>
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
