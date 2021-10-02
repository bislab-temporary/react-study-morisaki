import { useBoolean } from "@chakra-ui/hooks";
import { Container } from "@chakra-ui/layout";
import { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import HideCompletedTasksCheckbox from "./components/HideCompletedTasksCheckbox";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import { TaskType } from "./types/TaskType";

const App = () => {
  const [hideDone, setHideDone] = useBoolean(false);

  const [tasks, setTasks] = useState<TaskType[]>([
    {
      createdAt: new Date(2021, 9, 30, 1, 0, 0).getTime(),
      isDone: false,
      text: "Task1",
    },
    {
      createdAt: new Date(2021, 9, 30, 2, 0, 0).getTime(),
      isDone: false,
      text: "Task2",
    },
    {
      createdAt: new Date(2021, 9, 30, 3, 0, 0).getTime(),
      isDone: false,
      text: "Task3",
    },
  ]);

  const addTask = (text: string) => {
    const now = Date.now();
    const newTask = { createdAt: now, isDone: false, text: text };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
  };

  const updateTask = (createdAt: number, isDone: boolean, text: string) => {
    const newTask = { createdAt: createdAt, isDone: isDone, text: text };
    const newTasks = tasks.map((task: TaskType) =>
      task.createdAt === createdAt ? newTask : task
    );
    setTasks(newTasks);
  };

  const deleteTask = (createdAt: number) => {
    const newTasks = tasks.filter(
      (task: TaskType) => task.createdAt !== createdAt
    );
    setTasks(newTasks);
  };

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
    setTasks(newTasks);
  };

  return (
    <Container maxW="xl" centerContent>
      <HideCompletedTasksCheckbox
        hideDone={hideDone}
        setHideDone={setHideDone}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <TaskList
                tasks={tasks}
                hideDone={hideDone}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <TaskInput addTask={addTask} />
    </Container>
  );
};

export default App;
