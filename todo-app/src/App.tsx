import { Checkbox } from "@chakra-ui/checkbox";
import { useBoolean } from "@chakra-ui/hooks";
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
  const [hideDone, setHideDone] = useBoolean(false);

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

  const deleteTask = (create: number) => {
    const newTasks = tasks.filter((task: iTask) => task.create !== create);
    setTasks(newTasks);
  };

  return (
    <Container maxW="xl" centerContent>
      <Checkbox mr="auto" isChecked={hideDone} onChange={setHideDone.toggle}>
        Hide completed tasks
      </Checkbox>
      {tasks.map(
        (task: iTask) =>
          !(hideDone && task.isDone) && (
            <Task
              key={task.create}
              task={task}
              updateTasks={updateTasks}
              deleteTask={deleteTask}
            />
          )
      )}
      <InputNewTaskField tasks={tasks} setTasks={setTasks} />
    </Container>
  );
};

export default App;
