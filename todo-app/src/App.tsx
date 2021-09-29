import { Container } from "@chakra-ui/layout";
import { useState } from "react";
import InputNewTaskField from "./InputNewTaskField";
import Task from "./Task";

export interface iTask {
  text: string;
}

const App = () => {
  const [tasks, setTasks] = useState<iTask[]>([
    { text: "Task1" },
    { text: "Task2" },
    { text: "Task3" },
    {
      text: "LongTextLongTextLongTextLongTextLongTextLongTextLongTextLongTextLongTextLongText",
    },
  ]);

  return (
    <Container maxW="xl" centerContent>
      {tasks.map((task: iTask) => (
        <Task task={task} />
      ))}
      <InputNewTaskField tasks={tasks} setTasks={setTasks} />
    </Container>
  );
};

export default App;
