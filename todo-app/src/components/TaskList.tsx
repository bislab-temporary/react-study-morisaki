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
import { getOrderedTasks, updateOrders } from "../models/db";
import { OrderedTaskType } from "../models/OrderedTaskType";
import { OrderType } from "../models/OrderType";
import { TaskType } from "../models/TaskType";
import TaskItem from "./TaskItem/TaskItem";

type Props = {
  hideDone: boolean;
};

const TaskList = ({ hideDone }: Props) => {
  const tasks = useLiveQuery<OrderedTaskType[]>(() => getOrderedTasks());

  if (!tasks) return null;

  const reorder = (
    list: OrderType[],
    startIndex: number,
    endIndex: number
  ): OrderType[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const createdAtList = tasks.map(
      (task: OrderedTaskType): OrderType => ({
        createdAt: task.createdAt,
      })
    );
    const newCreatedAtList = reorder(
      createdAtList,
      result.source.index,
      result.destination.index
    );
    updateOrders(newCreatedAtList);
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
