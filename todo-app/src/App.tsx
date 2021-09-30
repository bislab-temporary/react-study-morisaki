import { Container } from "@chakra-ui/layout";
import { useState } from "react";
import InputNewTaskField from "./InputNewTaskField";
import Task from "./Task";

export interface iTask {
  create: number;
  isDone: boolean;
  text: string;
}

const App = () => {
  const [tasks, setTasks] = useState<iTask[]>([
    {
      create: new Date(2021, 9, 30, 1, 0, 0).getTime(),
      isDone: false,
      text: "Task1",
    },
    {
      create: new Date(2021, 9, 30, 2, 0, 0).getTime(),
      isDone: false,
      text: "Task2",
    },
    {
      create: new Date(2021, 9, 30, 3, 0, 0).getTime(),
      isDone: false,
      text: "Task3",
    },
  ]);

  const updateTasks = (create: number, isDone: boolean, newText: string) => {
    const newTask = { create: create, isDone: isDone, text: newText };
    const newTasks = tasks.map((task: iTask) =>
      task.create === create ? newTask : task
    );
    setTasks(newTasks);
  };

  return (
    <Container maxW="xl" centerContent>
      {tasks.map((task: iTask) => (
        <Task key={task.create} task={task} updateTasks={updateTasks} />
      ))}
      <InputNewTaskField tasks={tasks} setTasks={setTasks} />
    </Container>
  );
};

export default App;
