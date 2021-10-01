import { Checkbox } from "@chakra-ui/checkbox";
import { useBoolean } from "@chakra-ui/hooks";
import { Container } from "@chakra-ui/layout";
import { useState } from "react";
import InputNewTaskField from "./InputNewTaskField";
import Task from "./Task";
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

  const updateTask = (createdAt: number, isDone: boolean, newText: string) => {
    const newTask = { createdAt: createdAt, isDone: isDone, text: newText };
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

  return (
    <Container maxW="xl" centerContent>
      <Checkbox mr="auto" isChecked={hideDone} onChange={setHideDone.toggle}>
        Hide completed tasks
      </Checkbox>
      {tasks.map(
        (task: TaskType) =>
          !(hideDone && task.isDone) && (
            <Task
              key={task.createdAt}
              task={task}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          )
      )}
      <InputNewTaskField tasks={tasks} setTasks={setTasks} />
    </Container>
  );
};

export default App;
