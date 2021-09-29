import { Container } from "@chakra-ui/layout";
import { Center } from "@chakra-ui/layout";
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
        <Center p={3} m={1} w="100%" bg="blue.100">
          <Task task={task} />
        </Center>
      ))}
      <InputNewTaskField tasks={tasks} setTasks={setTasks} />
    </Container>
  );
};

export default App;
