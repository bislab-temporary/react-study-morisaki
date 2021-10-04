import { Box } from "@chakra-ui/layout";
import { useLiveQuery } from "dexie-react-hooks";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DropResult,
} from "react-beautiful-dnd";
import { db, setDatabase } from "../models/db";
import { TaskType } from "../models/TaskType";
import TaskItem from "./TaskItem/TaskItem";

type Props = {
  hideDone: boolean;
};

const TaskList = ({ hideDone }: Props) => {
  const tasks = useLiveQuery(() =>
    db.tasksTable.orderBy("createdAt").toArray()
  );

  if (!tasks) return null;

  const reorder = (
    list: TaskType[],
    startIndex: number,
    endIndex: number
  ): TaskType[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const newTasks = reorder(
      tasks,
      result.source.index,
      result.destination.index
    );
    setDatabase(newTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided: DroppableProvided) => (
          <Box {...provided.droppableProps} ref={provided.innerRef} w="full">
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
                      <TaskItem task={task} snapshot={snapshot} />
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
