import { Container, Text } from "@chakra-ui/layout";
import { Center } from "@chakra-ui/layout";
import { useState } from "react";
import InputNewTaskField from "./InputNewTaskField";

export interface Task {
  text: string;
}

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { text: "Task1" },
    { text: "Task2" },
    { text: "Task3" },
    {
      text: "LongTextLongTextLongTextLongTextLongTextLongTextLongTextLongTextLongTextLongText",
    },
  ]);

  return (
    <Container maxW="xl" centerContent>
      {tasks.map((task: Task) => (
        <Center p={3} m={1} w="100%" bg="blue.100">
          <Text isTruncated>{task.text}</Text>
        </Center>
      ))}
      <InputNewTaskField tasks={tasks} setTasks={setTasks} />
    </Container>
  );
};

export default App;
