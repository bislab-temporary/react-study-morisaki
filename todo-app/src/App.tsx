import { Container } from "@chakra-ui/layout";
import { Center } from "@chakra-ui/layout";

const App = () => {
  interface Task {
    text: string;
  }

  const tasks: Task[] = [
    { text: "Task1" },
    { text: "Task2" },
    { text: "Task3" },
  ];

  return (
    <Container maxW="xl" centerContent>
      {tasks.map((task: Task) => (
        <Center p={3} m={1} w="100%" bg="blue.100">
          {task.text}
        </Center>
      ))}
    </Container>
  );
};

export default App;
