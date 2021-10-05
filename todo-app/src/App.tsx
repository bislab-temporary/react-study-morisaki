import { useBoolean } from "@chakra-ui/hooks";
import { Flex } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import Header from "./components/Header";
import HideCompletedTasksCheckbox from "./components/HideCompletedTasksCheckbox";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import { db } from "./models/db";
import { TaskType } from "./models/TaskType";

const App = () => {
  const [hideDone, setHideDone] = useBoolean(false);

  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    db.fetchTasks()
      .then((tasks: TaskType[]) => {
        setTasks(tasks);
      })
      .catch(() => {
        setTasks([]);
      });
  }, []);

  const addTask = (text: string) => {
    const now = Date.now();
    const newTask = { createdAt: now, isDone: false, text: text };
    db.addTask(newTask).then(() => {
      const newTasks = [...tasks, newTask];
      setTasks(newTasks);
    });
  };

  const updateTask = (createdAt: number, isDone: boolean, text: string) => {
    const newTask = { createdAt: createdAt, isDone: isDone, text: text };
    db.updateTask(newTask).then(() => {
      const newTasks = tasks.map((task: TaskType) =>
        task.createdAt === createdAt ? newTask : task
      );
      setTasks(newTasks);
    });
  };

  const deleteTask = (createdAt: number) => {
    db.deleteTask(createdAt).then(() => {
      const newTasks = tasks.filter(
        (task: TaskType) => task.createdAt !== createdAt
      );
      setTasks(newTasks);
    });
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
    const tasksBackup = tasks;
    const newTasks = reorder(
      tasks,
      result.source.index,
      result.destination.index
    );
    setTasks(newTasks);
    const newOrders = newTasks.map((task: TaskType): number => task.createdAt);
    db.updateOrders(newOrders).catch(() => {
      setTasks(tasksBackup);
    });
  };

  return (
    <Flex maxW="xl" maxH="100vh" direction="column" ml="auto" mr="auto">
      <Header />
      <HideCompletedTasksCheckbox
        hideDone={hideDone}
        setHideDone={setHideDone}
      />
      <TaskList
        tasks={tasks}
        hideDone={hideDone}
        updateTask={updateTask}
        deleteTask={deleteTask}
        onDragEnd={onDragEnd}
      />
      <TaskInput addTask={addTask} />
    </Flex>
  );
};

export default App;
